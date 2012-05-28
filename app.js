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
    user.fetch();
  };

  // Vi legger delt view-funksjonalitet i et eget lag i arkiteturen
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
    dataType: "jsonp",

    initialize: function(options) {
      this.name = options.screen_name;
      this.url = "https://api.twitter.com/1/users/show.json?screen_name=" + this.name + "&include_entities=true";
    }
  });

  BEKK.UserView = BEKK.View.extend({
    template: '<h2>{{name}}</h2>' +
      '<img src="{{profile_image_url}}" alt="{{name}}">' +
      '<ul>' +
        '<li>Followers: <span class="followers">{{followers_count}}</span></li>' +
        '<li>Following: <span class="following">{{friends_count}}</span></li>' +
        '<li>Monologs: <span class="monologs">{{monologs}}</span></li>' +
      '</ul>',

    initialize: function(options) {
      this.user = options.user;
      if (this.user instanceof Simple.Model) {
        this.user.on("fetch:finished", this.render, this);
      }

      if (options.monologs) {
        this.monologs = options.monologs;
        this.monologs.on("add", this.render, this);
      }
    },

    render: function() {
      var data;
      if (this.user instanceof Simple.Model) {
        data = this.user.toJSON();
      } else {
        data = this.user;
      }
      if (this.monologs) {
        data.monologs = this.monologs.count();
      }
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

    input: function(newValue) {
      if (typeof newValue === "undefined") {
        return this.DOM("#status_text").val();
      } else {
        this.DOM("#status_text").val(newValue);
      }
    },

    newStatus: function(event) {
      event.preventDefault();
      Simple.events.trigger("new-status", this.input());
      this.input("");
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
