<script>
  import { properties } from "./stores/propertiesStore.js";
  import PropertyListing from "./PropertyListing.svelte";
  import ListingControls from "./ListingControls.svelte";
</script>

<main>
  <section class="image-container">
    <img
      class="logo"
      src="./images/triplemint.svg"
      width="140"
      alt="Triplemint"
    />
  </section>

  <section>
    <ListingControls />
  </section>

  <div class="grid-message">
    {#if $properties.length > 0}
      <p>
        {$properties.length}
        {$properties.length > 1 ? "properties" : "property"} found
      </p>
    {:else}
      <p>No results matched your search criteria.</p>
      <p>Try editing your search filters above.</p>
    {/if}
  </div>

  <div class="grid-listing">
    {#each $properties as property (property.id)}
      <PropertyListing propertyData={property} />
    {/each}
  </div>
</main>

<style>
  main {
    margin: 8px 0 20px;
    background-image: url("../images/light-pattern.png");
    background-repeat: repeat;
    background-position-y: 2%;
    height: 100vh;
  }

  section {
    padding: 10px;
    border-bottom: 1px solid var(--light-gray);
    background-color: #fff;
  }

  .grid-message {
    padding-top: 6px;
    text-align: center;
  }

  .grid-listing {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 10px;
    padding: 10px;
  }
</style>
