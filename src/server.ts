import "reflect-metadata";
import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import "./shared/container"
import { AppDataSource } from './database';
import { router } from './routes';


AppDataSource.initialize()
.then(() => {
    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

    app.use(router);

    return app.listen(3333, () => console.log("Server is running!"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

