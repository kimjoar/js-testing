jasmine.Matchers.prototype.toContainInDOM = function(text) {
	return this.actual.el.html().indexOf(text) !== -1;
};
