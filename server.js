var express = require('express'),
  app = express(),
  port = process.env.PORT || 80,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');
//var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ads');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:'16mb'}));

app.use(express.static('static'));
//app.use(cors());
app.set('view engine', 'pug')

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log(req.body.filename);
    cb(null, file.originalname);
 //    cb(null, req.body.filename);
//   cb(null, 'foo');
}
})
 
var upload = multer({ storage: storage })

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.get('/image/',function(req,res){
  res.sendFile(__dirname + '/uploads/' + req.body.pic);
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/payment/type/:type/subject/:subject',function(req,res){
   res.render('index', { title: req.body.type, message: 'Hello there!' + req.body.type })
//  res.sendFile(__dirname + '/payment.html');
});

app.post('/upload/photo', upload.single('myImage'), (req, res, next) => {
  const file = req.file
  const body = req.body

//  console.log("body:" + body);
//  console.log("file:" + file);
console.log(req.body.subject);


//  if (!req.body.subject) {
//    res.status(500).send('Please enter a subject for the ad!');

 
  if (!file) {
    res.status(500).send('Please attach a file!')
  //  const error = new Error('Please upload a file')
  // error.httpStatusCode = 400
  //  return next(error)
  }
  
  new_task = new Task(req.body);
  new_task.originalname = req.file.originalname;
  new_task.filename = req.body.filename;
  new_task.mimetype = req.file.mimetype;
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
   });

   res.send(JSON.stringify(req.body));
   //next();
})

app.use(function(req, res) {
  res.status(404).send(req.originalUrl + ' not found')
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
