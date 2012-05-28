describe("the statuses view", function() {

  it("should show all monologs", function() {
    var monologs = new BEKK.Monologs();
    monologs.attr("monologs", ["Status 1", "Status 2"]);

    var view = new BEKK.StatusesView({ el: $("<div></div>"), monologs: monologs });
    view.render();
    
    expect(view.DOM("li").length).toEqual(2);
    expect(view).toContainInSelector("li", "Status 1");
    expect(view).toContainInSelector("li", "Status 2");
  });

  it("should update view when a monolog is added", function() {
    var monologs = new BEKK.Monologs();
    var view = new BEKK.StatusesView({ el: $("<div></div>"), monologs: monologs });
    view.render();
    expect(view.DOM("li").length).toEqual(0);
    monologs.add("test");
    expect(view.DOM("li").length).toEqual(1);
    expect(view).toContainInSelector("li", "test");
  });
});
