var config = require('./config.json');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Task = require('./model/task');

var app = express();
var router =express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect(`mongodb://${config.user}:${config.pass}@ds117868.mlab.com:17868/personal-todo`);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: "ready to do, cap'n" });
});

router.route('/tasks')
  .get(function(req, res) {
    Task.find(function(err, tasks) {
      if(err)
        res.send(err);
      res.json(tasks);
    });
  })
  .post(function(req, res) {
    var task = new TaskSchema();
    task.taskName = req.body.taskName;

    task.save(function(err) {
      if(err)
      res.send(err);
      res.json({ message: 'task added' });
    });
  });

app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});