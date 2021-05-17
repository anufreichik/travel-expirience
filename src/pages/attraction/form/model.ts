import { Effect, history, Reducer } from 'umi';

import { queryAttractionCreate, queryAttractionGetById, queryAttractionUpdateById } from '@/pages/attraction/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface AttractionModelType {
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

const AttractionModel: AttractionModelType = {
  namespace: 'AttractionForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryAttractionCreate, payload);
      yield put({ type: 'AttractionDashboard/attractionSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/attraction');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { attractionInfo: {} } });
      const data = yield call(queryAttractionGetById, payload);
      yield put({ type: 'save', payload: { attractionInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryAttractionUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'AttractionDashboard/attractionSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default AttractionModel;
