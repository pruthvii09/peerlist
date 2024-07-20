import prisma from "../prisma/prisma.js";

export const addWork = async (req, res) => {
  try {
    const { title, company_name, start_date, end_date, skills, description } =
      req.body;
    console.log(req.body);
    const userId = req.user.id;
    if (!title || !company_name || !start_date) {
      return res.status(400).json({
        status: "error",
        error: "All fields are required.",
      });
    }
    const newWork = await prisma.work.create({
      data: {
        title: title,
        company_name: company_name,
        userId: userId,
        start_date: start_date,
        end_date: end_date,
        skills: skills,
        description: description,
      },
    });
    res.status(201).json({
      status: "success",
      data: newWork,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const getUserWorkExperienceByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch user work experience by username
    const userWorkExperience = await prisma.user.findUnique({
      where: { username },
      select: {
        work: {
          select: {
            id: true,
            title: true,
            company_name: true,
            start_date: true,
            end_date: true,
            skills: true,
            description: true,
          },
          orderBy: {
            start_date: "desc",
          },
        },
      },
    });

    if (!userWorkExperience) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: userWorkExperience.work,
    });
  } catch (error) {
    console.error("Error fetching user work experience by username:", error);
    res.status(500).json({
      status: "error",
      message:
        "An error occurred while fetching the user work experience. Please try again later.",
    });
  }
};
