(function(BEKK, jQuery, Mustache) {

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

})(BEKK, jQuery, Mustache);
