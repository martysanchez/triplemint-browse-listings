<script>
  import { properties } from "./stores/propertiesStore.js";
  import { debounce } from "./utils";

  const bedroomFilters = [
    { label: "Studio", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ];

  const defaultFilters = {
    bedrooms: null,
    priceMin: "",
    priceMax: "",
  };

  let currentSort = null;
  let currentFilter = { ...defaultFilters };
  $: filterApplied =
    currentFilter.bedrooms !== null ||
    currentFilter.priceMin !== "" ||
    currentFilter.priceMax !== "";

  function handleSortPriceDesc() {
    currentSort = "desc";
    properties.sortPriceDesc();
  }

  function handleSortPriceAsc() {
    currentSort = "asc";
    properties.sortPriceAsc();
  }

  function handleFilterByBedroom(value) {
    // filterApplied = true;
    currentFilter.bedrooms = value;
    properties.filter(currentFilter, currentSort);
  }

  // Debounce the inputs on the price min and price max inputs
  // so that updates will only be processed after the provided delay
  let applyPriceMinChange = debounce((value) => {
    // filterApplied = true;
    currentFilter.priceMin = value;
    properties.filter(currentFilter, currentSort);
  }, 1000);

  function handlePriceMinChange(event) {
    applyPriceMinChange(event.target.value);
  }

  let applyPriceMaxChange = debounce((value) => {
    // filterApplied = true;
    currentFilter.priceMax = value;
    properties.filter(currentFilter, currentSort);
  }, 1000);

  function handlePriceMaxChange(event) {
    applyPriceMaxChange(event.target.value);
  }

  function handleClearFilters() {
    // filterApplied = false;
    currentFilter = { ...defaultFilters };
    properties.clearFilters();
  }
</script>

<div class="grid-controls">
  <!-- Begin: Filter -->
  <div class="filter-container">
    <h4>
      Filter
      {#if filterApplied}<span
          class="clear-filters"
          on:click={handleClearFilters}>clear</span
        >{/if}
    </h4>
    <div class="price-filter-container">
      <div>
        <h5><label for="minPrice">Min Price</label></h5>
        <input
          id="minPrice"
          type="text"
          placeholder="ex. $500,000"
          on:input={handlePriceMinChange}
          bind:value={currentFilter.priceMin}
        />
      </div>
      <div>
        <h5><label for="maxPrice">Max Price</label></h5>
        <input
          id="maxPrice"
          type="text"
          placeholder="ex. $1,000,000"
          on:input={handlePriceMaxChange}
          bind:value={currentFilter.priceMax}
        />
      </div>
    </div>
    <h5>Bedrooms</h5>
    {#each bedroomFilters as filter (filter.value)}
      <button
        class:selected={currentFilter.bedrooms === filter.value}
        on:click={() => handleFilterByBedroom(filter.value)}
        >{filter.label}</button
      >
    {/each}
  </div>
  <!-- End: Filter -->

  <!-- Begin: Sort -->
  <div>
    <h4>Sort</h4>
    <h5>Price</h5>
    <button
      class:selected={currentSort === "desc"}
      on:click={handleSortPriceDesc}>$ High to Low</button
    ><button
      class:selected={currentSort === "asc"}
      on:click={handleSortPriceAsc}>$ Low to High</button
    >
  </div>
  <!-- End: Sort -->
</div>

<style>
  .grid-controls {
    display: block;
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
    .grid-controls {
      display: flex;
    }
  }

  .clear-filters {
    font-size: 16px;
    font-weight: normal;
    color: var(--medium-gray);
    cursor: pointer;
    display: inline-block;
    margin-left: 2px;
    vertical-align: middle;
  }

  .clear-filters:hover {
    color: var(--red);
  }

  .filter-container {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--light-gray);
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    .filter-container {
      padding-right: 10px;
      padding-bottom: 0;
      border-right: 1px solid var(--light-gray);
      border-bottom: 0;
      margin-right: 20px;
      margin-bottom: 0;
    }
  }

  .price-filter-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12px;
  }

  input[type="text"] {
    margin-right: 10px;
  }
</style>
