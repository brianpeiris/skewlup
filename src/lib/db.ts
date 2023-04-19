import { Sequelize } from "sequelize";
export default new Sequelize(
  "postgres://postgres:password@postgres:5432/skewlup"
);
