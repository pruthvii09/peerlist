import prisma from "../prisma/prisma.js";

export const addJob = async (req, res) => {
  try {
    const {
      company,
      description,
      experience,
      location,
      skills,
      title,
      type,
      application_link,
    } = req.body;
    const userId = req.user.id;
    if (!title || !company) {
      return res.status(400).json({
        status: "error",
        error: "All fields are required.",
      });
    }
    const newJob = await prisma.job.create({
      data: {
        company: company,
        userId: userId,
        application_link: application_link,
        description: description,
        experience: experience,
        location: location,
        skills: skills,
        title: title,
        type: type,
      },
    });
    res.status(201).json({
      status: "success",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        title: true,
        application_link: true,
        skills: true,
        company: true,
        createdAt: true,
        experience: true,
        type: true,
        description: true,
      },
    });
    if (!jobs) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
