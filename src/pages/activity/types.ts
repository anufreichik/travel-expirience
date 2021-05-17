export interface IActivity {
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

export interface IActivityStats {
  totalActivity: number;
  todayActivity: number;
  monthActivity: number;
  averageActivity: number;
}

export interface IActivityQueryParams {
  limit?: number | string;
  page?: number | string;
  name?: string;
  description?: string;
}
