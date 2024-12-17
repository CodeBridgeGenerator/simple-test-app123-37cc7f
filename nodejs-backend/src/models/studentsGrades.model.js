
    module.exports = function (app) {
        const modelName = 'students_grades';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            studentId: { type: Number, required: false, min: 0, max: 10000000 },
name: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
grade: { type: Number, required: false, min: 0, max: 10000000 },
mathGrade: { type:  String , minLength: 1, maxLength: 1000, index: true, trim: true },
scienceGrade: { type:  String , minLength: 1, maxLength: 1000, index: true, trim: true },
englishGrade: { type:  String , minLength: 1, maxLength: 1000, index: true, trim: true },

            
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