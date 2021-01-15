// const fs = require("fs");
// const path = require("path");
require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// fs.readdir("uploads/comment", (err) => {
//   if (err) fs.mkdirSync("uploads/comment");
//   //uploads/comment 디렉토리를 read하는데, 없어서 에러나면 새로 생성
// });

// exports.upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/comment/"); // cb의 첫번째 인자는 err
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname); // 이미지 확장자 추출
//       const name = path.basename(file.originalname, ext); // 두 번째 인자로 확장자를 주면 확장자를 제거한 파일이름만 출력
//       cb(null, `${Date.now()}-${name}${ext}`); // cb의 첫번째 인자는 err
//     },
//   }),
// });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "missing-animals-comment-images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = file.originalname;
      cb(null, Date.now().toString() + ext);
    },
  }),
});

module.exports = { s3, upload };
