(function(BEKK) {

  BEKK.UserView = BEKK.View.extend({

    template: "<div><h1>Hei {{name}}!</h1></div>",

    initialize: function(options) {
        this.user = options.user;
    }
  });

})(BEKK);
