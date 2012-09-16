describe("Monologs", function() {
  beforeEach(function() {
    this.monologs = new BEKK.Monologs();
  });

  describe("add", function() {
    it("appends an item", function() {
      this.monologs.add("test1");
      this.monologs.add("test2");
      expect(this.monologs.attr("monologs")).toEqual(["test1", "test2"]);
    });

    it("adds a monolog on 'new-status' event", function() {
      Simple.events.trigger("new-status", "test");
      expect(this.monologs.attr("monologs")).toEqual(["test"]);
    });

    it("triggers 'event' when monolog added", function() {
      var spy = sinon.spy();
      this.monologs.on("add", spy);
      this.monologs.add("test");
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("count", function() {
    it("returns 0 for number of monologs when no monologs added", function() {
      expect(this.monologs.count()).toEqual(0);
    });

    it("returns 1 for number of monologs when one monolog added", function() {
      this.monologs.add("test");
      expect(this.monologs.count()).toEqual(1);
    });
  });
});
