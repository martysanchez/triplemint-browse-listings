import { writable } from "svelte/store";
import propertyData from "../data/properties.json";

// Custom store that contains the sorted and filtered property list
function createPropertiesStore() {
  const { subscribe, set, update } = writable(propertyData);
  const sortByPriceDesc = (list) => list.sort((a, b) => b.price - a.price);
  const sortByPriceAsc = (list) => list.sort((a, b) => a.price - b.price);
  const minPrice = sortByPriceAsc(propertyData)[0].price;
  const maxPrice = sortByPriceDesc(propertyData)[0].price;

  return {
    subscribe,
    sortPriceDesc: () =>
      update((propertyList) => sortByPriceDesc(propertyList)),
    sortPriceAsc: () => update((propertyList) => sortByPriceAsc(propertyList)),
    filter: (filters, sort) => {
      update(() => {
        var tempPropertyList = propertyData.filter((property) => {
          return (
            (filters.bedrooms === null ||
              property.unit.bedrooms === filters.bedrooms) &&
            (filters.priceMin === "" || property.price >= filters.priceMin) &&
            (filters.priceMax === "" || property.price <= filters.priceMax)
          );
        });

        // Since filtering always occurs on the complete properties list,
        // sorting needs to be re-applied if selected
        if (sort === "desc") {
          sortByPriceDesc(tempPropertyList);
        } else if (sort === "asc") {
          sortByPriceAsc(tempPropertyList);
        }

        return tempPropertyList;
      });
    },
    clearFilters: () => {
      set(propertyData);
    },
    getMinPrice: () => minPrice,
    getMaxPrice: () => maxPrice,
  };
}

export const properties = createPropertiesStore();
