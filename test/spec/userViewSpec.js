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

    it("should fetch data from Twitter and populate the view", function(){
        var view;

        runs(function(){
            var user = new BEKK.User({ screen_name: "kimjoar"});
            view = new BEKK.UserView({ user: user, el: $('<div></div>') });

            user.fetch(function() {
                view.render();
            });
        });

        waits(1000);

        runs(function(){
            expect(view).toContainInDOM("Kim Joar");
        });
    });

    it("should populate the view when data is fetched (", function() {
        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
          '{"name": "Kim Joar Bekkelund","followers_count": "200"}']);

        var user = new BEKK.User({screen_name: "kimjoar"});

        // sinon.js støtter ikke JSONP (ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d)
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch(function(){
            view.render();
        });

        this.server.respond();
        this.server.restore();

        expect(view.DOM("h2").text()).toMatch("Kim Joar Bekkelund");
        expect(view.DOM(".followers").text()).toMatch("200");
    });

    it("should populate the view when data is fetched", function(){
        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
          '{"name": "Kim Joar Bekkelund","followers_count": "200"}']);

        var user = new BEKK.User({screen_name: "kimjoar"});

        // sinon.js støtter ikke JSONP (ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d)
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch();

        this.server.respond();
        this.server.restore();

        expect(view.DOM("h2").text()).toMatch("Kim Joar Bekkelund");
        expect(view.DOM(".followers").text()).toMatch("200");
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
