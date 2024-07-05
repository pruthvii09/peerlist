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

//routes declarationx
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

export { app };
