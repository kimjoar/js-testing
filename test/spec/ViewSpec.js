describe("The user view", function(){

    it("should have a user when initialized", function(){
        var user = {};

        var view = new BEKK.UserView({ user: user });

        expect(view.user).toBeDefined();
    });

    it("should render name to the template on render", function(){
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view).toContainInTemplate("Test Testesen");
    });

    xit("should contain user name in H1 when rendered", function() {

    });

    xit("should render a model to the template", function() {

    });

});
