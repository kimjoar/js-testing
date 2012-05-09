jasmine.Matchers.prototype.toContainInTemplate = function(text) {
	return this.actual.el.html().indexOf(text) !== -1;
};