import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryClientDeleteById, queryClientGetStats, queryClientSearch } from '@/pages/client/queries';
import { IClient, IClientStats } from '@/pages/client/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  clientList?: IClient[];
  clientStats?: IClientStats;
  clientPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    clientSearch: Effect;
    clientGetStats: Effect;
    clientDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClientDashboard',

  state: {},

  effects: {
    *clientSearch({ payload }, { call, put }) {
      const data = yield call(queryClientSearch, payload);
      yield put({
        type: 'save',
        payload: {
          clientList: get(data, 'payload.items'),
          clientPager: get(data, 'payload.pager'),
        },
      });
    },

    *clientGetStats(_, { call, put }) {
      const data = yield call(queryClientGetStats);
      yield put({
        type: 'save',
        payload: { clientStats: data.payload },
      });
    },

    *clientDeleteById({ payload }, { call, put }) {
      yield call(queryClientDeleteById, payload.clientId);
      yield put({ type: 'clientSearch', payload: payload.queryParams });
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
