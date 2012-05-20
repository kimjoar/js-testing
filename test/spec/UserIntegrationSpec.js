describe("Integration tests", function(){

    xit("should fetch data from Twitter and populate the view", function(){
        // Tine: I den orginale testen var det noe mystisk, den bør feile pga cross-domain request med json, men den 
        //passerer helt fint i min specrunner:(
        //OBS: jsonp trengs i simple.js
        runs(function(){
            var user = new BEKK.User({ screen_name: "kimjoar"});
            this.view = {};

            var base = this;
            user.fetch(function(data) {
                base.view = new BEKK.UserView({ user: data, el: $('<div></div>')  });
                base.view.render();
            });
            
        });

        waits(1000);

        runs(function(){
            expect(this.view).toContainInTemplate("Kim Joar");
        });
        
       
    });
    //
    //OBS: json trengs i simple.js. JSONP detekteres ikke av sinon.js, ref: http://groups.google.com/group/sinonjs/browse_thread/thread/fcdc7a733050be2d
    it("should fetch fake data and populate view", function() {

        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {},
                                 '{"name":"Kim Joar Bekkelund","screen_name":"kimjoar"}']);


        var user = new BEKK.User({screen_name: "kimjoar"});

        var base = this;
        var callback = function(data){
            base.view = new BEKK.UserView({ user: data, el: $('<div></div>')  });
            base.view.render();
        };
        
        user.fetch(callback);   

        this.server.respond();
        expect(this.view).toContainInTemplate("Kim Joar");
        this.server.restore();

    });

    it("should show last tweet for a user", function() {
        
    });

});
