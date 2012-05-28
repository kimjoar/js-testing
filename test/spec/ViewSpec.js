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

        expect(view).toContainInDOM("Test Testesen");
    });

    it("should contain user name when rendered", function() {
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view.DOM("h2").text()).toMatch("Test Testesen");
    });

    it("should render a model to the template", function() {
        var user = new BEKK.User({ screen_name: "kimjoar" });
        user.attr("name", "Kim Joar Bekkelund");

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" )});
        view.render();

        expect(view.DOM("h2").text()).toMatch("Kim Joar Bekkelund");
    });

});
