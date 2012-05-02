(function(BEKK) {
/*
  BEKK.start = function() {
    var user = new User();
    user.name = "Tine";

    var userView = new UserView(user);

    // legger userView i DOM-en
    BEKK.show(userView.render().$el);

    user.fetch();

    userView.$el.append("<p>It is valid (name = " + user.name + ")? " + (user.isValid() ? "JA!" : "nope") + "</p>");

    user.name = "Kim";

    userView.$el.append("<p>It is valid (name = " + user.name + ")? " + (user.isValid() ? "JA!" : "nope") + "</p>");
  };*/
  

  BEKK.User = BEKK.Model.extend({
    initialize: function(url) {

    }
  });

  BEKK.UserView = BEKK.View.extend({
    /*events: {
      "click h1": "clicked"
    },*/

    template: "<div><h1>Hei {{name}}!</h1></div>",

    initialize: function(user, el) {
      this.user = user;
      this.el = el;
      //this.user.on("feching", this.fetching, this);
      //this.user.on("success", this.done, this);
    },

    render: function() {
      this.el.html(Mustache.to_html(this.template, user))
      return this;
    },
/*
    fetching: function() {
      this.$el.append("<p>Ajax starting</p>");
    },

    done: function() {
      this.$el.append("<p>Ajax done</p>");
    },

    clicked: function() {
      this.$el.append("<p>click</p>");
      this.DOM("h1").append("!");
    }*/
  });

})(BEKK);
