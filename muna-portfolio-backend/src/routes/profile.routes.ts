import { Router } from "express";
import { upload } from "../middleware/upload";
import { Profile } from "../models/Profile";

const router = Router();

/**
 * @openapi
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get latest profile
 *     responses:
 *       200:
 *         description: Profile returned successfully
 *       404:
 *         description: No profile found
 *       500:
 *         description: Failed to fetch profile
 */
router.get("/", async (_req, res) => {
  try {
    const profile = await Profile.findOne({ order: [["id", "DESC"]] });

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    return res.json(profile);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
});

/**
 * @openapi
 * /api/profile/upload-cv:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Upload a CV file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: CV uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: No file uploaded
 */
router.post("/upload-cv", upload.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res.status(201).json({
    message: "CV uploaded successfully",
    filename: req.file.filename,
    url: `http://localhost:4000/uploads/${req.file.filename}`,
  });
});

export default router;
