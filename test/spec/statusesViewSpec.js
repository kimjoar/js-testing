describe("the statuses view", function() {
  it("should update view when a monolog is added", function() {
    var monologs = new BEKK.Monologs();
    var view = new BEKK.StatusesView({ el: $("<div></div>"), monologs: monologs });
    view.render();
    expect(view.DOM("li").length).toEqual(0);
    monologs.add("test");
    expect(view.DOM("li").length).toEqual(1);
  });
});
