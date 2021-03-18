import { Effect, history, Reducer } from 'umi';

import { queryOrderCreate, queryOrderGetById, queryOrderUpdateById } from '@/pages/order/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface OrderModelType {
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

const OrderModel: OrderModelType = {
  namespace: 'OrderForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryOrderCreate, payload);
      yield put({ type: 'OrderDashboard/orderSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/order');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { orderInfo: {} } });
      const data = yield call(queryOrderGetById, payload);
      yield put({ type: 'save', payload: { orderInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryOrderUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'OrderDashboard/orderSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default OrderModel;
