const router = require("express").Router();

// const cartRoutes = require("./cart-routes");

const userRoutes = require("./user-routes");


// router.use("/cart", cartRoutes);

router.use("/user", userRoutes);


module.exports = router;