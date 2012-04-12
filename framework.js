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
      template = Mustache.to_html(this.template(), data);
      this.$el = jQuery(template);
    },

    DOM: function(selector) {
      return this.$el.find(selector);
    }
  });

  BEKK.Model = Model.extend({
    events: {},

    on: function(name, callback, context) {
      this.events[name] = {
        callback: callback,
        context: context
      };
    },

    trigger: function(name) {
      var args = Array.prototype.slice.call(arguments, 1);
      var event = this.events[name];
      event.callback.apply(event.context, args)
    },

    fetch: function() {
      this.trigger("fetching");

      // ajax request
      console.log("Fetching: " + this.url);

      this.trigger("success");
    }
  });

  BEKK.show = function(html) {
    jQuery("body").html(html);
  }

})(BEKK, jQuery, Mustache);
