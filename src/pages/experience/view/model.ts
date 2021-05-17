import { Effect, Reducer } from 'umi';

import { queryExperienceGetById } from '@/pages/experience/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    experienceGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ExperienceView',

  state: {},

  effects: {
    *experienceGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryExperienceGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *experienceDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryExperienceDeleteById, payload.experienceId);
    //   yield put({ type: 'experienceSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
