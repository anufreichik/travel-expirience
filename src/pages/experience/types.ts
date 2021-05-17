export interface IExperience {
  _id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  accommodations: [];
  restaurants: [];
  attractions: [];
  activities: [];
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IExperienceStats {
  totalExperience: number;
  todayExperience: number;
  monthExperience: number;
  averageExperience: number;
}

export interface IExperienceQueryParams {
  limit?: number | string;
  page?: number | string;
  name?: string;
  country?: string;
  city?: string;
  state?: string;
}
