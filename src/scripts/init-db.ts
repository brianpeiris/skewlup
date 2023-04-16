import sequelize from "../lib/db";
import models from "../models";

console.log(models);
sequelize.sync({ force: true });
