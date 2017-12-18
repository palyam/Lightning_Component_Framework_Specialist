({
    doInit : function(component, event, helper) {
        console.log("BoatReviews doInit Called")
        helper.onInit(component, event, helper);
    },

    onBoatSelected : function(component, event, helper) {
        console.log("reviews onBoatSelected ")
        var boat = event.getParam("boat");
        component.set("v.boat",boat);
  
   },

   onUserInfoClick : function(component,event,helper){
    var userId = event.currentTarget.getAttribute("data-userid");
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        "recordId" : userId,
    });
    navEvt.fire()

},
})
