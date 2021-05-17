import { Effect, Reducer } from 'umi';

import { queryRestaurantGetById } from '@/pages/restaurant/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    restaurantGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'RestaurantView',

  state: {},

  effects: {
    *restaurantGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryRestaurantGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *restaurantDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryRestaurantDeleteById, payload.restaurantId);
    //   yield put({ type: 'restaurantSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
