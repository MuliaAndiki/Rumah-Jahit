import express from "express";
import CategoryController from "../controllers/CategoryController";
import { verifyAdminToken } from "../middleware/auth";

class CategoryRouter {
  public router = express.Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    // All routes are protected by verifyAdminToken
    this.router.get("/", verifyAdminToken, CategoryController.getAll);
    this.router.post("/", verifyAdminToken, CategoryController.create);
    this.router.put("/:id", verifyAdminToken, CategoryController.update);
    this.router.delete("/:id", verifyAdminToken, CategoryController.delete);
  }
}

export default new CategoryRouter().router;
