(function(Backbone, Mustache) {

  var BEKK = window.BEKK = {};

  BEKK.start = function() {
    // kalles av index.html
    // her kan vi (etterhvert) starte applikasjonen
  };

  BEKK.UserView = Backbone.View.extend({
    template: '<h2>{{name}}</h2>' +
      '<img src="{{profile_image_url}}" alt="{{name}}">' +
      '<ul>' +
        '<li>Followers: <span class="followers">{{followers_count}}</span></li>' +
        '<li>Following: <span class="following">{{friends_count}}</span></li>' +
        '<li>Monologs: <span class="monologs">{{monologs}}</span></li>' +
      '</ul>',

    initialize: function(options) {
      this.user = options.user;
    }
  });

  BEKK.FriendsView = Backbone.View.extend({});

})(Backbone, Mustache);
