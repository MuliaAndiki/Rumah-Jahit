import express from "express";
import AuthController from "../controllers/AuthController";
import { verifyAdminToken } from "../middleware/auth";

class AuthRouter {
  public router = express.Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post("/login", AuthController.login);
    this.router.post("/register", AuthController.register);
    this.router.post("/refresh", AuthController.refresh);
    this.router.get("/me", verifyAdminToken, AuthController.me);
    this.router.put("/profile", verifyAdminToken, AuthController.updateProfile);
  }
}

export default new AuthRouter().router;
