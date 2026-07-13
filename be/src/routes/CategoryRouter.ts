import express from "express";
import CategoryController from "../controllers/CategoryController";
import { verifyAdminToken } from "../middleware/auth";

class CategoryRouter {
  public router = express.Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    // Public GET endpoint for category listing
    this.router.get("/", CategoryController.getAll);

    // Protected endpoints requiring verifyAdminToken
    this.router.post("/", verifyAdminToken, CategoryController.create);
    this.router.put("/:id", verifyAdminToken, CategoryController.update);
    this.router.delete("/:id", verifyAdminToken, CategoryController.delete);
  }
}

export default new CategoryRouter().router;
