var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  taskName: String
});

module.exports = mongoose.model('Tasks', TaskSchema);