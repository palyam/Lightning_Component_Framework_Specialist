({
   
    onRecordUpdated : function(component, event, helper) {

   
    },
    
     onBoatSelected : function(component, event, helper) {
        
        var boat = event.getParam("boat");
        component.set("v.id",boat.Id);
        component.find("service").reloadRecord();


    }
})
