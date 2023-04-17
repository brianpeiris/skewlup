import models from "../models";

const name = process.argv[2];
console.log(name);

models.Country.create({ name });
