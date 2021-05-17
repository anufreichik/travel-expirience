import { Effect, history, Reducer } from 'umi';

import { queryRestaurantCreate, queryRestaurantGetById, queryRestaurantUpdateById } from '@/pages/restaurant/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface RestaurantModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const RestaurantModel: RestaurantModelType = {
  namespace: 'RestaurantForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryRestaurantCreate, payload);
      yield put({ type: 'RestaurantDashboard/restaurantSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/restaurant');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { restaurantInfo: {} } });
      const data = yield call(queryRestaurantGetById, payload);
      yield put({ type: 'save', payload: { restaurantInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryRestaurantUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'RestaurantDashboard/restaurantSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default RestaurantModel;
