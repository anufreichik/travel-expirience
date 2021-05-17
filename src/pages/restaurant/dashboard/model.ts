import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryRestaurantDeleteById, queryRestaurantGetStats, queryRestaurantSearch } from '@/pages/restaurant/queries';
import { IRestaurant, IRestaurantStats } from '@/pages/restaurant/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  restaurantList?: IRestaurant[];
  restaurantStats?: IRestaurantStats;
  restaurantPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    restaurantSearch: Effect;
    restaurantGetStats: Effect;
    restaurantDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'RestaurantDashboard',

  state: {},

  effects: {
    *restaurantSearch({ payload }, { call, put }) {
      const data = yield call(queryRestaurantSearch, payload);
      yield put({
        type: 'save',
        payload: {
          restaurantList: get(data, 'payload.items'),
          restaurantPager: get(data, 'payload.pager'),
        },
      });
    },

    *restaurantGetStats(_, { call, put }) {
      const data = yield call(queryRestaurantGetStats);
      yield put({
        type: 'save',
        payload: { restaurantStats: data.payload },
      });
    },

    *restaurantDeleteById({ payload }, { call, put }) {
      yield call(queryRestaurantDeleteById, payload.restaurantId);
      yield put({ type: 'restaurantSearch', payload: payload.queryParams });
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
