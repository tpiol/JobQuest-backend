const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Job = require("../models/job.js");
const router = express.Router();

// POST ROUTES
router.post("/", verifyToken, async (req, res) => {
try {
    req.body.author = req.user._id;
    const job = await Job.create(req.body);
    job._doc.author = req.user;
    res.status(201).json(job);
} catch (err) {
    res.status(500).json({ err: err.message });
}
});

//Get
router.get("/", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({})
      .sort({ dateApplied: "desc" });
    res.status(200).json(jobs)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
})

router.get("/:jobId", verifyToken, async (req, res) => {
    try {
    const job = await Job.findById(req.params.jobId)
    res.status(200).json(job);
    } catch (err) {
    res.status(500).json({err: err.message })
    }
})
module.exports = router;