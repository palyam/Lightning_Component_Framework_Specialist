const gulp = require('gulp');
const sfdx = require('sfdx-node');
const yargs = require('yargs');
const through = require('through2');
const xml = require('gulp-xml');
const gutil = require('gulp-util');
const path = require('path');
const colors = gutil.colors;
const fs = require('fs');
const pad = require('pad');
var exec = require('gulp-exec');
var clean = require('gulp-clean');

let fieldConfigData = fs.readFileSync('config/field-check-overrides.json', 'UTF8');
let fieldConfig = JSON.parse(fieldConfigData);

//Setup CI environment from config/.ci.env
if(process.env.CI){
    require('dotenv').config({path: 'config/.ci.env'});
    
}


/**
 * TASK: init
 * 
 * Setup new scratch org, push source, assign permissionset
 * import data and open new scratch org
 * 
 * depends: create, init:push, init:assign, init:import
 */
gulp.task('init', ['create', 'init:push', 'init:assign', 'init:import'], ()=>open());


/**
 * TASK: auth
 * 
 * Find dev hub or authorize
 * If no default dev hub is found performs auth
 * 
 */
gulp.task('auth', () =>{
    return list()
    .then(getDevHub)
    .then((devHub) => {
        //if we have a dev hub, good return it;
        if(devHub) return Promise.resolve(devHub);

        //otherwise if we're CI jwtAuth, otherwise webauth a dev hub
        return process.env.CI ? authJwt() : authWeb();
    })
    .then(list);
});

/**
 * 
 * 
 * 
 * 
 */
gulp.task('convert:to:mdapi', () =>{
    return sfdx.source.convert({
            rootdir : 'force-app/main/default/',
            outputdir : 'deploy'
    })
  });

/**
 * 
 * 
 * 
 * 
 */
gulp.task('clean:deploy', () =>{
     gulp.src('deploy/permissionsets', {read: false})
    .pipe(clean());
   
    return gulp.src('deploy/profiles', {read: false})
    .pipe(clean());
   
});

/**
 * 
 * 
 * 
 * 
 */
gulp.task('mdapi:deploy', () =>{
      return sfdx.mdapi.deploy({
        targetusername : 'drivard@curious-bear-194608.com',
        deploydir : 'deploy'
})

});

/**
 * 
 * 
 * 
 * 
 */
gulp.task('mdapi:report', () =>{
   
    var options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
      };

      var reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    };

    return gulp.src('')
    .pipe(exec('sfdx force:mdapi:deploy:report', options))
    .pipe(exec.reporter(reportOptions));
})



const authWeb = () => {
    return sfdx.auth.webLogin({
        setdefaultdevhubusername: true,
        setalias: 'HubOrg'
    });
}

const authJwt = () => {
    return sfdx.auth.jwtGrant({
        clientid: process.env.CONSUMERKEY,
        jwtkeyfile: 'assets/server.key',
        username: process.env.USERNAME,
        setdefaultdevhubusername: true,
        setalias: 'HubOrg'
    });
}

const webAuth = () => sfdx.auth.web()

/**
 * TASK: create
 * 
 * Create new scratch org
 * 
 * depends: auth
 */
gulp.task('create', ['auth'], () => createScratchOrg());

const createScratchOrg = (definitionfile = 'config/project-scratch-def.json', setdefaultusername = true) => {    
    return sfdx.org.create({
        'definitionfile': definitionfile,
        'setdefaultusername': setdefaultusername    
    });
}

/**
 * TASK: init:push
 * 
 * Push source to scratch org, depends on create
 * 
 * depends: create
 */
gulp.task('init:push', ['create'], () => sourcePush());

/**
 * TASK: push:src
 * 
 * Push source to scratch org, depends on create
 * 
 * depends: N/A
 */
gulp.task('push:src', () => sourcePush());


const sourcePush = () => sfdx.source.push({quiet: false});

/**
 * TASK: init:assign
 * Assigns dreamhouse permission set
 * 
 * depends: init:push
 */
gulp.task('init:assign', ['init:push'], () => assignPermissionSet());

gulp.task('assign', () => assignPermissionSet());

const assignPermissionSet = (permsetname = 'Apex_Debugger') => {
    return sfdx.user.permsetAssign({
        'permsetname': permsetname
    })
}

/**
 * TASK: init:import
 * 
 * Import data into scratch org
 * 
 * depends: init:assign
 */
gulp.task('init:import', ['init:assign'],  () =>  importData());

const importData = (plan = 'data/sample-data-plan.json') => {
    return sfdx.data.treeImport({
        'plan': plan,
        'quiet': false
    });
}

/**
 * TASK: watch
 * 
 * Check for changes to fields and run check:fields
 * Check for changes to classes/triggers and run push
 * Poll for changes from scratch org
 * 
 */
gulp.task('watch', () => {
    gulp.watch('force-app/**/*.field-meta.xml', ['check:fields'])
    //gulp.watch(['force-app/**/*.cls', 'force-app/**/*.trigger','force-app/**/*.evt','force-app/**/*.cmp','force-app/**/*.js','force-app/**/*.css','force-app/**/*'], ['push']);
    gulp.watch(['force-app/**/**'], ['push']);
    pollPull();
});

