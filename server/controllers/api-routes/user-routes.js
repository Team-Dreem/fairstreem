// const router = require('express').Router();
// const AWS = require('aws-sdk');
// const fs = require("fs")
// const {
//   User,
// } = require('../../models');
// const { withAuth }= require("../../utils/auth");
// const multer = require('multer')
// const upload = multer({
//   dest: 'uploads/'
// })

// const bucketRegion = 'us-east-2'

// router.post('/avatar', withAuth, upload.single('avatar'), (req, res) => {
//   const s3 = new AWS.S3();
//   var fileName = Math.random().toString().substr(2);
//   let bucketName = 'fairstreem'
//   var filePath = 'avatars/' + fileName;
//   var fileUrl = 'https://' +
//     bucketName + '.s3.' + bucketRegion + '.amazonaws.com/' + filePath;
//   let params = {
//     Key: filePath,
//     Body: fs.createReadStream(req.file.path),
//     ACL: 'public-read',
//     Bucket: bucketName
//   }
//   // use aws.s3.putObject(params).promise().then((resp)=>{console.log(resp)}) to upload the file
//   console.log("params", params);
//   s3.putObject(params).promise().then((resp) => {
//     console.log(resp)
//     // upload worked 
//     // add URL to avatar field on user model
//     // user.avatar = fileUrl
//     // user.save()
//     User.update({
//       avatar: fileUrl
//     }, {
//       where: {
//         id: req.session.user_id
//       }
//     }).then(() => {
//       res.status(200).json({
//         message: 'COOL!',
//         url: fileUrl
//       });
//     })

//   }).catch((err) => {
//     console.log(err)
//     res.status(500).json({
//       message: 'oops!',
//     });
//   })


// });

// module.exports = router;