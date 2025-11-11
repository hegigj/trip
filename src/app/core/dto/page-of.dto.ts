export interface PageOf<ITEM> {
  items: ITEM[];
  total: number;
  page: number;
  limit: number;
}
