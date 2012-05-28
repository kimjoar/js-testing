describe("Monologs", function() {
  describe("add", function() {
    it("appends one item", function() {
      var monologs = new BEKK.Monologs();
      expect(monologs.attr("monologs")).toBeEmpty();
    });
  });
});
