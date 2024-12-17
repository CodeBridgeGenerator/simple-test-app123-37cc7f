
    module.exports = function (app) {
        const modelName = 'teachers';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            teacherId: { type: Number, required: false, min: 0, max: 10000000 },
name: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
department: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
yearsOfExperience: { type: Number, required: false, min: 0, max: 10000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };