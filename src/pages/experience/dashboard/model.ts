import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryExperienceDeleteById, queryExperienceGetStats, queryExperienceSearch } from '@/pages/experience/queries';
import { IExperience, IExperienceStats } from '@/pages/experience/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  experienceList?: IExperience[];
  experienceStats?: IExperienceStats;
  experiencePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    experienceSearch: Effect;
    experienceGetStats: Effect;
    experienceDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ExperienceDashboard',

  state: {},

  effects: {
    *experienceSearch({ payload }, { call, put }) {
      const data = yield call(queryExperienceSearch, payload);
      yield put({
        type: 'save',
        payload: {
          experienceList: get(data, 'payload.items'),
          experiencePager: get(data, 'payload.pager'),
        },
      });
    },

    *experienceGetStats(_, { call, put }) {
      const data = yield call(queryExperienceGetStats);
      yield put({
        type: 'save',
        payload: { experienceStats: data.payload },
      });
    },

    *experienceDeleteById({ payload }, { call, put }) {
      yield call(queryExperienceDeleteById, payload.experienceId);
      yield put({ type: 'experienceSearch', payload: payload.queryParams });
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
