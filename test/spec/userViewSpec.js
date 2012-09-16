describe("The user view", function(){

    // dette er en test man ikke ville hatt til vanlig, men er bare for å
    // komme igang med rammeverket
    it("should have a user when initialized", function(){
        var user = {};

        var view = new BEKK.UserView({ user: user });

        expect(view.user).toBeDefined();
    });

    // test som ville blitt refaktorert bort med innføring av modeller
    it("should show name when rendered", function(){
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view).toContainInDOM("Test Testesen");
    });

    // test som ville blitt refaktorert bort med innføring av modeller
    it("should show name in heading when rendered", function() {
        var user = {
            name: "Test Testesen"
        };

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });
        view.render();

        expect(view.DOM("h2")).toHaveText("Test Testesen");
    });

    // test som ville blitt refaktorert bort med innføring av henting av
    // data i modell
    it("should render model", function() {
        var user = new BEKK.User({ screen_name: "kimjoar" });
        user.attr("name", "Kim Joar Bekkelund");

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" )});
        view.render();

        expect(view.DOM("h2")).toHaveText("Kim Joar Bekkelund");
    });

    // test som ville blitt refaktorert bort siden den er altfor treg --- mocker isteden kallet
    it("should populate the view when data is fetched", function() {
        var view;

        runs(function(){
            var user = new BEKK.User({ screen_name: "kimjoar"});
            view = new BEKK.UserView({ user: user, el: $('<div></div>') });

            user.fetch({
              success: function() {
                view.render();
              }
            });
        });

        waits(1000);

        runs(function(){
            expect(view.DOM("h2")).toHaveText("Kim Joar Bekkelund");
        });
    });

    beforeEach(function() {
        this.response = '{"name": "Kim Joar Bekkelund","followers_count": "200","friends_count": "100"}';
        this.options = {};
    });

    // test som ville blitt refaktorert bort siden den benytter callback
    // istedenfor event
    it("should populate the view when data is fetched", function() {
        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, this.options , this.response]);

        var user = new BEKK.User({screen_name: "kimjoar"});

        // sinon.js støtter ikke JSONP (ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d)
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch({
          success: function() {
            view.render();
          }
        });

        this.server.respond();
        this.server.restore();

        expect(view.DOM("h2")).toHaveText("Kim Joar Bekkelund");
        expect(view.DOM(".followers")).toHaveText("200");
        expect(view.DOM(".following")).toHaveText("100");
    });

    // test som ville blitt refaktorert på grunn av innføring av fakeResponse
    it("should populate the view when data is fetched", function(){
        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, this.options, this.response]);

        var user = new BEKK.User({screen_name: "kimjoar"});

        // sinon.js støtter ikke JSONP (ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d)
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch();

        this.server.respond();
        this.server.restore();

        expect(view.DOM("h2")).toHaveText("Kim Joar Bekkelund");
        expect(view.DOM(".followers")).toHaveText("200");
        expect(view.DOM(".following")).toHaveText("100");
    });

    it("should populate the view when data is fetched", function(){
        var user = new BEKK.User({screen_name: "kimjoar"});

        // sinon.js støtter ikke JSONP (ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d)
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        fakeResponse(this.response, this.options, function() {
          user.fetch();
        });

        expect(view.DOM("h2")).toHaveText("Kim Joar Bekkelund");
        expect(view.DOM(".followers")).toHaveText("200");
        expect(view.DOM(".following")).toHaveText("100");
    });

    it("should update view when monolog is added", function() {
        var user = new BEKK.User({ screen_name: "kimjoar" });
        var monologs = new BEKK.Monologs();

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ), monologs: monologs });
        view.render();

        expect(view.DOM(".monologs")).toHaveText('0');

        monologs.add("test");

        expect(view.DOM(".monologs")).toHaveText('1');
    });

});
