const fs = require("fs");
const path = require("path");
const multer = require("multer");

fs.readdir("uploads", (err) => {
  if (err) fs.mkdirSync("uploads"); //uploads 디렉토리를 read하는데, 없어서 에러나면 새로 생성
});

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // cb의 첫번째 인자는 err
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // 이미지 확장자 추출
      const name = path.basename(file.originalname, ext); // 두 번째 인자로 확장자를 주면 확장자를 제거한 파일이름만 출력
      cb(null, `${Date.now()}-${name}${ext}`); // cb의 첫번째 인자는 err
      // cb(null, `${Date.now()}-${file.originalname}`); // 이 코드와 동일
    },
  }),
});
