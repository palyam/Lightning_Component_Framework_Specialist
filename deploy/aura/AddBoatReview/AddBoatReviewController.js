({
    doInit : function(component, event, helper) {
        console.log("AddBoatReview doInit Called");
        helper.onInit(component, event, helper)
    },
    
    onSave : function(component, event, helper) {
        component.set("v.boatReview.Boat__c",component.get("v.boat.Id"));
        component.find("service").saveRecord(function(saveResult) {
            
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                 // Success! Prepare a toast UI message
                
                var compEvent = component.getEvent("boatReviewAdded");
                compEvent.fire();
                
                var resultsToast = $A.get("e.force:showToast");
                 if ($A.util.isUndefined(resultsToast)){
                     alert('Review Saved successfully.');
                 }else{
                     resultsToast.setParams({
                       "title": "Saved",
                       "message": "Review Saved successfully."
                   });
               resultsToast.fire();
                 }
                
                 helper.onInit(component, event, helper);
            
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            }else if (saveResult.state === "ERROR") {

                console.log('Problem saving BoatReview, error: ' +
                             JSON.stringify(saveResult.error));
                            
            }else {
                console.log('Unknown problem, state: ' + saveResult.state +
                            ', error: ' + JSON.stringify(saveResult.error));
            }

        });
       
        
    },
    
    
    
    onRecordUpdated : function(cmp, event) {
        //handle the recordUpdated event
        var changeType = event.getParam("changeType");
        if(changeType === "LOADED") {
            // handle record loaded
            cmp.set("v.recordUpdate", "Record has been loaded.");
        } else if(changeType === "CHANGED") {
            var resultsToast = $A.get("e.force:showToast");
            if ($A.util.isUndefined(resultsToast)){
                alert('Review Saved successfully.');
            }else{
                resultsToast.setParams({
                  "title": "Saved",
                  "message": "Review Saved successfully."
              });
          resultsToast.fire();
            }
            
            cmp.set("v.recordUpdate", "Record has been changed.");
        } else if(changeType === "REMOVED") {
            // handle record removed
            cmp.set("v.recordUpdate", "Record has been removed.");
        } else if(changeType === "ERROR") {
            // handle error while loading|saving|deleting record
            cmp.set("v.recordError", "There is some error while loading/updating record.");
        } else {
            // you should not get any other type than these 4 (as of Summer '17)
        }
    }

})
