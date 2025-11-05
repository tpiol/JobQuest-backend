const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        lastContacted: {
            type: Date,
        },
        linkedin: {
            type: String,
        },
    }
)

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        companyWebsite: {
            type: String,
            required: true,
        },
        companyLinkedin: {
            type: String,
            required: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },
        dateApplied: {
            type: Date,
            required: true,
        },
        referral: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['interested', 'applied', 'rejected', 'pending', 'interviewing', 'ghosted']
        },
        contacts: [contactSchema],

        notes: {
            type: String,
            required: true,
        },
    }
)

const Job = mongoose.model("Job", jobSchema)
modules.exports = Job;