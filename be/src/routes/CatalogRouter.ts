import express from "express";
import CatalogController from "../controllers/CatalogController";
import ImageController from "../controllers/ImageController";
import { verifyAdminToken } from "../middleware/auth";

class CatalogRouter {
  public router = express.Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    // Public GET routes for catalog items and details (accessible by public slug or ID)
    this.router.get("/", CatalogController.getAll);
    this.router.get("/:id", CatalogController.getById);
    this.router.get("/:itemId/images", ImageController.getImagesByCatalog);

    // Protected routes requiring verifyAdminToken
    this.router.post("/", verifyAdminToken, CatalogController.create);
    this.router.put("/:id", verifyAdminToken, CatalogController.update);
    this.router.delete("/:id", verifyAdminToken, CatalogController.delete);
    this.router.post("/:itemId/images", verifyAdminToken, ImageController.addImages);
  }
}

export default new CatalogRouter().router;
