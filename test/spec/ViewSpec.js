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

	//Dette er også mere testing av rammeverket. Men det er jo en  "forbedring" av testen over og viser mere spesifikk testing, 
	//så sånn sett gir det verdi. 
    it("should contain user name in H1 when rendered", function() {
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view.DOM(".name").text()).toMatch("Test Testesen");
    });

    it("should render a model to the template", function() {
        var user = new BEKK.User();
        user.attr("name", "Test Testesen");

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" )});
        view.render();

        expect(view.DOM(".name").text()).toMatch("Test Testesen");
    });

});
