import { MetaPagination } from '@/config/constant';
import { AxiosResponse } from 'axios';

export type ItemHistoryActivity = {
  id: string;
  createdAt: string;
  updatedAt: string;
  actionType: string;
  image: string;
  message: string;
  content: string;
  byUserId: string;
};

export type GetListHistoryActivityResponse = AxiosResponse<{
  statusCode: number;
  data: ItemHistoryActivity[];
  meta: MetaPagination;
}>;

export type ItemMadeToMeasure = {
  id: string;
  title: string;
  content: string;
};

export type SettingAppState = {
  isFullScreenEditor: boolean;
  isCollapsedSidebarAdmin: boolean;
  listHistoryActivity: {
    data: ItemHistoryActivity[];
    meta: MetaPagination;
    load: boolean;
    error: string;
  };
  vietcombank: {
    load: boolean;
    data: number;
    error: string;
  };
  madeToMeasure: {
    load: boolean;
    data: ItemMadeToMeasure;
    error: string;
  };
};
