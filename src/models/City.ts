import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export default sequelize.define("City", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});
