'use strict';

describe('Service: AnimalList', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var AnimalList;
  beforeEach(inject(function (_AnimalList_) {
    AnimalList = _AnimalList_;
  }));

  it('should do something', function () {
    expect(!!AnimalList).toBe(true);
  });

});
