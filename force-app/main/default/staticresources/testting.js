/**
 * This test suite contains examples that illustrate reusable patterns for testing
 * your custom Lightning components.
 *
 * These tests are written using the [Jasmine framework](https://jasmine.github.io/2.1/introduction).
 * They're run in the Lightning Testing Service using a wrapper, which you can find
 * in jasmineboot.js, in the same repository as this test suite.
 *
 * Note that Jasmine uses "spec" as its name for a test. We use their terminology here
 * for consistency with their documentation.
 */
describe("Lightning Component Testing Examples", function(){
    afterEach(function() {
        // Each spec (test) renders its components into the same div,
        // so we need to clear that div out at the end of each spec.
        $T.clearRenderedTestComponents();
    });

    /**
     * Component under test: 'c:egRenderElement':
     * This spec creates a component, adds it to the body, waits for the rendering to complete,
     * and then ensures that the expected content has been added to the DOM.
     * NOTE: The spec and the component under test are in same locker (same namespace),
     *       so the spec is able to see the DOM owned by the component.
     */
    describe('c:BoatSearchForm', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        it('renders specific New Button Is Visible', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchForm", {}, "renderTestComponents")
              .then(function(component) {
                component.set("v.showNewButton", "true");
                expect(component.find("SearchButton").get("v.label")).toBe("Search");
                expect(component.find("NewButton").get("v.label")).toBe("New");

                

                // end this spec successfully
                done();
            }).catch(function(e) {
                // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });

    describe('c:BoatSearchForm', function(){
        // We encourage you to have the code for c:egRenderElement side by side
        // when reading through this spec.
        it('We have 2 new Boat Types', function(done) {
            // Define where the component should be rendered during the test.
            // You can update Tests.app to define your own DOM element.
            var renderInto = document.getElementById("renderTestComponents");
            // Instantiate and render the c:egRenderElement Lightning component into the renderInto element.
            // The second parameter (empty here) is the list of component attribute values to set.
            $T.createComponent("c:BoatSearchForm", {}, "renderTestComponents")
              .then(function(component) {
                var res = {getState : function(){return "SUCCESS";}, getReturnValue: function(){return [{"Boat1":"1"},{"Boat2":"2"}];}};
                spyOn($A, "enqueueAction").and.callFake(function(action) {
                    var cb = action.getCallback("SUCCESS")
                    cb.fn.apply(cb.s, [res]);
                });
                component.loadBoatTypes();
                expect(component.get("v.options").length).toBe(2);
                // end this spec successfully
                done();
            }).catch(function(e) {
                // end this spec as a failure
                done.fail(e);
            });
    
    }); 
    });

});