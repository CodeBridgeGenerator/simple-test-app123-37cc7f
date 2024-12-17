const { Students } = require('./students.class');
const createModel = require('../../models/students.model');
const hooks = require('./students.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/students', new Students(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('students');

  // Get the schema of the collections 
  app.get("/studentsSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};