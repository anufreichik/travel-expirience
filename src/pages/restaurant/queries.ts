import { get, patch, post, del } from '@/utils/httpMethods';
import { IRestaurant, IRestaurantQueryParams } from '@/pages/restaurant/types';

export async function queryRestaurantCreate(payload: any): Promise<any> {
  return post({ url: '/restaurant', data: payload });
}

export async function queryRestaurantGetById(id: string): Promise<any> {
  return get({ url: `/restaurant/${id}` });
}

export async function queryRestaurantUpdateById(payload: { restaurantId: string; values: IRestaurant }): Promise<any> {
  return patch({ url: `/restaurant/${payload.restaurantId}`, data: payload.values });
}

export async function queryRestaurantDeleteById(restaurantId: string): Promise<any> {
  return del({ url: `/restaurant/${restaurantId}` });
}

export async function queryRestaurantSearch(payload: IRestaurantQueryParams): Promise<any> {
  return post({ url: '/restaurant/search', data: payload });
}

export async function queryRestaurantGetAll(): Promise<any> {
  return get({ url: '/restaurant' });
}

export async function queryRestaurantGetStats(): Promise<any> {
  return get({ url: `/restaurant/stats` });
}
