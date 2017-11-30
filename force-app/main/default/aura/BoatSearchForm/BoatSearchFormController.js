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
    }
})

