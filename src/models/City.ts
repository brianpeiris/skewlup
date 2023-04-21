import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

export default sequelize.define("City", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});
