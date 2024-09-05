import upload from '@/store/upload/upload.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ParamDeleteUploadImage,
  ParamPostUploadImage,
  ParamPostUploadImages,
  ParamPostUploadVideo,
} from './upload.type';

const postUploadImageAction = createAsyncThunk(
  'upload/postUploadImageAction',
  async (params: ParamPostUploadImage, thunkAPI) => {
    try {
      const res = await upload.postUploadImage(params).then((response) => {
        if (response) {
          return response;
        }
        return {};
      });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postUploadImagesAction = createAsyncThunk(
  'upload/postUploadImagesAction',
  async (params: ParamPostUploadImages, thunkAPI) => {
    try {
      const res = await upload.postUploadImages(params).then((response) => {
        if (response) {
          return response;
        }
        return {};
      });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const deleteUploadImageAction = createAsyncThunk(
  'upload/deleteUploadImageAction',
  async (params: ParamDeleteUploadImage, thunkAPI) => {
    try {
      const res = await upload.deleteUploadImage(params).then((response) => response);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postUploadVideoAction = createAsyncThunk(
  'upload/postUploadVideoAction',
  async (params: ParamPostUploadVideo, thunkAPI) => {
    try {
      const res = await upload.postUploadVideo(params).then((response) => {
        if (response) {
          return response;
        }
        return {};
      });
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const deleteUploadVideoAction = createAsyncThunk(
  'upload/deleteUploadVideoAction',
  async (params: ParamDeleteUploadImage, thunkAPI) => {
    try {
      const res = await upload.deleteUploadVideo(params).then((response) => response);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postUploadFileAction = createAsyncThunk(
  'upload/postUploadFileAction',
  async (params: ParamPostUploadVideo, thunkAPI) => {
    try {
      const res = await upload.postUploadFile(params).then((response) => response);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export {
  postUploadImageAction,
  postUploadImagesAction,
  deleteUploadImageAction,
  postUploadVideoAction,
  deleteUploadVideoAction,
  postUploadFileAction,
};
