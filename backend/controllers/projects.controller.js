import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProject = async (req, res) => {
  try {
    const { title, tagline, description, projectLink, opensource } = req.body;
    const userId = req.user.id; // Assuming you have user ID from the authentication middleware
    // Validate the required fields
    if (!title || !tagline) {
      return res.status(400).json({
        status: "error",
        error: "Title and tagline are required fields.",
      });
    }
    console.log(req.body);
    // Create the project in the database
    const newProject = await prisma.project.create({
      data: {
        userId: userId,
        title: title,
        tagline: tagline,
        description: description || null,
        projectLink: projectLink || null,
        opensource: opensource,
      },
    });

    // Return success response
    res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while adding the project. Please try again later.",
    });
  }
};
export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID from authentication middleware

    // Fetch the projects for the user
    const projects = await prisma.project.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    // Return success response with projects
    res.status(200).json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the projects. Please try again later.",
    });
  }
};
