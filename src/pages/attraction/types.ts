export interface IAttraction {
  _id: string;
  name: string;
  description: string;
  owner: {
    name: string;
    _id: string;
  };
}

export interface IAttractionStats {
  totalAttraction: number;
  todayAttraction: number;
  monthAttraction: number;
  averageAttraction: number;
}

export interface IAttractionQueryParams {
  limit?: number | string;
  page?: number | string;
  attractionSearchParam1?: string;
  attractionSearchParam2?: string;
}
