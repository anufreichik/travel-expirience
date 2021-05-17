import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryAttractionDeleteById, queryAttractionGetStats, queryAttractionSearch } from '@/pages/attraction/queries';
import { IAttraction, IAttractionStats } from '@/pages/attraction/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  attractionList?: IAttraction[];
  attractionStats?: IAttractionStats;
  attractionPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    attractionSearch: Effect;
    attractionGetStats: Effect;
    attractionDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'AttractionDashboard',

  state: {},

  effects: {
    *attractionSearch({ payload }, { call, put }) {
      const data = yield call(queryAttractionSearch, payload);
      yield put({
        type: 'save',
        payload: {
          attractionList: get(data, 'payload.items'),
          attractionPager: get(data, 'payload.pager'),
        },
      });
    },

    *attractionGetStats(_, { call, put }) {
      const data = yield call(queryAttractionGetStats);
      yield put({
        type: 'save',
        payload: { attractionStats: data.payload },
      });
    },

    *attractionDeleteById({ payload }, { call, put }) {
      yield call(queryAttractionDeleteById, payload.attractionId);
      yield put({ type: 'attractionSearch', payload: payload.queryParams });
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
