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
  distance: number;
}
