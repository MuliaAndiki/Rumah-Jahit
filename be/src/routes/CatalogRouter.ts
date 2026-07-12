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
    // All routes are protected by verifyAdminToken
    this.router.get("/", verifyAdminToken, CatalogController.getAll);
    this.router.get("/:id", verifyAdminToken, CatalogController.getById);
    this.router.post("/", verifyAdminToken, CatalogController.create);
    this.router.put("/:id", verifyAdminToken, CatalogController.update);
    this.router.delete("/:id", verifyAdminToken, CatalogController.delete);

    // GET /api/admin/catalog/:itemId/images -> Get all images for an existing catalog item
    this.router.get("/:itemId/images", verifyAdminToken, ImageController.getImagesByCatalog);
    // POST /api/admin/catalog/:itemId/images -> Add one or more new images to an existing catalog item
    this.router.post("/:itemId/images", verifyAdminToken, ImageController.addImages);
  }
}

export default new CatalogRouter().router;
