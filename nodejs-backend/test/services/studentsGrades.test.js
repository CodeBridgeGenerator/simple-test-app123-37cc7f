const assert = require('assert');
const app = require('../../src/app');

describe('\'studentsGrades\' service', () => {
  it('registered the service', () => {
    const service = app.service('studentsGrades');

    assert.ok(service, 'Registered the service (studentsGrades)');
  });
});
