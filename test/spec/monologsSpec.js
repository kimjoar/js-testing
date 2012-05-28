describe("Monologs", function() {
  describe("add", function() {
    it("appends an item", function() {
      var monologs = new BEKK.Monologs();
      monologs.add("test1");
      monologs.add("test2");
      expect(monologs.attr("monologs")).toEqual(["test1", "test2"]);
    });

    it("adds a monolog on 'new-status' event", function() {
      var monologs = new BEKK.Monologs();
      Simple.events.trigger("new-status", "test");
      expect(monologs.attr("monologs")).toEqual(["test"]);
    });

    it("triggers 'event' when monolog added", function() {
      var monologs = new BEKK.Monologs();
      var spy = sinon.spy();
      monologs.on("add", spy);
      monologs.add("test");
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("count", function() {
    it("returns 0 for number of monologs when no monologs added", function() {
      var monologs = new BEKK.Monologs();
      expect(monologs.count()).toEqual(0);
    });

    it("returns 1 for number of monologs when one monolog added", function() {
      var monologs = new BEKK.Monologs();
      monologs.add("test");
      expect(monologs.count()).toEqual(1);
    });
  });
});
