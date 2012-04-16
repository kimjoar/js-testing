(function(BEKK, $, Mustache) {

  // Function constructor for views
  var View = function() {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  };

  // Function constructor for models
  var Model = function() {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  }

  // Add extend method to views and models, so it's easier to create
  // objects which extend from a parent
  View.extend = Model.extend = function (object) {
    var obj = $.extend.call({}, this.prototype, object);
    return obj.constructor;
  }

  // Utility functions for views
  BEKK.View = View.extend({
    // render the view to `$el`
    renderTemplate: function(data) {
      template = Mustache.to_html(this.template(), data);
      this.$el = $(template);
      this.delegateEvents();
    },

    // find something in the views DOM
    DOM: function(selector) {
      return this.$el.find(selector);
    },

    delegateEvents: function() {
      if (!this.events) return;

      for (var key in this.events) {
        var methodName = this.events[key];
        var method = $.proxy(this[methodName], this);

        var match = key.match(/^(\w+)\s*(.*)$/);
        var eventName = match[1];
        var selector  = match[2];

        this.$el.delegate(selector, eventName, method);
      }
    }
  });

  // Utility functions for models
  BEKK.Model = Model.extend({
    events: {},

    // register event listeners
    on: function(name, callback, context) {
      this.events[name] || (this.events[name] = []);
      this.events[name].push({
        callback: callback,
        context: context
      });
    },

    // trigger an event
    trigger: function(name) {
      var args = Array.prototype.slice.call(arguments, 1);
      var events = this.events[name];
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        event.callback.apply(event.context, args);
      }
    },

    // fetch information from some server
    fetch: function() {
      this.trigger("fetching");

      // ajax request
      console.log("Fetching: " + this.url);

      this.trigger("success");
    },

    save: function() {
      if (this.isValid()) {
        this.trigger("saving");
        // ajax post
        this.trigger("success");
      }
    },

    isValid: function() {
      var error = this.validate && this.validate()
      if (!error) return true;
      this.trigger("error", error);
      return false;
    },

    toJSON: function() {
      if (!this.attributes) return {};

      var attr = {};

      for (var i = 0; i < this.attributes.length; i++) {
        var key = this.attributes[i];
        attr[key] = this[key];
      }

      return attr;
    }
  });

  // Method for rendering the application to the DOM
  BEKK.show = function(html) {
    $("body").html(html);
  }

})(BEKK, jQuery, Mustache);
