({
    helperMethod : function() {

    },

    onInit : function(component, event, helper) {

        component.find("service").getNewRecord(
            "BoatReview__c", // objectApiName
            null, // recordTypeId
            false, // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.boatReviewRecord");
                var error = component.get("v.recordError");
                console.log('hey', JSON.stringify(rec));

                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    
              //      rec.Boat__c = component.get("v.boat").Id;
                //    component.set("v.boatReview",rec);
                  //  console.log("Record template initialized: " + rec.sobjectType);
                    
                }
            })
        );

    },
    
})
