(function(Simple, Mustache) {

  var BEKK = window.BEKK = {};

  BEKK.start = function() {
    // called when the app can be started
    var user = new BEKK.User({ screen_name: "kimjoar" });
    var userView = new BEKK.UserView({ el: $("#profile"), user: user });
    user.fetch({
      dataType: "jsonp",
      success: function(date) {
        userView.render();
      }
    });
  };

  BEKK.User = Simple.Model.extend({
    initialize: function(options) {
      if (options && options.screen_name) {
        this.name = options.screen_name;
        this.url = "https://api.twitter.com/1/users/show.json?screen_name=" + this.name + "&include_entities=true";
      }
    }
  });

  BEKK.UserView = Simple.View.extend({

    template: '<h2>{{name}}</h2>' +
      '<img src="{{profile_image_url}}" alt="{{name}}">' +
      '<ul>' +
        '<li>Followers: {{followers_count}}</li>' +
        '<li>Following: {{friends_count}}</li>' +
        '<li>Monologer: {{statuses_count}}</li>' +
      '</ul>',

    initialize: function(options) {
      this.user = options.user;

      var base = this;
      if (this.user instanceof Simple.Model) {
        this.user.on("fetch:finished", function(){
          base.render();
        });
      }
    },

    render: function() {
      var data;

      if (this.user instanceof Simple.Model) {
        data = this.user.toJSON();
      } else {
        data = this.user;
      }

      this.el.html(Mustache.to_html(this.template, data));
    }
  });

  BEKK.NewStatusView = Simple.View.extend({
  });

  BEKK.StatusesView = Simple.View.extend({
  });

})(Simple, Mustache);
