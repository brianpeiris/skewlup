import sequelize from "../lib/db.js";
import models from "../models/index.js";

console.log(models);

(async () => {
  if (process.argv[2] === "-f") {
    await sequelize.sync({ force: true });
  } else {
    await sequelize.sync({ alter: { drop: false } });
  }
  process.exit();
})();
