({
    onBoatClick : function(component, event, helper) {


        var boatSelectEvent = component.getEvent("BoatSelect");
        var selected = event.getSource().get("v.name");
        boatSelectEvent.setParams({ "boatId" : selected });
        boatSelectEvent.fire();      
        
        var boatSelectedEvent = $A.get("e.c:BoatSelected");
        var boat = component.get("v.boat")
        boatSelectedEvent.setParams({ "boat" : boat });
        boatSelectedEvent.fire();

    }
})
