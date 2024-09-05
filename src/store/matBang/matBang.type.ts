import { MetaPagination } from '@/config/constant';
import { AxiosResponse } from 'axios';

export type ItemMatBang = {
  id: string;
  maMatBang: string;
  name: string;
  address: string;
  matBangType: string;
  description: string;
  dateStart: string;
  dienTich: string;
  price: string;
}

export type GetMatBangResponse = AxiosResponse<{
  statusCode: number;
  data: ItemMatBang[];
  meta: MetaPagination;
}>

export type GetDetailNewsResponse = AxiosResponse<{
  data: ItemMatBang;
}>;

export interface ParameterPost {
  maMatBang: string;
  name: string;
  address: string;
  matBangType: string;
  description: string;
  dienTich: string;
  price: string;
}

export interface ParameterPut extends Omit<ParameterPost, 'id'> {
  id: string;
}

export type MatBangStateReducer = {
  getAllMatBang: {
    data: ItemMatBang[];
    load: boolean;
    error: string;
  };

  getMatBangById: {
    data: ItemMatBang;
    load: boolean;
    error: string;
  };
};