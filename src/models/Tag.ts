import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

export default sequelize.define("Tag", {
  tag: { type: DataTypes.STRING, allowNull: false, unique: true },
  count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});
