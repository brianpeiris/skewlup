import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
export default new Sequelize(
  `postgres://postgres:${process.env.DB_PASSWORD}@postgres:5432/skewlup`
);
