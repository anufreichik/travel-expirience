import { get, patch, post, del } from '@/utils/httpMethods';
import { IAttraction, IAttractionQueryParams } from '@/pages/attraction/types';

export async function queryAttractionCreate(payload: any): Promise<any> {
  return post({ url: '/attraction', data: payload });
}

export async function queryAttractionGetById(id: string): Promise<any> {
  return get({ url: `/attraction/${id}` });
}

export async function queryAttractionUpdateById(payload: { attractionId: string; values: IAttraction }): Promise<any> {
  return patch({ url: `/attraction/${payload.attractionId}`, data: payload.values });
}

export async function queryAttractionDeleteById(attractionId: string): Promise<any> {
  return del({ url: `/attraction/${attractionId}` });
}

export async function queryAttractionSearch(payload: IAttractionQueryParams): Promise<any> {
  return post({ url: '/attraction/search', data: payload });
}

export async function queryAttractionGetAll(): Promise<any> {
  return get({ url: '/attraction' });
}

export async function queryAttractionGetStats(): Promise<any> {
  return get({ url: `/attraction/stats` });
}
