var config = require('./config.json');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Task = require('./model/task');

var app = express();
var router =express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect(`mongodb://${config.user}:${config.pass}@${config.db_address}`);

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

// get & create tasks
router.route('/tasks')
  .get(function(req, res) {
    Task.find(function(err, tasks) {
      if(err)
        res.send(err);
      res.json(tasks);
    });
  })
  .post(function(req, res) {
    var task = new Task();
    task.taskName = req.body.taskName;
    task.done = req.body.done;

    task.save(function(err) {
      if(err) {
        res.send(err);
        console.log(err)
      }
      res.json({ message: 'task added' });
    });
  });

// edit and delete tasks
router.route('/tasks/:task_id')
  .put(function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
      if(err)
        res.send(err);
      (req.body.taskName) ? task.taskName = req.body.taskName : null;
      (req.body.done) ? task.done = req.body.done : null;
      task.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: "task updooted" });
      });
    });
  })
  .delete(function(req, res) {
    Task.remove({ _id: req.params.task_id }, function(err, comment) {
      if(err)
        res.send(err);
      res.json({ message: "task deleted" });
    });
  });

app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});