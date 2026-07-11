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
    // Put /reorder before /:imageId so Express routes it correctly
    this.router.patch("/reorder", verifyAdminToken, ImageController.reorderImages);
    this.router.patch("/:imageId/set-primary", verifyAdminToken, ImageController.setPrimaryImage);
    this.router.delete("/:imageId", verifyAdminToken, ImageController.deleteImage);

    // Support POST /api/admin/images/catalog/:itemId in addition to /api/admin/catalog/:itemId/images
    this.router.post("/catalog/:itemId", verifyAdminToken, ImageController.addImages);
  }
}

export default new ImageRouter().router;
