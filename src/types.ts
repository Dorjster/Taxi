// export interface Address {
//   ISO3166_2_lvl4: string;
//   building: string;
//   city: string;
//   city_district: string;
//   country: string;
//   country_code: string;
//   house_number: string;
//   postcode: string;
//   road: string;
//   suburb: string;
// }

// export interface BoundingBox {
//   north: string;
//   south: string;
//   east: string;
//   west: string;
// }

// export interface AddressMetadata {
//   address: Address;
//   boundingbox: BoundingBox;
//   display_name: string;
//   lat: string;
//   licence: string;
//   lon: string;
//   osm_id: number;
//   osm_type: string;
//   place_id: number;
// }

// export interface FullAddress extends AddressMetadata {}

export interface Address {
  display_name: string;
  go_name: string;
  status: string;
}

export interface Road {
  start: {
    lat: number;
    lon: number;
  };
  end: {
    lat: number;
    lon: number;
  };
  status: string;
}
