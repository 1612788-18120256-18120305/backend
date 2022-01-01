var express = require("express");
var router = express.Router();
const userController = require("../controllers/UserController");
const authenticate = require("../authenticate");
const adminMiddleWare = require('../middlewares/requireAdmin.mdw');

router.get("/student/:student", authenticate.verifyUser, userController.checkStudent);

router.post('/admins', 
  authenticate.verifyUser,
  adminMiddleWare.requiredAdmin, 
  userController.postCreateAdmin
);
router.get("/admins", authenticate.verifyUser, adminMiddleWare.requiredAdmin, userController.getAdmins);

router.put("/:id", authenticate.verifyUser, userController.update);
router.get("/:id", authenticate.verifyUser, userController.show);
router.get("/", authenticate.verifyUser, userController.index);



module.exports = router;
