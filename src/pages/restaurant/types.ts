export interface IRestaurant {
  _id: string;
  name: string;
  description: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IRestaurantStats {
  totalRestaurant: number;
  todayRestaurant: number;
  monthRestaurant: number;
  averageRestaurant: number;
}

export interface IRestaurantQueryParams {
  limit?: number | string;
  page?: number | string;
  restaurantSearchParam1?: string;
  restaurantSearchParam2?: string;
}