gulp.task('check:fields', () => {
    return gulp.src('**/*.field-meta.xml')
    .pipe(xml({outType: false}))
    .pipe(checkFieldDescription())
    .pipe(checkLabelNameMismatch())
})

/**
 * TASK: clean
 * 
 * Mark scratch org for deletion
 * 
 */
gulp.task('clean', () => {
    return list()
    .then(getScratchOrg)
    .then(deleteOrg)
});


gulp.task('install:lts',() => {
    console.log("installing LTS.....");

    var options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
      };

      var reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    };

    return gulp.src('')
    .pipe(exec('sfdx force:lightning:test:install', options))
    .pipe(exec.reporter(reportOptions));

     console.log("LTS installed");

});    
gulp.task('install:fflib',() => {
    console.log("installing fflib.....");

    var options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
      };

      var reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    };

    return gulp.src('')
    .pipe(exec('git clone git@github.com:financialforcedev/fflib-apex-mocks.git Packages/fflib-apex-mocks', options))
    .pipe(exec('git clone git@github.com:financialforcedev/fflib-apex-common.git Packages/fflib-apex-common', options))
    .pipe(exec('sfdx force:mdapi:convert -r Packages/fflib-apex-mocks/src -d force-app/', options))
    .pipe(exec('sfdx force:mdapi:convert -r Packages/fflib-apex-common/fflib/src -d force-app/', options))
    .pipe(exec.reporter(reportOptions));

     
    console.log("installed fflib apex mocks.....");
     

});    

const deleteOrg = (org) => {
    if(org){
        return sfdx.org.delete({
            'targetusername': org.username,
            'quiet': false,
            'noprompt': true
        })
    }
}

/****** FIELD CHECKS ********/
const checkFieldDescription = () => {
    return validateXML((file) => {
        let field = JSON.parse(file.contents.toString());
        if(field.CustomField && !field.CustomField.description && !skipField(file.path, field.CustomField.fullName[0])){
            warn('Field', `missing description`, null, path.relative('src', file.path))
        }
    });
}

const checkLabelNameMismatch = () => {
    return validateXML((file) => {
        let field = JSON.parse(file.contents.toString());
        let label = field.CustomField.label[0];
        let stdLabel = `${label.split(' ').join('_')}__c`.replace(/[\W]+/g, "");
        if(field.CustomField && stdLabel != field.CustomField.fullName && !skipField(file.path, field.CustomField.fullName[0])){
            warn('Field', `label mismatch`, `found ${colors.yellow(field.CustomField.fullName)} should be ${colors.green(stdLabel)}`, path.relative('src', file.path))
        }
    });
}


/****** HELPERS ********/

const sourcePull = () => sfdx.source.pull({quiet:false});

const pollPull = () => {
    gutil.log('Checking dev hub for changes...')
    sfdx.source.pull({quiet:false}).then(function(){
        setTimeout(pollPull, 10000);
    });
}


const list = sfdx.org.list;


const runTests = () => {
    return sfdx.apex.testRun({
        'resultformat': 'human',
        'quiet': false
    }).then(function(results){
        if(results.summary.outcome !== 'Passed'){
            throw new gutil.PluginError('Test Run', {
                message: 'Tests are failing'
            });
        }
    });
}


const open = () =>{
    return !process.env.CI && sfdx.org.open({quiet: false});
}


const getDevHub = (list) => {
    let devHub = list && list.nonScratchOrgs && list.nonScratchOrgs.filter(function(org){
        return org.isDevHub && org.isDefaultDevHubUsername;
    });

    return devHub && devHub.length > 0 && devHub[0]
}
const getScratchOrg = (list) => {
    let defaultOrg = list.scratchOrgs && list.scratchOrgs.filter(function(org){
        if(yargs.argv.username) return (org.username == yargs.argv.username || org.alias == yargs.argv.username);
        
        return org.isDefaultUsername;
    });
    return defaultOrg && defaultOrg.length>0 && defaultOrg[0]
}


const getObjectFromFieldPath = (fieldPath) => {
    return path.basename(path.dirname(path.dirname(fieldPath)));
}

const skipField = (fieldPath, fullName) => {
    let parentObject = getObjectFromFieldPath(fieldPath);
    return fieldConfig[parentObject].includes(fullName);
   
}

const warn = (type, subtype, msg, path) => {
    let prefix = `${' '.repeat(11)}${colors.yellow.bold(`${type} warning (${colors.cyan(subtype)})`)}`;
    gutil.log(`${colors.white(path)}`);
    console.log(`${prefix} ${msg ||''}`);
}


const validateXML = (validator) => {
    let _stream = through.obj(function(file, enc, cb){
        if(file.isStream()){
             gutil.log(colors.yellow('Streams not supported for field check'));
        }
        if(file.isBuffer()){
            validator(file);
        } 
        this.push(file);
        cb();
    });
 
    _stream.on('error', (err) =>  gutil.log(colors.red('An error occured processing the file')));
 
    return _stream;
 
 }
 


/****** DEV TASKS ********/
gulp.task('assign', () => assignPermissionSet());

gulp.task('data', () => importData());

gulp.task('open', open);

gulp.task('test', runTests)

gulp.task('list', list);

gulp.task('push' , sourcePush);

gulp.task('pull', sourcePull);


