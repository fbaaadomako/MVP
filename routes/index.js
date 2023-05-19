var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET list of medications */
router.get("/", function (req, res, next) {
  db("SELECT * FROM medications;")
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

// POST a new medication to the list
router.post("/", function (req, res, next) {
  let name = req.body.name;
  let dose = req.body.dose;
  let reason = req.body.reason;
  let frequency = req.body.frequency;
  let doctor = req.body.doctor;
  db(
    `INSERT INTO medications (name, dose, reason, frequency, doctor) VALUES ('${name}','${dose}','${reason}','${frequency}','${doctor}');`
  ).then((result) => {
    //using .then return the list of medications from GET
    db("SELECT * FROM medications;")
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => res.status(500).send(err));
  });
});

router.delete("/:id", function (req, res) {
  console.log(req.params.id);
  db(`DELETE FROM medications WHERE id = ${req.params.id};`).then((result) => {
    db("SELECT * FROM medications;")
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => res.status(500).send(err));
  });
});

module.exports = router;
