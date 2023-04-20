import sequelize from "../lib/db";
import models from "../models";

console.log(models);

(async () => {
  if (process.argv[2] === "-f") {
    await sequelize.sync({ force: true });
  } else {
    await sequelize.sync({ alter: { drop: false } });
  }
  process.exit();
})();
