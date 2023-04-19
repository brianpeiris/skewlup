import City from "./City";
import Country from "./Country";
import Resource from "./Resource";
import Tag from "./Tag";

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
