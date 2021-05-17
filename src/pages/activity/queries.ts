import { get, patch, post, del } from '@/utils/httpMethods';
import { IActivity, IActivityQueryParams } from '@/pages/activity/types';

export async function queryActivityCreate(payload: any): Promise<any> {
  return post({ url: '/activity', data: payload });
}

export async function queryActivityGetById(id: string): Promise<any> {
  return get({ url: `/activity/${id}` });
}

export async function queryActivityUpdateById(payload: { activityId: string; values: IActivity }): Promise<any> {
  return patch({ url: `/activity/${payload.activityId}`, data: payload.values });
}

export async function queryActivityDeleteById(activityId: string): Promise<any> {
  return del({ url: `/activity/${activityId}` });
}

export async function queryActivitySearch(payload: IActivityQueryParams): Promise<any> {
  return post({ url: '/activity/search', data: payload });
}

export async function queryActivityGetAll(): Promise<any> {
  return get({ url: '/activity' });
}

export async function queryActivityGetStats(): Promise<any> {
  return get({ url: `/activity/stats` });
}
