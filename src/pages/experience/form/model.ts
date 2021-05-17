import { Effect, history, Reducer } from 'umi';

import { queryExperienceCreate, queryExperienceGetById, queryExperienceUpdateById } from '@/pages/experience/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ExperienceModelType {
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

const ExperienceModel: ExperienceModelType = {
  namespace: 'ExperienceForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryExperienceCreate, payload);
      yield put({ type: 'ExperienceDashboard/experienceSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/experience');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { experienceInfo: {} } });
      const data = yield call(queryExperienceGetById, payload);
      yield put({ type: 'save', payload: { experienceInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryExperienceUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ExperienceDashboard/experienceSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ExperienceModel;
