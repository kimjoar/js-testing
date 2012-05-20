describe("Integration tests", function(){

    it("should fetch data from Twitter and populate the view", function(){
        // Tine: I den orginale testen var det noe mystisk, den bør feile pga cross-domain request med json, men den 
        //passerer helt fint i min specrunner:(
        runs(function(){
            var user = new BEKK.User({ screen_name: "kimjoar"});
            this.view = {};

            var base = this;
            user.fetch(function(data) {
                base.view = new BEKK.UserView({ user: data, el: $('<div></div>')  });
                base.view.render();
            });
            
        });

        waits(500);

        runs(function(){
            expect(this.view).toContainInTemplate("Kim Joar");
        });
        
       
    });

    it("should fetch data and populate view", function() {

    });

    xit("should show last tweet for a user", function() {

    });

});
