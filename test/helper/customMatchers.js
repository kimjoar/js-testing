beforeEach(function() {
  this.addMatchers({
    toContainInDOM: function(text) {
      var dom = this.actual.el.html();
      this.message = "Expected to find '" + text + "' in '" + dom + "'";
      return dom.indexOf(text) !== -1;
    }
  });
});
