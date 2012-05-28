describe("The user view", function(){

    it("should have a user when initialized", function(){
        var user = {};

        var view = new BEKK.UserView({ user: user });

        expect(view.user).toBeDefined();
    });

    it("should show name when rendered", function(){
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view).toContainInDOM("Test Testesen");
    });

    it("should show name in heading when rendered", function() {
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view.DOM("h2").text()).toMatch("Test Testesen");
    });

    it("should render model", function() {
        var user = new BEKK.User({ screen_name: "kimjoar" });
        user.attr("name", "Kim Joar Bekkelund");

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" )});
        view.render();

        expect(view.DOM("h2").text()).toMatch("Kim Joar Bekkelund");
    });

    it("should update view when monolog is added", function() {
        var user = new BEKK.User({ screen_name: "kimjoar" });
        var monologs = new BEKK.Monologs();

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ), monologs: monologs });
        view.render();

        expect(view.DOM(".monologs").text()).toEqual('0');

        monologs.add("test");

        expect(view.DOM(".monologs").text()).toEqual('1');
    });

});
