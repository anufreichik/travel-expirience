import { get, patch, post, del } from '@/utils/httpMethods';
import { IOrder, IOrderQueryParams } from '@/pages/order/types';

export async function queryOrderCreate(payload: any): Promise<any> {
  return post({ url: '/order', data: payload });
}

export async function queryOrderGetById(id: string): Promise<any> {
  return get({ url: `/order/${id}` });
}

export async function queryOrderUpdateById(payload: { orderId: string; values: IOrder }): Promise<any> {
  return patch({ url: `/order/${payload.orderId}`, data: payload.values });
}

export async function queryOrderDeleteById(orderId: string): Promise<any> {
  return del({ url: `/order/${orderId}` });
}

export async function queryOrderSearch(payload: IOrderQueryParams): Promise<any> {
  return post({ url: '/order/search', data: payload });
}

export async function queryOrderGetAll(): Promise<any> {
  return get({ url: '/order' });
}

export async function queryOrderGetStats(): Promise<any> {
  return get({ url: `/order/stats` });
}
