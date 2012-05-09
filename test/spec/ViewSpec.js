describe("The user view", function(){

    it("should have a user when initialized", function(){
        var user = {};

        var view = new BEKK.UserView({ user: user });

        expect(view.user).toBeDefined();
    });

    xit("should render name to the template on render", function(){
    });

    xit("should render a model to the template", function() {

    });

});
