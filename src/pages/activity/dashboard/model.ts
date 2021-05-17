import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryActivityDeleteById, queryActivityGetStats, queryActivitySearch } from '@/pages/activity/queries';
import { IActivity, IActivityStats } from '@/pages/activity/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  activityList?: IActivity[];
  activityStats?: IActivityStats;
  activityPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    activitySearch: Effect;
    activityGetStats: Effect;
    activityDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ActivityDashboard',

  state: {},

  effects: {
    *activitySearch({ payload }, { call, put }) {
      const data = yield call(queryActivitySearch, payload);
      yield put({
        type: 'save',
        payload: {
          activityList: get(data, 'payload.items'),
          activityPager: get(data, 'payload.pager'),
        },
      });
    },

    *activityGetStats(_, { call, put }) {
      const data = yield call(queryActivityGetStats);
      yield put({
        type: 'save',
        payload: { activityStats: data.payload },
      });
    },

    *activityDeleteById({ payload }, { call, put }) {
      yield call(queryActivityDeleteById, payload.activityId);
      yield put({ type: 'activitySearch', payload: payload.queryParams });
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
