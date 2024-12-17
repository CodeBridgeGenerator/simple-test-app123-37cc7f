const assert = require('assert');
const app = require('../../src/app');

describe('\'classes\' service', () => {
  it('registered the service', () => {
    const service = app.service('classes');

    assert.ok(service, 'Registered the service (classes)');
  });
});
