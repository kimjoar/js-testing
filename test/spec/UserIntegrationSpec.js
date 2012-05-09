describe("Integration tests", function(){

    it("should fetch data from Twitter and populate the view", function(){
        var user = new BEKK.User({ screen_name: "kimjoar", el: $('<div></div>') });

        user.fetch(function(data) {
            var view = new BEKK.UserView({ data: data });
            view.render();

            expect(true).toBeFalsy();
        });
    });

    xit("should fetch data and populate view", function() {

    });

    xit("should show last tweet for a user", function() {

    });

});
