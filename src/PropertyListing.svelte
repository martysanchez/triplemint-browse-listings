<script>
  export let propertyData;

  // Destructure the properties we'll be using for easier access
  const {
    display_address,
    price,
    unit,
    unit: { building, bedrooms, bathrooms },
  } = propertyData;

  const imgURL = `https://dyn-images.triplemint.com/production/images/unit/${unit.id}/x486/${unit.dyn_images[0].key}/${unit.dyn_images[0].extension}}`;
</script>

<div class="property-listing">
  <img src={imgURL} alt={display_address} width="728" height="486" />
  <div class="property-details">
    <p class="address">{display_address}</p>
    <p class="region">{building.region.text}</p>
    <p class="price">{`$${price.toLocaleString("en")}`}</p>
    <p class="type">{`${bedrooms} BD, ${bathrooms} BA, ${building.type}`}</p>
  </div>
</div>

<style>
  .property-listing {
    color: var(--dark-gray);
    text-transform: uppercase;
    border: 1px solid var(--medium-gray);
    background-color: #fff;
  }

  img {
    width: 100%;
    height: auto;
  }

  .property-details {
    padding: 10px;
  }

  .property-details > p {
    margin: 2px 0;
  }

  .address {
    font-size: 20px;
  }

  .price {
    font-size: 16px;
  }

  .region,
  .type {
    color: var(--medium-gray);
    font-size: 14px;
  }
</style>
