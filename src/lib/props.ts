import _ from "lodash";

export function omitDates(items: any) {
  return items.map((r: any) => _.omit(r.toJSON(), ["createdAt", "updatedAt"]));
}
