import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MetaPagination } from '@/config/constant';
import { ItemHistoryActivity, ItemMadeToMeasure, SettingAppState } from './setting-app.type';
import {
  getListHistoryActivityAction,
  getMadeToMeasureAction,
  getVietcombankExchangeRateAction,
} from './setting-app.action';

const settingAppSlice = createSlice({
  name: 'settingApp',
  initialState: {
    isFullScreenEditor: false,
    isCollapsedSidebarAdmin: false,
    listHistoryActivity: {
      data: [] as ItemHistoryActivity[],
      meta: {} as MetaPagination,
      load: false,
      error: '',
    },
    vietcombank: {
      load: false,
      data: 0,
      error: '',
    },
    madeToMeasure: {
      load: false,
      data: {} as ItemMadeToMeasure,
      error: '',
    },
  },
  reducers: {
    setIsFullScreenEditor: (state: SettingAppState, action: PayloadAction<boolean>) => ({
      ...state,
      isFullScreenEditor: action.payload,
    }),
    setIsCollapsedSidebarAdmin: (state: SettingAppState, action: PayloadAction<boolean>) => ({
      ...state,
      isCollapsedSidebarAdmin: action.payload,
    }),

    addHistoryActivity: (state: SettingAppState, action: PayloadAction<any>) => ({
      ...state,
      listHistoryActivity: {
        ...state.listHistoryActivity,
        data: [action.payload, ...state.listHistoryActivity.data],
      },
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(getListHistoryActivityAction.pending, (state: SettingAppState) => ({
      ...state,
      listHistoryActivity: {
        ...state.listHistoryActivity,
        load: true,
        error: '',
      },
    }));
    builder.addCase(
      getListHistoryActivityAction.fulfilled,
      (state: SettingAppState, action: PayloadAction<any>) => ({
        ...state,
        listHistoryActivity: {
          data: action.payload.data,
          meta: action.payload.meta,
          load: false,
          error: '',
        },
      })
    );
    builder.addCase(getListHistoryActivityAction.rejected, (state: SettingAppState) => ({
      ...state,
      listHistoryActivity: {
        data: [] as ItemHistoryActivity[],
        meta: {} as MetaPagination,
        load: false,
        error: '',
      },
    }));

    // -------------------------
    builder.addCase(getMadeToMeasureAction.pending, (state: SettingAppState) => ({
      ...state,
      madeToMeasure: {
        ...state.madeToMeasure,
        load: true,
        error: '',
      },
    }));
    builder.addCase(
      getMadeToMeasureAction.fulfilled,
      (state: SettingAppState, action: PayloadAction<any>) => ({
        ...state,
        madeToMeasure: {
          data: action.payload.data,
          load: false,
          error: '',
        },
      })
    );
    builder.addCase(getMadeToMeasureAction.rejected, (state: SettingAppState) => ({
      ...state,
      madeToMeasure: {
        data: {} as ItemMadeToMeasure,
        load: false,
        error: '',
      },
    }));

    // -------------------------
    builder.addCase(getVietcombankExchangeRateAction.pending, (state: SettingAppState) => ({
      ...state,
      vietcombank: {
        ...state.vietcombank,
        load: true,
        error: '',
      },
    }));
    builder.addCase(
      getVietcombankExchangeRateAction.fulfilled,
      (state: SettingAppState, action: PayloadAction<any>) => ({
          ...state,
          vietcombank: {
            data: action.payload.data,
            load: false,
            error: '',
          },
        })
    );
    builder.addCase(getVietcombankExchangeRateAction.rejected, (state: SettingAppState) => ({
      ...state,
      vietcombank: {
        data: 0,
        load: false,
        error: '',
      },
    }));
  },
});
export const { setIsFullScreenEditor, setIsCollapsedSidebarAdmin, addHistoryActivity } =
  settingAppSlice.actions;

export default settingAppSlice.reducer;
