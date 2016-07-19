'use strict';

describe('Filter: limittohtml', function () {

  // load the filter's module
  beforeEach(module('frontendmuApp'));

  // initialize a new instance of the filter before each test
  var limittohtml;
  beforeEach(inject(function ($filter) {
    limittohtml = $filter('limittohtml');
  }));

  it('should return the input prefixed with "limittohtml filter:"', function () {
    var text = 'angularjs';
    expect(limittohtml(text)).toBe('limittohtml filter: ' + text);
  });

});
