({
    doSearch  : function(component, event, helper) {
			  helper.onSearch(component, event, helper);
    },
<<<<<<< HEAD

    onBoatSelect : function(component, event, helper) {
        var boatId = event.getParam("boatId");
        component.set("v.selectedBoatId",boatId);

    }
=======
    search: function(component, event, helper){
        console.log("BSRController: search called");
        var params = event.getParam('arguments');
        console.log("boatTypeId extracted: " + params.boatTypeId);
        component.set("v.typeId", params.boatTypeId);
       
        helper.onSearch(component);
        return "search complete.";
    },
>>>>>>> Implement_the_Search_Filter

})