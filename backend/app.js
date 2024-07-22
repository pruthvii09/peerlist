import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import postRoutes from "./routes/posts.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import workRoutes from "./routes/works.routes.js";
import educationRoutes from "./routes/education.routes.js";
//routes declarationx
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/posts", postRoutes);
app.use("/skills", skillsRoutes);
app.use("/works", workRoutes);
app.use("/education", educationRoutes);

export { app };
