import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MetaPagination } from '@/config/constant';
import { addAction, getMatBangByIdAction, getAllMatBangAction, deleteMatBangAction } from './matBang.action';
import { ItemMatBang, MatBangStateReducer } from './matBang.type';

const initialState: MatBangStateReducer = {
  getAllMatBang: {
    data: [] as ItemMatBang[],
    load: false,
    error: '',
  },

  getMatBangById: {
    data: {} as ItemMatBang,
    load: false,
    error: '',
  },
};

const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllMatBangAction.pending, (state: MatBangStateReducer) => ({
      ...state,
      getAllMatBang: {
        ...state.getAllMatBang,
        load: true,
        error: '',
      },
    }));
    builder.addCase(
      getAllMatBangAction.fulfilled,
      (state: MatBangStateReducer, action: PayloadAction<any>) => ({
        ...state,
        getAllMatBang: {
          data: action.payload.data,
          load: false,
          error: '',
        },
      })
    );
    builder.addCase(getAllMatBangAction.rejected, (state: MatBangStateReducer) => ({
      ...state,
      getAllMatBang: {
        data: [] as ItemMatBang[],
        load: false,
        error: '',
      },
    }));

    // ------------------
    builder.addCase(addAction.pending, (state: MatBangStateReducer) => ({
      ...state,
      getAllMatBang: {
        ...state.getAllMatBang,
        load: false,
        error: '',
      },
    }));
    builder.addCase(
      addAction.fulfilled,
      (state: MatBangStateReducer, action: PayloadAction<any>) => ({
        ...state,
        getAllMatBang: {
          data: [action.payload.data, ...state.getAllMatBang.data],
          meta: {},
          load: false,
          error: '',
        },
      })
    );
    builder.addCase(addAction.rejected, (state: MatBangStateReducer) => ({
      ...state,
      getAllMatBang: {
        data: state.getAllMatBang.data,
        meta: {} as MetaPagination,
        load: false,
        error: '',
      },
    }));

    // ------------------
    builder.addCase(getMatBangByIdAction.pending, (state: MatBangStateReducer) => ({
      ...state,
      getMatBangById: {
        ...state.getMatBangById,
        load: true,
        error: '',
      },
    }));
    builder.addCase(
      getMatBangByIdAction.fulfilled,
      (state: MatBangStateReducer, action: PayloadAction<any>) => ({
        ...state,
        getMatBangById: {
          data: action.payload.data,
          load: false,
          error: '',
        },
      })
    );
    builder.addCase(getMatBangByIdAction.rejected, (state: MatBangStateReducer) => ({
      ...state,
      getMatBangById: {
        ...state.getMatBangById,
        load: false,
        error: '',
      },
    }));

    // ------------------
    builder.addCase(deleteMatBangAction.pending, (state: MatBangStateReducer) => ({
      ...state,
      getAllMatBang: {
        ...state.getAllMatBang,
        load: false,
        error: '',
      },
    }));
    builder.addCase(
      deleteMatBangAction.fulfilled,
      (state: MatBangStateReducer, action: PayloadAction<any>) => ({
        ...state,
        getAllMatBang: {
          ...state.getAllMatBang,
          data: state.getAllMatBang.data.filter((item) => item.id !== action.payload.id),
          load: false,
          error: '',
        },
      })
    );
    builder.addCase(deleteMatBangAction.rejected, (state: MatBangStateReducer) => ({
      ...state,
      getAllMatBang: {
        data: [] as ItemMatBang[],
        meta: {} as MetaPagination,
        load: false,
        error: '',
      },
    }));

  },
});

export default newsSlice.reducer;
