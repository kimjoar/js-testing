describe("The user view", function(){
	
    beforeEach(function() {
  		this.addMatchers({
    		toContainInTemplate: function(text) {
      		return this.actual.$el.html().indexOf(text) !== -1;
    		}
  		});
	});

    //Hva vi trenger av rammeverket:
    //Initialisering ved opprettelse av modellen, url
    //Fetch fra rammeverket + callback
    //Henter *faktisk* fra Twitter > si noe om hastighet og enterprise
	xit("should fetch data from Twitter and populate the view", function(){
		//KAll twitter
		//callback som setter opp viewet
		//Assert 
	});


	//Sinon
	//Hvordan gjøre mockingen? Fake server
	it("shoudl fetch data and populate view", function() {
		fakeServer();
		//Samme som i testen over
	})
	//Hvorfor bruke reel data? 
	//Teste rammeverket? Lettere oppsett, mindre feil, ++


	//Fixtures

	//fakeServer() - abstraksjonen

	//API: Hvor er tyngden i stacket din? 
	//Kan du velge, lag clean data på serversiden
	//Ellers pass på å kun la modellen ta seg av prossessering.

	//Her introduserer vi events. 
	//Hvorfor blir det slitsomt med callbacks i lengden
	//Fra rammeverket: on og hvordan det gir "fetch:finshed"
	it("should show last tweet for a user", function() {
		//modell for tweet, sette url og kalle fetch (fakeResponse)
		//lage et nytt view, skal bruke on for å lytte på fetch:finished
		//
	})
	//Ikke implementasjonsspesifikt. Hva slags struktur ønsker man å få? Hva ønsker man med testene,
	//mulighet til å refaktorere eller 100% dekning? Teamvalg!

	tweet = model.extend({
		url:
	})

	tweetView = view.extend({
		initialize: function(tweet, el) {
			this.tweet.on("fetch:finished", this.render, this);

		},
		render: function() {
			this.el.html(Mustache.to_html(this.template, this.tweet.toJSON()))
			this.renderTemplate(this.tweet.toJSON());
		},

		template: "{{tekst}}"
	})

	


})