({
    jsLoaded: function(component) {
        component.set("v.jsLoaded", true);
    } ,
    
    onPlotMapMarker : function(component, event, helper) {
		var lat = event.getParam("lat");
		var long = event.getParam("long");
        var label = event.getParam("label")
		console.log("onPlotMapMarker.lat: " + lat);
		console.log("onPlotMapMarker.long: " + long);
        		console.log("onPlotMapMarker.label: " + label);
        component.set("v.location", {'lat' : lat, 'long' : long, 'label' : label});

        
     },
})