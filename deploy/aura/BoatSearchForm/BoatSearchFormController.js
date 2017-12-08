({
    loadOptions: function (component, event, helper) {
            helper.getTypesOfBoats(component);
            helper.renderNewButton(component);

    },

    loadBoats: function (component, event, helper) {
        helper.getTypesOfBoats(component);
    },

    loadButton: function (component, event, helper) {
        helper.renderNewButton(component);

    },

    createRecord : function (component, event, helper) {
        
        var boat = component.find("boatSelect").get("v.value");
        if(!boat){
            boat = null;
        }
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Boat__c",
            "defaultFieldValues": {
                'BoatType__c' : boat
            }

        });
        createRecordEvent.fire();
    },

    fuckme :  function(component, event, helper){
            console.log('fucking JOKE');
    },
    onFormSubmit : function(component, event, helper){
        var boatTypeId = component.get("v.selectedValue");
        console.log("Search button pressed " + boatTypeId);
        var formSubmit = component.getEvent("formsubmit");
        formSubmit.setParams({"formData":
                            {"boatTypeId" : boatTypeId}
        });
        formSubmit.fire();
    },
})

