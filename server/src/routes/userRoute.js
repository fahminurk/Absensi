const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader, upload } = require("../middlewares/multer");

//register
router.post("/", userController.register); //register
router.get("/companies", userController.getCompanies); // get companies di register

//login
router.post("/v1", userController.login); // login menggunakan JWT
router.post("/v2", userController.loginV2); //login menggunakan nanoid

//get token saat login
router.get("/token", userController.getByToken); // token menggunakan JWT

router.get("/v3", userController.getByTokenV2, userController.getUserByToken);
//mendapatkan user dari token di path. apakah token exp ? kalau tidak kirim user

// mengganti password
router.patch("/v4", userController.getByTokenV2, userController.changePassword);

//mengirim token ke email user
router.get("/generate-token/email", userController.generateTokenByEmail);

//
router.post(
  "/image/v1/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.uploadAvatar
);

router.post(
  "image/v2/:id",
  upload.single("avatar"),
  userController.uploadAvatarV2
);

router.get("image/render/:id", userController.renderAvatar);

module.exports = router;
