const expres=require('express');
const {getAllBanner,createBanner,deleteBanner} = require('../controllers/bannerController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

const router=expres.Router();

router.route("/banners").get(getAllBanner);
router.route("/admin/banner/new").post(isAuthenticatedUser,authorizeRoles("admin"),createBanner);
router.route("/admin/banner/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteBanner)

module.exports=router;
