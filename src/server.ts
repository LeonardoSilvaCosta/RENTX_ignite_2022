import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { AppDataSource } from './database';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import "./shared/container"
import { router } from './routes';
import { AppError } from "./errors/AppError";

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

    app.use(router);

    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message
        })
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
      })
    })

    return app.listen(3333, () => console.log("Server is running!"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

