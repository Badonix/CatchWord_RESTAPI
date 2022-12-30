const router = require("express").Router();
const Scores = require("../models/Scores");
router.get("/top", async (req, res) => {
  try {
    Scores.find({})
      .sort({ Score: -1 })
      .limit(10)
      .exec((err, topScores) => {
        if (err) {
          res.send("ragac verari kargad");
        } else {
          res.json(topScores);
        }
      });
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let result = await Scores.findById(req.params.id);
    res.json(result.Score);
  } catch (e) {
    console.log(e);
  }
});
router.post("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    Scores.findByIdAndUpdate(
      id,
      { $set: { Score: req.body.score } },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.json(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});
router.post("/", async (req, res) => {
  try {
    const newScore = new Scores({
      Author: req.body.author,
      Score: req.body.score,
    });

    const Score = await newScore.save();
    res.json(Score);
  } catch (err) {
    console.log(err.code);
    res.status(400).json(err.code);
  }
});

module.exports = router;
