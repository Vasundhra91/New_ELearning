var express = require('express');
var router = express.Router();

const LoginModel = require(__dirname + '../../models/login_model')
const SubmitModel = require(__dirname + '../../models/Submit_model')
const User = require(__dirname + '../../models/newfile')

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

router.post('/login', function (req, res) {
  const { Useremail, Userpassword } = req.body;
  var query = { Useremail: Useremail,Userpassword: Userpassword};
  LoginModel.findOne(query, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          res: 'Internal error please try again'
        });
        console.log("1")
    } else if (!user) {
      res.status(401)
        .json({
          res: 'Incorrect email or password'
        });
        console.log("2")
    }
     else {
      res.status(200)
        .json({ res: user.Fname + " " + user.LName })
        console.log(user.Fname + " " + user.LName)
    }
  })
})

router.post('/Admin', function (req, res) {

  SubmitModel.create(req.body).then(function (error,data) {
      if (error) { throw error }
      console.log(res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3)))
      res.status(200).send(JSON.stringify({ status : "Data Save Successfully" }, null, 3));

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


// router.get('/getNextId', function(req, res){
//     User.nextCount((err, count) => {                          
//         let user = new User();
//         user.save((err) => {
//             console.log(`The Id is ${count}`);
//             user.nextCount((err, count) => {
//                 console.log(`The next Id is ${count}`);
//             });
//         });
//         res.status(200).send(JSON.stringify({ id : count }, null, 3));
//     });
// });

module.exports = router;