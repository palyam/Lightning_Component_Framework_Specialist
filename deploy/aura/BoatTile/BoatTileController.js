({
    onBoatClick : function(component, event, helper) {
        var boatSelectEvent = $A.get("e.c:BoatSelect");
        var selected = event.getSource().get("v.name");
        console.log('Don ' + selected);
        boatSelectEvent.setParams({ "boatId" : selected });
        boatSelectEvent.fire();      
    }
})
