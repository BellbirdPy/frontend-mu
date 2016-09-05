'use strict';

describe('Service: departamento', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var departamento;
  beforeEach(inject(function (_departamento_) {
    departamento = _departamento_;
  }));

  it('should do something', function () {
    expect(!!departamento).toBe(true);
  });

});
