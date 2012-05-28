describe("User integration tests", function(){

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

    it("should fetch fake data and populate view", function() {

        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
          '{"name":"Kim Joar Bekkelund","screen_name":"kimjoar"}']);

        var user = new BEKK.User({screen_name: "kimjoar"});

        // sinon.js støtter ikke JSONP (ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d)
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch(function(){
            view.render();
        });

        this.server.respond();
        expect(view).toContainInDOM("Kim Joar");
        this.server.restore();

    });

    it("should populate the view when data is fetched", function(){

        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
          '{"name":"Kim Joar Bekkelund","followers_count":"200"}']);

        var user = new BEKK.User({screen_name: "kimjoar"});
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch();

        this.server.respond();

        expect(view.DOM("h2").text()).toMatch("Kim Joar Bekkelund");
        expect(view.DOM(".followers").text()).toMatch("200");

        this.server.restore();
    });

});
