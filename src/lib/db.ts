import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const { DB_HOST, DB_PASSWORD, DB_NAME } = process.env;

export default new Sequelize(
  `postgres://postgres:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`
);
