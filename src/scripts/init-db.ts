import sequelize from "../lib/db";
import models from "../models";

console.log(models);

if (process.argv[2] === "-f") {
  sequelize.sync({ force: true });
} else {
  sequelize.sync({ alter: { drop: false } });
}
