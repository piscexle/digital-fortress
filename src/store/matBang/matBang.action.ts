import { createAsyncThunk } from '@reduxjs/toolkit';
import news from './matBang.api';
import { ParameterPost, ParameterPut } from './matBang.type';

const getAllMatBangAction = createAsyncThunk(
  'matBang/getNewsAction',
  async (_, thunkAPI) => {
    try {
      const res = await news.getAllMatBang();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.messageCode });
    }
  }
);

const getMatBangByIdAction = createAsyncThunk(
  'matBang/getMatBangByIdAction',
  async (id: string, thunkAPI) => {
    try {
      const res = await news.getMatBangById(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.messageCode });
    }
  }
);

const addAction = createAsyncThunk(
  'matBang/addAction',
  async (params: ParameterPost, thunkAPI) => {
    try {
      const res = await news.add(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const updateMatBangAction = createAsyncThunk(
  'matBang/updateMatBangAction',
  async (params: ParameterPut, thunkAPI) => {
    try {
      const res = await news.updateMatBang(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const deleteMatBangAction = createAsyncThunk(
  'matBang/deleteMatBangAction',
  async (id: string, thunkAPI) => {
    try {
      const res = await news.deleteMatBang(id);
      return {
        ...res,
        id,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.messageCode });
    }
  }
);

export {
  getAllMatBangAction,
  addAction,
  updateMatBangAction,
  getMatBangByIdAction,
  deleteMatBangAction
};
