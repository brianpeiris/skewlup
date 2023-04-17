import Country from "./Country";
import Resource from "./Resource";
import Tag from "./Tag";

Country.hasMany(Resource);
Resource.belongsTo(Country);

Country.hasMany(Tag);
Tag.belongsTo(Country);

export default {
  Country,
  Resource,
  Tag,
};
