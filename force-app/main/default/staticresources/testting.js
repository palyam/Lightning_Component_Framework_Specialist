/**
 * This test suite contains examples that illustrate reusable patterns for testing
 * your custom Lightning components.
 *
 * These tests are written using the [Jasmine framework](https://jasmine.github.io/2.1/introduction).
 * They're run in the Lightning Testing Service using a wrapper, which you can find
 * in jasmineboot.js, in the same repository as this test suite.
 *
 * Note that Jasmine uses "spec" as its name for a test. We use their terminology here
 * for consistency with their documentation.
 */
describe("Lightning Component Testing Examples", function(){
    afterEach(function() {
        // Each spec (test) renders its components into the same div,
        // so we need to clear that div out at the end of each spec.
        $T.clearRenderedTestComponents();
        
    });

    /**
     * Component under test: 'c:BoatSearchForm':
     * This spec creates a component, adds it to the body, waits for the rendering to complete,
     * and then ensures that the expected content has been added to the DOM.
     * NOTE: The spec and the component under test are in same locker (same namespace),
     *       so the spec is able to see the DOM owned by the component.
     */
    describe('c:BoatSearchForm', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        it('renders specific New Button Is Visible', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchForm", {}, "renderTestComponents")
              .then(function(component) {
                component.set("v.showNewButton", "true");
                expect(component.find("SearchButton").get("v.label")).toBe("Search");
                expect(component.find("NewButton").get("v.label")).toBe("New");

                

                // end this spec successfully
                done();
            }).catch(function(e) {
                // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });

    describe('c:BoatSearchForm', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        // just a test comment
        it('We have 2 new Boat Types', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchForm", {}, "renderTestComponents")
              .then(function(component) {
                var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){return [{"Boat1":"1"},{"Boat2":"2"}];}};
                spyOn($A, "enqueueAction").and.callFake(function(action) {
                    var cb = action.getCallback("SUCCESS")
                    cb.fn.apply(cb.s, [res]);
                });
                component.loadBoatTypes();
                expect(component.get("v.options").length).toBe(2);
                // end this spec successfully
                done();
            }).catch(function(e) {
                // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });

    describe('c:BoatSearchResults', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        // just a test comment
        it('We have 3 Boats being returned ', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchResults", {}, "renderTestComponents")
              .then(function(component) {
                var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){
                    return [
                            {Id: "a02Z000000KsfFIIAZ", Name: "Dipsy Doodle", Picture__c: "/resource/Sailboats/sailboat1.png", Contact__c: "003Z000002WG0PFIA1"},
                            {Id: "a02Z000000KsfFJIAZ", Name: "Gallifrey Falls", Picture__c: "/resource/Sailboats/sailboat2.png", Contact__c: "003Z000002WG0PGIA1"},
                            {Id: "a02Z000000KsfFKIAZ", Name: "Geronimo", Picture__c: "/resource/Sailboats/skiboat1.png", Contact__c: "003Z000002WG0PHIA1"},
                    ];}};
                    spyOn($A, "enqueueAction").and.callFake(function(action) {
                        var cb = action.getCallback("SUCCESS")
                        cb.fn.apply(cb.s, [res]);
                });
                component.loadBoats();
                expect(component.get("v.boats").length).toBe(3);
                // end this spec successfully
                done();
            }).catch(function(e) {
                // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });

    
describe('c:BoatSearchResults', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        // just a test comment
        it('We Check 3 Boat Names being Returned ', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchResults", {}, "renderTestComponents")
              .then(function(component) {
                var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){
                    return [
                            {Id: "a02Z000000KsfFIIAZ", Name: "Dipsy Doodle", Picture__c: "/resource/Sailboats/sailboat1.png", Contact__c: "003Z000002WG0PFIA1"},
                            {Id: "a02Z000000KsfFJIAZ", Name: "Gallifrey Falls", Picture__c: "/resource/Sailboats/sailboat2.png", Contact__c: "003Z000002WG0PGIA1"},
                            {Id: "a02Z000000KsfFKIAZ", Name: "Geronimo", Picture__c: "/resource/Sailboats/skiboat1.png", Contact__c: "003Z000002WG0PHIA1"},
                    ];}};
                    spyOn($A, "enqueueAction").and.callFake(function(action) {
                        var cb = action.getCallback("SUCCESS")
                        cb.fn.apply(cb.s, [res]);
                });
                component.loadBoats();
                expect(component.get("v.boats").length).toBe(3);
                expect(component.get("v.boats")[0].Name).toBe("Dipsy Doodle");    
                expect(component.get("v.boats")[1].Name).toBe("Gallifrey Falls");    
                expect(component.get("v.boats")[2].Name).toBe("Geronimo");    
                
                // end this spec successfully
                done();
            }).catch(function(e) {
                // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });
    
describe('c:BootTile', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        // just a test comment
        it('Test Boat Image Name is Rendered and Correct ', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchResults", {}, "renderTestComponents")
              .then(function(component) {
                            
               var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){
                return [
                        {Id: "a02Z000000KsfFKIAZ", Name: "Geronimo", Picture__c: "/resource/Sailboats/skiboat1.png", "Contact__r.Name" : "Tom Brady"},
                ];}};
                spyOn($A, "enqueueAction").and.callFake(function(action) {
                    var cb = action.getCallback("SUCCESS")
                    cb.fn.apply(cb.s, [res]);
            });
               component.loadBoats();
               expect(component.get("v.boats").length).toBe(1);
               expect(document.getElementById("boatimage").style.backgroundImage).toContain("skiboat1.png");    
               expect(component.find("boatcmp").find("selectbutton").get("v.name")).toBe("a02Z000000KsfFKIAZ");
               //Unable to get Jasmine to expand a value who's lable has a . EXA Contact__r.Name will not expand to Tom Brady
               //expect(component.find("boatcmp").find("contact").get("v.value")).toBe("Tom Brady");  
               
                // end this spec successfully
                done();
            }).catch(function(e) {
               // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });

    describe('c:BoatTile', function(){
       
        it('Test Event is fired and captured ', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:BoatSearchResults Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.

           
            $T.createComponent("c:BoatSearchResults", {}, "renderTestComponents")
              .then(function(component) {
              
                // Mock out the call to get a boat. This will cause the BootTile component to be initialized and loaded
                var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){
                    return [
                            {Id: "a02Z000000KsfFKIAZ", Name: "Geronimo", Picture__c: "/resource/Sailboats/skiboat1.png", "Contact__r.Name" : "Tom Brady"},
                    ];}};
                    spyOn($A, "enqueueAction").and.callFake(function(action) {
                        var cb = action.getCallback("SUCCESS")
                        cb.fn.apply(cb.s, [res]);
                });
                //Call to load the boats (will load the boat above)
                component.loadBoats();
                component.set("v.selectedBoatId","")
                
                //verify that the selectedBoatId = empty                
                expect(component.get("v.selectedBoatId")).toBe("");    
                //check that we have only 1 boat
                expect(component.get("v.boats").length).toBe(1);
                //check that the name for the lightning button is the Id
                expect(component.find("boatcmp").find("selectbutton").get("v.name")).toBe("a02Z000000KsfFKIAZ");
                //check the the selected attribute on the BoatTile is false
                expect(component.find("boatcmp").get("v.selected")).toBe(false);
                
                //create and fire the BoatSelect event with the ID of the boat
                var boatSelectEvent = component.find("boatcmp").getEvent("BoatSelect");
                boatSelectEvent.setParams({ "boatId" : "a02Z000000KsfFKIAZ" });
                boatSelectEvent.fire();  

                //check the the selected attribute on the BoatTile is now true as the event was captured and the
                //value was set.
                expect(component.get("v.selectedBoatId")).toBe("a02Z000000KsfFKIAZ");    
                
               
                // end this spec successfully
                done();
            }).catch(function(e) {
               // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });
    

    describe('c:BoatDetails', function(){
        
        it('Test Applicaiton Event (BoatSelected) is fired by BoatTile and captured by BoatDetails', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:BoatSearchResults Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            
            var detailComponent;
            $T.createComponent("c:BoatDetails", {}, "renderTestComponents")
                .then(function(detailComponent) {
                    //Create the BoatSearchResults component. This will create the BoatTile componet which 
                    //fires the application event.
                    
                    $T.createComponent("c:BoatSearchResults", {}, "renderTestComponents")
                    .then(function(component) {
                       // Mock out the call to get a boat. This will cause the BootTile component to be initialized
                        var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){
                            return [
                                    {Id: "a02Z000000KsfFKIAZ", Name: "Geronimo", Picture__c: "/resource/Sailboats/skiboat1.png", "Contact__r.Name" : "Tom Brady"},
                            ];}};
                            spyOn($A, "enqueueAction").and.callFake(function(action) {
                                var cb = action.getCallback("SUCCESS")
                                cb.fn.apply(cb.s, [res]);
                        });
                        //Load the boat above
                        component.loadBoats();

                        //check that the boat was loaded
                        expect(component.get("v.boats").length).toBe(1);
                        var boat = component.get("v.boats")[0];

                        //Fire the BoatSelected Application Event
                        
                        $T.fireApplicationEvent("c:BoatSelected", {"boat": boat});

                        //Check to see if v.id = a02Z000000KsfFKIAZ. The event handler set this.
                        //BoatDetails handled the event
                        expect(detailComponent.get("v.id")).toBe("a02Z000000KsfFKIAZ");        
                        
                         // end this spec successfully
                        done();
                    }).catch(function(e) {
                    // end this spec as a failure
                        done.fail(e);
                    });
                });
            }); 
            });
                                  
           
              
        describe('The Lightning Data Service Testing', function(){
                    
                        describe('c:BoatDetails', function(){
                            // These tests are making server-side calls and interacting with LDS events,
                            // so increase the default timeout to reduce tests flappiness
                            var originalTimeout;
                            var defaultTimeout = 1000000;
                    
                            beforeEach(function(done) {
                                originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                                jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeout;
                    
                                // Create a record in advance, for use with the Save, Reload and Delete actions
                                var that = this;
                                $T.createComponent("c:BoatDetails", {}, true)
                                .then(function(component){
                                    
                                    that.component = component;
                                    component.set("v.isCallbackCalled", false);
                                    component.set("v.cid", "N/A");
                                    var recordDataCreate = component.find("recordDataCreate");
                                    var recordContactCreate = component.find("recordContactCreate");
                                    var contactId;
                                    
                                    recordContactCreate.getNewRecord("Contact", null, true, function() {
                                       var record = component.get('v.recordTemplate');
                                         record.fields.LastName.value="Test Contact " + (Math.round(Math.random()*10000) + 1);
                                         recordContactCreate.saveRecord(function(saveResult) {
                                            if (saveResult.state === 'SUCCESS') {
                                                component.set("v.cid", saveResult.recordId);  
                                                component.set("v.isCallbackCalled", true);
                                                expect(component.get("v.cid")).toBe(saveResult.recordId);
                                                
                                           }
                                        });
                                    });
                          
                                    return $T.waitFor(function(){
                                        return component.get("v.isCallbackCalled") === true && component.get("v.cid") != null;
                                    }, defaultTimeout).then(function() {
                                        
                                        that.component.set("v.isCallbackCalled", false); // the callback function will set this to true once it's called
                                        recordDataCreate.getNewRecord("Boat__c", null, true, function() {
                                            // once we have  the record template for new record for given entity then update and save the record
                                            var record = component.get('v.recordTemplate');
                                            record.fields.Name.value = "ADSTestBoat" + (Math.round(Math.random()*10000) + 1);
                                            record.fields.Description__c.value = "Description";
                                            record.fields.Price__c.value = "123";
                                            //record.fields.Contact__c.value = "003L000000l38i6";
                                            record.fields.Contact__c.value = component.get("v.cid");
                                            recordDataCreate.saveRecord(function(saveResult) {
                                                if (saveResult.state === 'SUCCESS') {
                                                    component.set("v.id", saveResult.recordId);  
                                                    component.set("v.isCallbackCalled", true);
                                                }
                                            });
                                        });    
                                        return $T.waitFor(function(){
                                            return that.component.get("v.isCallbackCalled") === true;
                                        }, defaultTimeout).then(function() {
                                            
                                            done();
                                        }).catch(function(e) {
                                            done.fail(e);
                                        });
                                        
                                        done();
                                    
                                    }).catch(function(e) {
                                        expect(that.component.get("v.recordError")).toBe("Description");
                                        done.fail(e);
                                    });   
                                   // component.set("v.isCallbackCalled", false);
                                    /* call getNewRecord of force:recordData
                                    recordDataCreate.getNewRecord("Boat__c", null, true, function() {
                                        // once we have  the record template for new record for given entity then update and save the record
                                        var record = component.get('v.recordTemplate');
                                        record.fields.Name.value = "ADSTestBoat" + (Math.round(Math.random()*10000) + 1);
                                        record.fields.Description__c.value = "Description";
                                        record.fields.Price__c.value = "123";
                                        //record.fields.Contact__c.value = "003L000000l38i6";
                                        record.fields.Contact__c.value = component.get("v.cid");
                                        recordDataCreate.saveRecord(function(saveResult) {
                                            if (saveResult.state === 'SUCCESS') {
                                                expect(component.get("v.cid")).toBe("dsadasfdsasd");
                                                component.set("v.id", saveResult.recordId);  
                                                component.set("v.isCallbackCalled", true);
                                            }
                                        });
                                    });
                                   return $T.waitFor(function(){
                                        return component.get("v.isCallbackCalled") === true && component.get("v.id") != null;
                                    }, defaultTimeout);
                                }).then(function() {
                                    done();
                                }).catch(function(e) {
                                    done.fail(e);
                                });
                                
                            });
                    */
                });
            });        
                    afterEach(function() {
                                // Each spec (test) renders its components into the same div,
                                // so we need to clear that div out at the end of each spec.
                                $T.clearRenderedTestComponents();
                                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
                            });
                    
                            /**
                             * This test checks that the force:recordData create method works, and that LDS
                             * is notifying our component with the added/updated data.
                             */
                                // createRecord method in helper is creating record with ADSTestAccount
                                // using force:recordData; the record should be loaded after save
                              
                                it('loads a record and logs a success message when a record is reloaded then deletes the record', function(done) {
                                    var that = this;
                                   
                                    
                                    
                                    that.component.set("v.isCallbackCalled", false); // the callback function will set this to true once it's called
                                    
                                    that.component.find("service").reloadRecord(false, function(){
                                        // verify record is reloaded. callback will be called after recordUpdated event is fired
                                        that.component.set("v.isCallbackCalled", true);
                                    });
                                    
                                    return $T.waitFor(function(){
                                        return that.component.get("v.isCallbackCalled") === true && that.component.get("v.id") != null;
                                    }, defaultTimeout).then(function() {
                                        expect(that.component.find("logMessage").get("v.value")).toBe("Record has been loaded.");
                                        expect(that.component.get("v.record.fields.Price__c.value")).toBe(123);
                                        expect(that.component.get("v.record.fields.Name.value")).toContain("ADSTestBoat");
                                        expect(that.component.get("v.record.fields.Description__c.value")).toBe("Description");
                                        
                                        that.component.set("v.isCallbackCalled", false); // the callback function will set this to true once it's called
                                        that.component.find("service").deleteRecord(function(){
                                             that.component.set("v.isCallbackCalled", true);
                                        });
                                        
                                        return $T.waitFor(function(){
                                            return that.component.get("v.isCallbackCalled") === true;
                                        }, defaultTimeout).then(function() {
                                            expect(that.component.find("logMessage").get("v.value")).toBe("Record has been removed.");
                                            done();    
                                        }).catch(function(e) {
                                            done.fail(e);
                                        });
                                        
                                        
                                    
                                    }).catch(function(e) {
                                        expect(that.component.get("v.recordError")).toBe("Description");
                                        done.fail(e);
                                    });
                              
                                    
                                   
                            });
                                
                    });
                });
  
});