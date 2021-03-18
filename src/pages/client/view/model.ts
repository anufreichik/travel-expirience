import { Effect, Reducer } from 'umi';

import { queryClientGetById } from '@/pages/client/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    clientGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClientView',

  state: {},

  effects: {
    *clientGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryClientGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *clientDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryClientDeleteById, payload.clientId);
    //   yield put({ type: 'clientSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
