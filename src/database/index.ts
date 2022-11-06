import { DataSource } from "typeorm";
import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite", //database_ignite | localhost
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: true,
  logging: false,
  entities: [Category, Specification, User],
  subscribers: [],
  migrations: ["./src/database/migrations/1667698222725-AlterUserDeleteUsername.ts"],
})