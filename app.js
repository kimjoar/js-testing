(function(BEKK) {

  BEKK.start = function() {
    var User = BEKK.Model.extend({
      toJSON: function() {
        return {
          user: "Tine"
        }
      }
    });

    var UserView = BEKK.View.extend({
      initialize: function(user) {
        this.user = user;
      },

      render: function() {
        this.renderTemplate(this.user.toJSON());
        $("body").append(this.content);
        return this;
      },

      template: function() {
        return "<h1>Hei {{user}}!</h1>";
      }
    });

    var user = new User();
    var userView = new UserView(user);
    userView.render();
  };

})(BEKK);
