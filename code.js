// Husk å legg høyt oppe, siden andre bruker `BEKK.View`!
// Vi legger delt view-funksjonalitet i et eget lag i arkiteturen
BEKK.View = Backbone.View.extend({
  renderTemplate: function(data) {
    this.el.html(Mustache.to_html(this.template, data || {}));
  }
});

// ----------

BEKK.NewStatusView = BEKK.View.extend({
  template: '<form id="new-status" action="#">' +
      '<label for="status_text">Status</label>' +
      '<textarea id="status_text" name="status" placeholder="Hva tenker du nå?"></textarea>' +
      '<button type="submit" class="btn">Post oppdatering</button>' +
    '</form>'
});

// ----------

BEKK.StatusesView = BEKK.View.extend({
  template: '<h2>Oppdateringer</h2>' +
    '<ul>' +
      '{{#monologs}}<li>{{.}}</li>{{/monologs}}' +
    '</ul>'
});
