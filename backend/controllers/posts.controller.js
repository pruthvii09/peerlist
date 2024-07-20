import prisma from "../prisma/prisma.js";

export const createPost = async (req, res) => {
  try {
    console.log("Hello");
    const { content } = req.body;
    const userId = req.user.id; // Assuming the auth middleware adds user info to req
    console.log(req.body);
    const newPost = await prisma.post.create({
      data: {
        content,
        userId,
      },
    });

    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while creating the post. Please try again later.",
    });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            profileImageUrl: true,
          },
        },
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPosts = posts.map((post) => ({
      ...post,
      user: {
        firstname: post.user.firstname,
        lastname: post.user.lastname,
        username: post.user.username,
        profileImageUrl: post.user.profileImageUrl,
      },
    }));

    res.status(200).json({
      status: "success",
      data: formattedPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the posts. Please try again later.",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        status: "error",
        error: "Post not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the post. Please try again later.",
    });
  }
};
export const getPostsByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    // Find the user by username
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "User not found.",
      });
    }

    // Fetch posts associated with the user
    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the posts. Please try again later.",
    });
  }
};
