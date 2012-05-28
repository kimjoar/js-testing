(function(Simple, Mustache) {

  var BEKK = window.BEKK = {};

  BEKK.start = function() {
    var monologs = new BEKK.Monologs();
    var user = new BEKK.User({ screen_name: "kimjoar" });

    var newStatusView = new BEKK.NewStatusView({ el: $("#status-form") });
    newStatusView.render();

    var statusesView = new BEKK.StatusesView({ el: $("#monologs"), monologs: monologs });
    statusesView.render();

    var userView = new BEKK.UserView({ el: $("#profile"), user: user, monologs: monologs });
    user.fetch({
      dataType: "jsonp",
      success: function(date) {
        userView.render();
      }
    });
  };

  BEKK.View = Simple.View.extend({
    renderTemplate: function(data) {
      this.el.html(Mustache.to_html(this.template, data || {}));
    }
  });

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
      this.name = options.screen_name;
      this.url = "https://api.twitter.com/1/users/show.json?screen_name=" + this.name + "&include_entities=true";
    }
  });

  BEKK.UserView = BEKK.View.extend({

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
      this.renderTemplate(data);
    }
  });

  BEKK.NewStatusView = BEKK.View.extend({
    template: '<form id="new-status" action="#">' +
        '<label for="status_text">Status</label>' +
        '<textarea id="status_text" name="status" placeholder="Hva tenker du nå?"></textarea>' +
        '<button type="submit" class="btn">Post oppdatering</button>' +
      '</form>',

    events: {
      "submit form": "newStatus"
    },

    render: function() {
      this.renderTemplate();
    },

    newStatus: function(event) {
      event.preventDefault();
      var status = this.DOM("#status_text").val();
      Simple.events.trigger("new-status", status);
      this.DOM("#status_text").val("");
    }
  });

  BEKK.StatusesView = BEKK.View.extend({
    template: '<h2>Oppdateringer</h2>' +
      '<ul>' +
        '{{#monologs}}<li>{{.}}</li>{{/monologs}}' +
      '</ul>',

    initialize: function(options) {
      this.monologs = options.monologs;
      this.monologs.on("add", this.render, this);
    },

    render: function() {
      this.renderTemplate(this.monologs.toJSON());
    }
  });

})(Simple, Mustache);
