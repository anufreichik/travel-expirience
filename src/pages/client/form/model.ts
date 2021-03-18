import { Effect, history, Reducer } from 'umi';

import { queryClientCreate, queryClientGetById, queryClientUpdateById } from '@/pages/client/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ClientModelType {
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

const ClientModel: ClientModelType = {
  namespace: 'ClientForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryClientCreate, payload);
      yield put({ type: 'ClientDashboard/clientSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/client');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { clientInfo: {} } });
      const data = yield call(queryClientGetById, payload);
      yield put({ type: 'save', payload: { clientInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryClientUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ClientDashboard/clientSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ClientModel;
