import { Effect, Reducer } from 'umi';

import { queryAttractionGetById } from '@/pages/attraction/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    attractionGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'AttractionView',

  state: {},

  effects: {
    *attractionGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryAttractionGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *attractionDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryAttractionDeleteById, payload.attractionId);
    //   yield put({ type: 'attractionSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
