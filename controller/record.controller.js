const db = require("./../model");
const Record = db.records;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Invalid data to save!!" });
    return;
  }

  const records = new Record({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  records
    .save(records)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating record !! "
      });
    });
};

exports.findAll = (req, res) => {
  Record.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error fetch the records!!"
      });
    });
};

exports.findOne = (req, res) => {
  //   res.send(req.params.id);

  // if (!req.params.id) {
  //   res.json({
  //     message: "No such record found with id " + req.params.id
  //   });
  //   return;
  // }

  Record.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error fetch the record" });
    });
};

exports.update = (req, res) => {
  const record = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Record.findByIdAndUpdate(req.params.id, { $set: record }, { new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error update the record" });
    });
};

exports.delete = (req, res) => {
  Record.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error in delete the record"
      });
    });
};

exports.deleteAll = (req, res) => {
  Record.deleteMany({})
    .then((data) =>
      res.send({
        message: `Record deleted : total ${data.deletedCount}`
      })
    )
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error delete all records"
      });
    });
};

exports.findAllPublished = (req, res) => {
  Record.find({
    published: true
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error fetch the record" });
    });
};
