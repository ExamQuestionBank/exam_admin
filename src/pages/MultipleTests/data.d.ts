export interface TableListItem {
  id?:number,
  section?: string,
  subject?: string,
  testYear?: string,
  testFrom?: string,
  question?: string,
  answerA?: string,
  answerB?: string,
  answerC?: string,
  answerD?: string,
  answer?: string,
  answerAnalysis?: string,
  checked?:number,
  testNo?:number,
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
