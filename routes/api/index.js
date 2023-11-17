const router = require("express").Router();
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");

router.use("/", commentRoutes);
router.use("/", userRoutes);

module.exports = router;