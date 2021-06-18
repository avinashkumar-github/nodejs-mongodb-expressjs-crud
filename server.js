const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./model/index");

const app = express();

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.log(
      "Cannot connect to the database",
      JSON.stringify(err, undefined, 2)
    );
    process.exit();
  });

let corsConfig = {
  origin: "http://localhost:4200"
};

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRUD app!!!" });
});

require("./routes/record.route")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
