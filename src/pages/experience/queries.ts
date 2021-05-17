import { get, patch, post, del } from '@/utils/httpMethods';
import { IExperience, IExperienceQueryParams } from '@/pages/experience/types';

export async function queryExperienceCreate(payload: any): Promise<any> {
  return post({ url: '/experience', data: payload });
}

export async function queryExperienceGetById(id: string): Promise<any> {
  return get({ url: `/experience/${id}` });
}

export async function queryExperienceUpdateById(payload: { experienceId: string; values: IExperience }): Promise<any> {
  return patch({ url: `/experience/${payload.experienceId}`, data: payload.values });
}

export async function queryExperienceDeleteById(experienceId: string): Promise<any> {
  return del({ url: `/experience/${experienceId}` });
}

export async function queryExperienceSearch(payload: IExperienceQueryParams): Promise<any> {
  return post({ url: '/experience/search', data: payload });
}

export async function queryExperienceGetAll(): Promise<any> {
  return get({ url: '/experience' });
}

export async function queryExperienceGetStats(): Promise<any> {
  return get({ url: `/experience/stats` });
}
