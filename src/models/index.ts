import City from "./City.js";
import Country from "./Country.js";
import Resource from "./Resource.js";
import Tag from "./Tag.js";

Country.hasMany(City);
City.belongsTo(Country);

City.hasMany(Resource);
Resource.belongsTo(City);

City.hasMany(Tag);
Tag.belongsTo(City);

export default {
  City,
  Country,
  Resource,
  Tag,
};
