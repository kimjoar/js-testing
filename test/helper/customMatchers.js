jasmine.Matchers.prototype.toContainInDOM = function(text) {
  return this.actual.el.html().indexOf(text) !== -1;
};

jasmine.Matchers.prototype.toBeEmpty = function() {
  return this.actual.length === 0;
};
