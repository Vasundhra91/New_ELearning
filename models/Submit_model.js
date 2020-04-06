var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
mongoose.set('useFindAndModify', false);
autoIncrement.initialize(mongoose.connection);
var modelschema = new Schema({
    MCQ_option: {
        type: JSON
    },
    MCQ_ques: {
        type: String
    },
    MCQ_Answer: {
        type: String
    },Ques_id:{
        type:Number
    }
    ,_id:{
        type:String
    }
})
modelschema.plugin(autoIncrement.plugin, {
    model: 'MCQ_Test',
    field: '_id',
    startAt: 100,
    incrementBy: 1
});
//modelschema.plugin(autoIncrement.mongoosePlugin);
module.exports = Login = mongoose.model('MCQ_Test', modelschema);