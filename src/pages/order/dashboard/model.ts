import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryOrderDeleteById, queryOrderGetStats, queryOrderSearch } from '@/pages/order/queries';
import { IOrder, IOrderStats } from '@/pages/order/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  orderList?: IOrder[];
  orderStats?: IOrderStats;
  orderPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    orderSearch: Effect;
    orderGetStats: Effect;
    orderDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'OrderDashboard',

  state: {},

  effects: {
    *orderSearch({ payload }, { call, put }) {
      const data = yield call(queryOrderSearch, payload);
      yield put({
        type: 'save',
        payload: {
          orderList: get(data, 'payload.items'),
          orderPager: get(data, 'payload.pager'),
        },
      });
    },

    *orderGetStats(_, { call, put }) {
      const data = yield call(queryOrderGetStats);
      yield put({
        type: 'save',
        payload: { orderStats: data.payload },
      });
    },

    *orderDeleteById({ payload }, { call, put }) {
      yield call(queryOrderDeleteById, payload.orderId);
      yield put({ type: 'orderSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
