import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export default sequelize.define("Resource", {
  title: DataTypes.STRING,
  url: DataTypes.STRING,
  summary: DataTypes.TEXT,
  thumbnail: DataTypes.STRING,
});
