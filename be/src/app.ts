import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import authRouter from "./routes/AuthRouter";
import categoryRouter from "./routes/CategoryRouter";
import catalogRouter from "./routes/CatalogRouter";
import imageRouter from "./routes/ImageRouter";
import swaggerSpec from "./swagger";
import { sendError } from "./lib/response";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  private routes(): void {
    // API Routes
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/admin/categories", categoryRouter);
    this.app.use("/api/admin/catalog", catalogRouter);
    this.app.use("/api/admin/images", imageRouter);

    // Swagger Documentation
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Health / Root Route
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        success: true,
        message: "Rumah Jahit Bespoke Tailoring Admin API is running!",
        timestamp: new Date().toISOString(),
      });
    });

    // Handle 404
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
      });
    });
  }

  private errorHandling(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error("Unhandled Error:", err);
      sendError(res, err, err.status || 500);
    });
  }
}

export default new App().app;
