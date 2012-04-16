(function(BEKK) {

  BEKK.start = function() {
    var user = new User();
    user.name = "Tine";

    var userView = new UserView(user);

    BEKK.show(userView.render().$el);

    user.fetch();
  };

  var User = BEKK.Model.extend({
    url: "https://api.twitter.com/1/users/show.json?screen_name=tinekl",
    attributes: ["name"],

    validate: function() {
      if (this.name !== "Tine") {
        return "name is wrong";
      }
    }
  });

  var UserView = BEKK.View.extend({
    events: {
      "click h1": "clicked"
    },

    template: "<div><h1>Hei {{name}}!</h1></div>",

    initialize: function(user) {
      this.user = user;
      this.user.on("fetching", this.fetching, this);
      this.user.on("success", this.done, this);
    },

    render: function() {
      this.renderTemplate(this.user.toJSON());
      return this;
    },

    fetching: function() {
      this.$el.append("<p>Ajax starting</p>");
    },

    done: function() {
      this.$el.append("<p>Ajax done</p>");
    },

    clicked: function() {
      this.$el.append("<p>cool</p>");
    }
  });

})(BEKK);
