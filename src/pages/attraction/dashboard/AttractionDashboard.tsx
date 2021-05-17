import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import AttractionStats from '@/pages/attraction/dashboard/stats/AttractionStats';
import AttractionFilterForm from '@/pages/attraction/dashboard/search/AttractionFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IAttractionQueryParams } from '@/pages/attraction/types';
import AttractionSearchList from '@/pages/attraction/dashboard/search/AttractionSearchList';
import AttractionDashboardControls from '@/pages/attraction/dashboard/controls/AttractionDashboardControls';
import { IState } from '@/pages/attraction/dashboard/model';

const initialSearchForm = {
  attractionSearchParam1: '',
  attractionSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  attractionGetStats: () => void;
  attractionSearch: (arg: IAttractionQueryParams) => void;
  attractionReset: () => void;
  AttractionDashboard: IState;
}

const AttractionDashboard = (props: IProps) => {
  const attractionStats = get(props, 'AttractionDashboard.attractionStats', {});
  const attractionList = get(props, 'AttractionDashboard.attractionList', []);
  const attractionPager = get(props, 'AttractionDashboard.attractionPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.attractionGetStats();

    return () => {
      props.attractionReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.attractionSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IAttractionQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Attraction dashboard</div>
          <AttractionFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <AttractionStats stats={attractionStats} />

        <div>
          <AttractionDashboardControls />
        </div>
      </div>

      <AttractionSearchList items={attractionList} />
      <Pager pager={attractionPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  AttractionDashboard: state.AttractionDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  attractionSearch: (payload: IAttractionQueryParams) =>
    dispatch({ type: 'AttractionDashboard/attractionSearch', payload }),
  attractionGetStats: () => dispatch({ type: 'AttractionDashboard/attractionGetStats' }),
  attractionReset: () => dispatch({ type: 'AttractionDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttractionDashboard);
