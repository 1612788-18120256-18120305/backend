var express = require("express");
var router = express.Router();
const authController = require("../controllers/AuthController");
const authenticate = require("../authenticate");
const adminMiddleWare = require('../middlewares/requireAdmin.mdw');

router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);
router.get(
  "/google/token",
  authenticate.verifyGoogle,
  authController.socialLogin
);
router.get(
  "/facebook/token",
  authenticate.verifyFacebook,
  authController.socialLogin
);

router.post('/admin/login', authController.postAdminLogin);
router.post('/admin/create', 
  authenticate.verifyUser,
  adminMiddleWare.requiredAdmin, 
  authController.postCreateAdmin
);

module.exports = router;
