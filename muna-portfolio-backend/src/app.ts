import express from "express";
import path from "path";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { authRouter } from "./routes/auth.routes";
import { projectRouter } from "./routes/project.routes";
import { cvRouter } from "./routes/cvRoutes";
import profileRouter from "./routes/profile.routes";

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/cv", cvRouter);
app.use("/api/profile", profileRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));

export { app };
