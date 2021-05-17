import { Effect, history, Reducer } from 'umi';

import { queryActivityCreate, queryActivityGetById, queryActivityUpdateById } from '@/pages/activity/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ActivityModelType {
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

const ActivityModel: ActivityModelType = {
  namespace: 'ActivityForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryActivityCreate, payload);
      yield put({ type: 'ActivityDashboard/activitySearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/activity');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { activityInfo: {} } });
      const data = yield call(queryActivityGetById, payload);
      yield put({ type: 'save', payload: { activityInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryActivityUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ActivityDashboard/activitySearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ActivityModel;
