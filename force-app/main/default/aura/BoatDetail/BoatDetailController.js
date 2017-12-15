({
    myAction : function(component, event, helper) {

    },
    onFullDetails : function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        var boatid = component.get("v.boat.Id");
            
        console.log('boatid = ' + boatid);
        navEvt.setParams({
          "recordId": boatid,
          });
        navEvt.fire();
    }
})
