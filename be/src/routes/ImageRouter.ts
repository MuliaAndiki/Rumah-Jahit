import express from "express";
import ImageController from "../controllers/ImageController";
import { verifyAdminToken } from "../middleware/auth";

class ImageRouter {
  public router = express.Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    // All routes are protected by verifyAdminToken
    // Specific static & prefix paths first
    this.router.patch("/reorder", verifyAdminToken, ImageController.reorderImages);
    this.router.get("/catalog/:itemId", verifyAdminToken, ImageController.getImagesByCatalog);
    this.router.post("/catalog/:itemId", verifyAdminToken, ImageController.addImages);

    // General collection creation
    this.router.post("/", verifyAdminToken, ImageController.createImage);

    // Parameterized paths /:imageId
    this.router.get("/:imageId", verifyAdminToken, ImageController.getImageById);
    this.router.put("/:imageId", verifyAdminToken, ImageController.updateImage);
    this.router.patch("/:imageId", verifyAdminToken, ImageController.updateImage);
    this.router.patch("/:imageId/set-primary", verifyAdminToken, ImageController.setPrimaryImage);
    this.router.delete("/:imageId", verifyAdminToken, ImageController.deleteImage);
  }
}

export default new ImageRouter().router;
