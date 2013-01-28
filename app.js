(function(Backbone, Mustache) {

  var BEKK = window.BEKK = {};

  BEKK.start = function() {
    // kalles av index.html
    // her kan vi (etterhvert) starte applikasjonen
  };

  BEKK.User = Backbone.Model.extend({

      url: function() {
          return 'https://api.twitter.com/1/users/show.json?screen_name=' + this.get('username');
      }

  });

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
      this.user.on('change', this.render, this);
    },

    render: function() {
      var html = Mustache.to_html(this.template, this.user.toJSON());
      this.$el.html(html);
    }
  });

  BEKK.FriendsView = Backbone.View.extend({});

})(Backbone, Mustache);
