// namespace

var BEKK = {};

(function(BEKK, jQuery, Mustache) {

  // our framework

  var View = function() {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  };

  var Model = function() {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  }

  View.extend = Model.extend = function (object) {
    var obj = jQuery.extend.call({}, this.prototype, object);
    return obj.constructor;
  }

  BEKK.View = View.extend({
    renderTemplate: function(data) {
      this.content = Mustache.to_html(this.template(), data);
    }
  });

  BEKK.Model = Model.extend({});


  // ensuring that the framework works as expected


  jQuery(function() {
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
  });

})(BEKK, jQuery, Mustache);
