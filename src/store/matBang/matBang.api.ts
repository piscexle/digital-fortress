
import { instanceAxios } from '@/config/axios';
import omit from 'lodash/omit';
import { removeNullOrEmptyValues } from '@/utils/removeNullOrEmptyValues';
import { GetMatBangResponse, ParameterPost, ParameterPut, GetDetailNewsResponse } from './matBang.type';

const matBang = {
  getAllMatBang(): Promise<GetMatBangResponse> {
    const url = `/getAll`;
    return instanceAxios.get(url);
  },

  add(params: ParameterPost): Promise<GetMatBangResponse> {
    const url = `/add`;
    return instanceAxios.post(url, params);
  },

  getMatBangById(id: string): Promise<GetDetailNewsResponse> {
    const url = `/getById/${id}`;
    return instanceAxios.get(url);
  },

  updateMatBang(params: ParameterPut): Promise<GetDetailNewsResponse> {
    const url = `/update/${params.id}`;
    return instanceAxios.put(url, removeNullOrEmptyValues(omit(params, 'id')));
  },

  deleteMatBang(id: string): Promise<any> {
    const url = `/delete/${id}`;
    return instanceAxios.delete(url);
  },
};

export default matBang;
