const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Job = require("../models/job.js");
const router = express.Router();

// POST ROUTES
router.post("/", verifyToken, async (req, res) => {
	try {
		req.body.seeker = req.user._id;
		const job = await Job.create(req.body);
		job._doc.seeker = req.user;
		res.status(201).json(job);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

//Get Routes
router.get("/", verifyToken, async (req, res) => {
	try {
		const jobs = await Job.find({}).sort({ dateApplied: "desc" });
		res.status(200).json(jobs);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

router.get("/:jobId", verifyToken, async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);
		res.status(200).json(job);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// PUT Routes
router.put("/:jobId", verifyToken, async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);

		if (!job.seeker.equals(req.user._id)) {
			return res.status(403).send("That's not your job!!");
		}

		const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
			new: true,
		});

		res.status(200).json(updatedJob);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = router;
