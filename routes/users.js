var express = require('express');
var router = express.Router();
var multer = require('multer')
//var uuidv4 = require('uuid/v4')
const DIR = './public/';
var cors = require('cors')
router.use(cors());

const LoginModel = require(__dirname + '../../models/login_model')
const SubmitModel = require(__dirname + '../../models/Submit_model')
const UserTestResultModel = require(__dirname + '../../models/result_submitModel')
const User = require(__dirname + '../../models/newfile')
const UserCourse = require(__dirname + '../../models/AddcourseModel')
/* GET users listing. */
router.post('/id', function (req, res, next) {
  var query = {Ques_id: req.body.Ques_id };
  SubmitModel.find(query,function(error,datavalue){
    if (error) { throw error }
    res.json(datavalue);
  })
});

router.post('/', function (req, res) {
  var query = { Useremail: req.body.Useremail };
  LoginModel.findOne(query, function (error, datavalue) {
    if (error) { throw error }
    if (datavalue === null) {
      LoginModel.create(req.body).then(function (data) {
        { 
          res.send(JSON.stringify({ id :req.body.Fname +req.body.LName }, null, 3)); }
          console.log(req.body.Fname +req.body.LName)
      })
    } else {
      console.log("Already Exit")
      // res.json({ returndata: "Already Exit....." })
       res.send(JSON.stringify({ id : "Already Exit....." }));

    }
  })
});

router.post('/userinfo_byid', function (req, res) {
  var query = { _id: req.body.User_id };
  result_submitModel.find(query,function(error,data){
    if (error) { throw error }
    if (data === null) {
  LoginModel.find(query,function(error,datavalue){
    if (error) { throw error }
    console.log(datavalue)
    res.json(datavalue);
  })
}else
{}
})
})
router.post('/login', function (req, res) {
  const { Useremail, Userpassword } = req.body;
  var query = { Useremail: Useremail,Userpassword: Userpassword};
  LoginModel.findOne(query, function (err, user) {
    if (err) {
      console.error(err);
      // res.status(500)
      //   .json({
      //     res: 'Internal error please try again'
      //   });
        console.log("1")
    } else if (!user) {
      // res.status(401)
      //   .json({
      //     res: 'Incorrect email or password'
      //   });
        console.log("2")
    }
     else {
       res.json(user);
     // res.send(JSON.stringify(user.Fname + " " + user.LName+"-"+user._id+"-"+user.UserAdmin))
    }
  })
})

router.post('/Admin', function (req, res) {
  console.log(req.body)
  SubmitModel.create(req.body).then(function (error,data) {
      if (error) { throw error }
      console.log(res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3)))
      res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3));

  })
});
router.post('/UserTestResult', function (req, res) {
console.log(req.body)

  UserTestResultModel.create(req.body).then(function (error,data) {
    try{
      console.log(res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3)))
      res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3));
  }
  catch (error) { 
    // your catch block code goes here
   }
  })
});

router.get('/AdminTestPaper', function (req, res) {
  SubmitModel.aggregate([{$sort : { _id : 1 }},{$group: {_id: "$Ques_id"}}
  ]).exec(function(error, fetchAllTopUsers){
    if (error) { throw error }
    console.log(fetchAllTopUsers)
    res.json(fetchAllTopUsers);
  });
});


router.delete('/deletetest_paper/:id', (req, res) => {
  console.log(req.params.id)
  SubmitModel.deleteMany({Ques_id: { $in:req.params.id}}, (err, data) => {
    if (err) res.status(404).json({ err: err });
    SubmitModel.aggregate([{$sort : { _id : 1 }},{$group: {_id: "$Ques_id"}}
  ]).exec(function(error, fetchAllTopUsers){
    if (error) { throw error }
    res.json(fetchAllTopUsers);
  });
      });
});

router.post('/addcourse', function (req, res) {
  console.log(req.body)
  UserCourse.create(req.body).then(function (error,data) {
    try{
      UserCourse.find({},function(error,datavalue){
        if (error) { throw error }
        console.log(datavalue)
        res.json(datavalue);
      })
      // console.log(res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3)))
      // res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3));
    }catch{
      res.status(500).send(JSON.stringify({ status : "Server Error" }, null, 3));
    }
  })
    });

    router.get('/coursedetails',function(req,res){
      UserCourse.find({},function(error,datavalue){
        if (error) { throw error }
        res.json(datavalue);
      })
    })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, Date.now() + '-' +file.originalname )
  }
});

var upload = multer({ storage})

const Uploadfilemodel = require(__dirname + '../../models/uploadfile_model')

router.post('/upload', upload.single('file'), (req, res, next) => {
  
  console.log("url1111111111111111111111111111" + JSON.stringify(req.file.filename))
  const url = req.protocol + '://' + req.get('host')
  
  const user = new Uploadfilemodel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      profile: url + '/public/' + req.file.filename
  });
  console.log(user)
  user.save().then(result => {
      res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
              _id: result._id,
              profile: result.profile
          }
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  })

});

module.exports = router;