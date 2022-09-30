export interface RegionInfo extends CommenList<Region> {

}

export interface QueryRegion {
  offset?: number;
  limit?: number;
  page?: number;
}

export interface Region {
  id: number;
  name: string;
  parent: number;
  sort: number;
  path: string;
  type: number;
  memo: string;
}

export interface CommenList<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
