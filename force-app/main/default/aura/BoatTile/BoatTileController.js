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

        var lat = boat.Geolocation__Latitude__s;
        var long = boat.Geolocation__Longitude__s;
        var label = boat.Name;
        var sObjectId;
        console.log("Geo " + lat + " " + long + " " + label);
        
        var PlotMapMarker = $A.get("e.c:PlotMapMarker");
        PlotMapMarker.setParams({
            "lat"   : lat,
            "long"  : long,
            "label" : label,
            "SObjectId" : boat.Id
        });

        PlotMapMarker.fire();

    }
})
