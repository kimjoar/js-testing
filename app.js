(function(Simple) {

  BEKK.User = Simple.Model.extend({});

  BEKK.UserView = Simple.View.extend({

    template: '<div><h1 class="name">Hei {{name}}!</h1></div>',

    initialize: function(options) {
        this.user = options.user;
    },

    render: function() {
        var data;

        if (this.user instanceof Simple.Model) {
            data = this.user.toJSON();
        } else {
            data = this.user;
        }

        this.el.html(Mustache.to_html(this.template, data));
    }
  });

})(window.Simple);
