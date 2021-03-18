import { Effect, Reducer } from 'umi';

import { queryOrderGetById } from '@/pages/order/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    orderGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'OrderView',

  state: {},

  effects: {
    *orderGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryOrderGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *orderDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryOrderDeleteById, payload.orderId);
    //   yield put({ type: 'orderSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
