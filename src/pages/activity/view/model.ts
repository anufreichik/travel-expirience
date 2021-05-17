import { Effect, Reducer } from 'umi';

import { queryActivityGetById } from '@/pages/activity/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    activityGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ActivityView',

  state: {},

  effects: {
    *activityGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryActivityGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *activityDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryActivityDeleteById, payload.activityId);
    //   yield put({ type: 'activitySearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
