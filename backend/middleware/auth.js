import { verifyToken } from "../helpers/jwtHelper.js";
import prisma from "../prisma/prisma.js";
export const auth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded?._id,
      },
    });
    if (!user) {
      res.status(401, "Invalid access Token");
    }
    req.user = user;
    console.log("user", user);
    next();
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal Error" });
  }
};
