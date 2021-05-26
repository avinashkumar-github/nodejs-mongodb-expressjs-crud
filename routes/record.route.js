module.exports = (app) => {
  const records = require("./../controller/record.controller");
  const router = require("express").Router();

  router.post("/", records.create);

  router.get("/", records.findAll);

  router.get("/published", records.findAllPublished);

  router.get("/:id", records.findOne);

  router.put("/:id", records.update);

  router.delete("/:id", records.delete);

  router.delete("/", records.deleteAll);

  app.use("/api/records", router);
};
