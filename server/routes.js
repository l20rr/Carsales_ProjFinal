module.exports = app => {
  const tutorials = require("./controllers/index");
  const user = require("./controllers/User.controller")

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);
  router.post("/adduser",user.createUser)

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);
  router.get("/users",user.getUsers)

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);
  router.get("/user/:id",user.findOne)

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);
  router.delete("/user/:id",user.delete)

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);
  

/*
  router.post("/login",user.login)
  router.get('/usuarios/checktoken',user.checkToken);
  router.get('/usuarios/destroytoken',user.destroyToken);
*/
  app.use('/api/tutorials', router);
};