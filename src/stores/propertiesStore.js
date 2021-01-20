import { writable } from "svelte/store";
import propertyData from "../data/properties.json";

// Custom store that contains the sorted and filtered property list
function createPropertiesStore() {
  const { subscribe, set, update } = writable(propertyData);

  return {
    subscribe,
    sortPriceDesc: () => {
      update((propertyList) => propertyList.sort((a, b) => b.price - a.price));
    },
    sortPriceAsc: () => {
      update((propertyList) => propertyList.sort((a, b) => a.price - b.price));
    },
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

        // Since filtering above always occurs on the complete properties list,
        // sorting needs to be re-applied if applicable
        if (sort === "desc") {
          tempPropertyList.sort((a, b) => b.price - a.price);
        } else if (sort === "asc") {
          tempPropertyList.sort((a, b) => a.price - b.price);
        }

        return tempPropertyList;
      });
    },
    clearFilters: () => {
      set(propertyData);
    },
  };
}

export const properties = createPropertiesStore();
