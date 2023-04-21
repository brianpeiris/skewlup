import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

export default sequelize.define("Resource", {
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.TEXT, allowNull: false },
  thumbnail: { type: DataTypes.STRING, allowNull: true },
  tags: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
});
