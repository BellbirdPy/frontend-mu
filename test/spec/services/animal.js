'use strict';

describe('Service: Animal', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Animal;
  beforeEach(inject(function (_Animal_) {
    Animal = _Animal_;
  }));

  it('should do something', function () {
    expect(!!Animal).toBe(true);
  });

});
