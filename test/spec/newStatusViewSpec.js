describe("The new status view", function() {
  beforeEach(function() {
    this.view = new BEKK.NewStatusView({ el: $("<div></div>") });
  });

  it("should clear input when submitted", function() {
    this.view.render();
    this.view.input("test");
    this.view.DOM("form").submit();

    expect(this.view.input()).toEqual("");
  });

  it("should trigger 'new-status' with input value when submitted", function() {
    var spy = sinon.spy();
    Simple.events.on("new-status", spy);

    this.view.render();
    this.view.input("test");
    this.view.DOM("form").submit();

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith("test");

    Simple.events.off("new-status", spy);
  });
});
