(function(Simple, Mustache) {

  var BEKK = window.BEKK = {};

  BEKK.start = function() {
    var newStatusView = new BEKK.NewStatusView({ el: $("#status-form") });
    newStatusView.render();

    var monologs = new BEKK.Monologs();
    var statusesView = new BEKK.StatusesView({ el: $("#monologs"), monologs: monologs });
    statusesView.render();

    var user = new BEKK.User({ screen_name: "kimjoar" });

    var userView = new BEKK.UserView({ el: $("#profile"), user: user, monologs: monologs });
    user.fetch({
      dataType: "jsonp",
      success: function(date) {
        userView.render();
      }
    });
  };

  BEKK.Monologs = Simple.Model.extend({
    initialize: function() {
      Simple.events.on("new-status", this.add, this);
      this.attr("monologs", []);
    },

    add: function(status) {
      this.attr("monologs").push(status);
      this.trigger("add");
    },

    count: function() {
      return this.attr("monologs").length;
    }
  });

  BEKK.User = Simple.Model.extend({
    initialize: function(options) {
      if (options && options.screen_name) {
        this.name = options.screen_name;
        this.url = "https://api.twitter.com/1/users/show.json?screen_name=" + this.name + "&include_entities=true";
      }
    }
  });

  BEKK.UserView = Simple.View.extend({

    template: '<h2>{{name}}</h2>' +
      '<img src="{{profile_image_url}}" alt="{{name}}">' +
      '<ul>' +
        '<li>Followers: {{followers_count}}</li>' +
        '<li>Following: {{friends_count}}</li>' +
        '<li>Monologer: {{monologs}}</li>' +
      '</ul>',

    initialize: function(options) {
      this.user = options.user;
      this.monologs = options.monologs;

      var base = this;
      if (this.user instanceof Simple.Model) {
        this.user.on("fetch:finished", this.render, this);
      }
      this.monologs.on("add", this.render, this);
    },

    render: function() {
      var data = this.user.toJSON();
      data.monologs = this.monologs.count();
      this.el.html(Mustache.to_html(this.template, data));
    }
  });

  BEKK.NewStatusView = Simple.View.extend({
    template: '<form id="new-status" action="#">' +
        '<label for="status_text">Status</label>' +
        '<textarea id="status_text" name="status" placeholder="Hva tenker du nå?"></textarea>' +
        '<button type="submit" class="btn">Post oppdatering</button>' +
      '</form>',

    events: {
      "submit form": "newStatus"
    },

    render: function() {
      this.el.html(Mustache.to_html(this.template));
    },

    newStatus: function(event) {
      event.preventDefault();
      var status = this.DOM("#status_text").val();
      Simple.events.trigger("new-status", status);
      this.DOM("#status_text").val("");
    }
  });

  BEKK.StatusesView = Simple.View.extend({
    template: '<h2>Oppdateringer</h2>' +
      '<ul>' +
        '{{#monologs}}<li>{{.}}</li>{{/monologs}}' +
      '</ul>',

    initialize: function(options) {
      this.monologs = options.monologs;
      this.monologs.on("add", this.render, this);
    },

    render: function() {
      this.el.html(Mustache.to_html(this.template, this.monologs.toJSON()));
    }
  });

})(Simple, Mustache);
