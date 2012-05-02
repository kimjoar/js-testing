describe("The user view", function(){
	//Den aller enkleste testen.
	//Krever denne app-koden
	/*
	BEKK.UserView = BEKK.View.extend({
    template: "<div><h1>Hei {{name}}!</h1></div>",

    initialize: function(user) {
      this.user = user;
    }*/
    beforeEach(function() {
  		this.addMatchers({
    		toContainInTemplate: function(text) {
      		return this.actual.el.html().indexOf(text) !== -1;
    		}
  		});
	});

    //Hva vi trenger av rammeverket:
    //Initialisering ved opprettelse
    //Sette ting på view med this
	it("should have a user when initialized", function(){
		
	});

	//Vi introduserer render og template
	//teste innholdet i templaten som mål
	//Fra rammeverket: el
	it("should render name to the template on render", function(){
		user = {};
		user.name = "Kim Joar"
		var userView = new BEKK.UserView(user).render();
		expect(userView).toContainInTemplate("Kim Joar");
	});
	//Snakke om ett lag til med views. Base som tar seg av all templating. Vi lager eksempel og legger ut. 

	
	//Innføring av modell
	//Fra rammeverket: forklarer initialize som på viewet, attr-funksjonen, toJSON (forklaring om "enderbarhet")
	it("should render a model to the template", function() {
		var user = new User();
		user.attr("name", "Tine");
		var userView = new BEKK.UserView(user).render();
		expect(userView).toContainInTemplate("Tine")
	})

})