(function(Simple, Mustache) {

  var BEKK = window.BEKK = {};

  BEKK.UserView = Simple.View.extend({
    template: '<h2>{{name}}</h2>' +
      '<img src="{{profile_image_url}}" alt="{{name}}">' +
      '<ul>' +
        '<li>Followers: <span class="followers">{{followers_count}}</span></li>' +
        '<li>Following: <span class="following">{{friends_count}}</span></li>' +
        '<li>Monologs: <span class="monologs">{{monologs}}</span></li>' +
      '</ul>'
  });

  // eksempel-url: https://api.twitter.com/1/users/show.json?screen_name=kimjoar&include_entities=true
  // BEKK.User = Simple.Model.extend({
  //   dataType: "jsonp",

  //   initialize: function(options) {
  //   }
  // });

  BEKK.start = function() {
    // initialiser modell
    // initialiser view
    // render view
  };

  // Vi legger delt view-funksjonalitet i et eget lag i arkiteturen
  // BEKK.View = Simple.View.extend({
  //   renderTemplate: function(data) {
  //     this.el.html(Mustache.to_html(this.template, data || {}));
  //   }
  // });

  // BEKK.Monologs = Simple.Model.extend({
  //   initialize: function() {
  //     this.attr("monologs", []);
  //   },

  //   add: function(status) {
  //     this.attr("monologs").push(status);
  //     this.trigger("add");
  //   },

  //   count: function() {
  //     return this.attr("monologs").length;
  //   }
  // });

  // BEKK.NewStatusView = BEKK.View.extend({
  //   template: '<form id="new-status" action="#">' +
  //       '<label for="status_text">Status</label>' +
  //       '<textarea id="status_text" name="status" placeholder="Hva tenker du nå?"></textarea>' +
  //       '<button type="submit" class="btn">Post oppdatering</button>' +
  //     '</form>'
  // });

  // BEKK.StatusesView = BEKK.View.extend({
  //   template: '<h2>Oppdateringer</h2>' +
  //     '<ul>' +
  //       '{{#monologs}}<li>{{.}}</li>{{/monologs}}' +
  //     '</ul>'
  // });

})(Simple, Mustache);
