(function(Simple) {

  BEKK.UserView = Simple.View.extend({

    template: "<div><h1>Hei {{name}}!</h1></div>",

    initialize: function(options) {
        this.user = options.user;
    },

    render: function() {
        this.el.html(Mustache.to_html(this.template, this.user));
    }
  });

})(window.Simple);
