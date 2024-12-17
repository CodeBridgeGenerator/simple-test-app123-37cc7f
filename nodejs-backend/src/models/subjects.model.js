
    module.exports = function (app) {
        const modelName = 'subjects';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            subjectId: { type: Number, required: false, min: 0, max: 10000000 },
subjectName: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
teacherId: { type: Number, required: false, min: 0, max: 10000000 },
credits: { type: Number, required: false, min: 0, max: 10000000 },

            
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