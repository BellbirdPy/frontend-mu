'use strict';

describe('Service: ServerData', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var ServerData;
  beforeEach(inject(function (_ServerData_) {
    ServerData = _ServerData_;
  }));

  it('should do something', function () {
    expect(!!ServerData).toBe(true);
  });

});
