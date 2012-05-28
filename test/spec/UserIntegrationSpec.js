describe("Integration tests", function(){

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

    //OBS: json trengs i simple.js. JSONP detekteres ikke av sinon.js, ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d
    it("should fetch fake data and populate view", function() {

        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
          '{"name":"Kim Joar Bekkelund","screen_name":"kimjoar"}']);

        var user = new BEKK.User({screen_name: "kimjoar"});
        user.dataType = "json";

        var view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.fetch(function(){
            view.render();
        });

        this.server.respond();
        expect(view).toContainInDOM("Kim Joar");
        this.server.restore();

    });

	//Ønsker vi å beholde denne testen. Den tester mer rammeverket enn vår egen app, men vi sikrer oss at fetch:finished gjør det den skal.
    it("should trigger fetch:finished on fetch and populate the model with data", function(){

        //Er dette mere testing av rammeverk? Tester at modellen blir populert rett slik at neste test kan populere modellen selv.
        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
          '{"id":20823739,"id_str":"20823739","name":"Kim Joar Bekkelund","location":"Oslo, Norway"}']);


        var user = new BEKK.User({screen_name: "kimjoar"});
        user.dataType = "json";

        var spy = sinon.spy(user, "trigger");
        var base = this;

        user.fetch();

        this.server.respond();
        expect(user.attr("id")).toEqual(20823739);
        expect(user.attr("id_str")).toEqual("20823739");
        expect(user.attr("name")).toEqual("Kim Joar Bekkelund");
        expect(user.attr("location")).toEqual("Oslo, Norway");

        expect(spy.callCount).toEqual(2);
        expect(spy.getCall(0).calledWith("fetch:started")).toBeTruthy();
        expect(spy.getCall(1).calledWith("fetch:finished")).toBeTruthy();

        user.trigger.restore();

        this.server.restore();
    });

    it("on fetch:finished the view should render with correct name", function() {
        var user = new BEKK.User({screen_name: "kimjoar"});
        user.attr("name", "Kim Joar Bekkelund");

        this.view = new BEKK.UserView({ user: user, el: $('<div></div>')  });

        user.trigger("fetch:finished");

        expect(this.view).toContainInDOM("Kim Joar");

    });

});

