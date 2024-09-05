import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUploadImageAction,
  deleteUploadVideoAction,
  postUploadImageAction,
  postUploadVideoAction,
} from './upload.action';
import { UploadState } from './upload.type';

const initialState: UploadState = {
  load: false,
  error: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(postUploadImageAction.pending, (state: UploadState) => ({
      ...state,
      load: true,
    }));
    builder.addCase(postUploadImageAction.fulfilled, (state: UploadState) => ({
      ...state,
      load: false,
    }));
    builder.addCase(postUploadImageAction.rejected, (state: UploadState) => ({
      ...state,
      load: false,
    }));

    //
    builder.addCase(deleteUploadImageAction.pending, (state: UploadState) => ({
      ...state,
      load: true,
    }));
    builder.addCase(
      deleteUploadImageAction.fulfilled,
      (state: UploadState) => ({ ...state, load: false }),
    );
    builder.addCase(deleteUploadImageAction.rejected, (state: UploadState) => ({
      ...state,
      load: false,
    }));

    // Video
    builder.addCase(postUploadVideoAction.pending, (state: UploadState) => ({
      ...state,
      load: true,
    }));
    builder.addCase(postUploadVideoAction.fulfilled, (state: UploadState) => ({
      ...state,
      load: false,
    }));
    builder.addCase(postUploadVideoAction.rejected, (state: UploadState) => ({
      ...state,
      load: false,
    }));

    builder.addCase(deleteUploadVideoAction.pending, (state: UploadState) => ({
      ...state,
      load: true,
    }));
    builder.addCase(
      deleteUploadVideoAction.fulfilled,
      (state: UploadState) => ({ ...state, load: false }),
    );
    builder.addCase(deleteUploadVideoAction.rejected, (state: UploadState) => ({
      ...state,
      load: false,
    }));
  },
});

export default uploadSlice.reducer;
