// namespace

var BEKK = {};

// our framework

(function(BEKK, jQuery) {

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

  BEKK.View = View;
  BEKK.Model = Model;

})(BEKK, jQuery);

// ensuring that the framework works as expected

var BaseView = BEKK.View.extend({
  render: function() {
    console.log("render");
  }
});

var UserView = BaseView.extend({
  initialize: function() {
    console.log("userview");
  }
});

var userView = new UserView();
userView.render();

var BaseModel = BEKK.Model.extend({
  initialize: function() {
    console.log("model");
  }
});

new BaseModel();
