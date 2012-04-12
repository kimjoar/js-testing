(function(BEKK) {

  BEKK.start = function() {
    var User = BEKK.Model.extend({
      toJSON: function() {
        return {
          user: "Tine"
        }
      },

      get: function() {
        this.trigger("fetching");
        // ajax request
        this.trigger("success");
      }
    });

    var UserView = BEKK.View.extend({
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

      template: function() {
        return "<div><h1>Hei {{user}}!</h1></div>";
      }
    });

    var user = new User();
    var userView = new UserView(user);
    BEKK.show(userView.render().$el);

    user.get();
  };

})(BEKK);
