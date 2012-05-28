jasmine.Matchers.prototype.toContainInDOM = function(text) {
  return this.actual.el.html().indexOf(text) !== -1;
};

//Her er det en feil/bug
jasmine.Matchers.prototype.toContainInSelector = function(selector, text) {
  return this.actual.DOM(selector).text().indexOf(text) !== -1;
};

jasmine.Matchers.prototype.toBeEmpty = function() {
  return this.actual.length === 0;
};
