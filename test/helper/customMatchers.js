beforeEach(function() {
  this.addMatchers({
    toContainInEl: function(expected) {
      var html = this.actual.el.html();
      this.message = "Expected to find '" + expected + "' in '" + html + "'";
      return html.indexOf(expected) !== -1;
    }
  });
});
