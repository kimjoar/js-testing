describe("The user view", function(){

    // it("should have a user when initialized", function(){
    //     var user = {};
    //
    //     var view = new BEKK.UserView({ user: user });
    //
    //     expect(view.user).toBeDefined();
    // });

    it("should show user info when rendered", function(){
        var user = new BEKK.User({
            username: "kimjoar"
        });

        var view = new BEKK.UserView({ user: user, el: $("<div></div>" ) });

        var options = {};
        var data = '{ "id": 1, "name": "Kim Joar Bekkelund" }';

        fakeResponse(data, options, function() {
            user.fetch();
        });

        expect(view.$('h2')).toHaveText("Kim Joar Bekkelund");
    });

    xit("should update view when monolog is added", function() {
    });

});
