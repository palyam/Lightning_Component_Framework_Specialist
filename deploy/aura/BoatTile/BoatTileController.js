({
    onBoatClick : function(component, event, helper) {
        var boatSelectEvent = component.getEvent("BoatSelect");
        var selected = event.getSource().get("v.name");
        console.log('Don ' + selected);
        boatSelectEvent.setParams({ "boatId" : selected });
        boatSelectEvent.fire();      
    }
})
