import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import ActivityStats from '@/pages/activity/dashboard/stats/ActivityStats';
import ActivityFilterForm from '@/pages/activity/dashboard/search/ActivityFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IActivityQueryParams } from '@/pages/activity/types';
import ActivitySearchList from '@/pages/activity/dashboard/search/ActivitySearchList';
import ActivityDashboardControls from '@/pages/activity/dashboard/controls/ActivityDashboardControls';
import { IState } from '@/pages/activity/dashboard/model';

const initialSearchForm = {
  activitySearchParam1: '',
  activitySearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  activityGetStats: () => void;
  activitySearch: (arg: IActivityQueryParams) => void;
  activityReset: () => void;
  ActivityDashboard: IState;
}

const ActivityDashboard = (props: IProps) => {
  const activityStats = get(props, 'ActivityDashboard.activityStats', {});
  const activityList = get(props, 'ActivityDashboard.activityList', []);
  const activityPager = get(props, 'ActivityDashboard.activityPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.activityGetStats();

    return () => {
      props.activityReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.activitySearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IActivityQueryParams) => {
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
          <div className="h4 mr-4">Activity dashboard</div>
          <ActivityFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <ActivityStats stats={activityStats} />

        <div>
          <ActivityDashboardControls />
        </div>
      </div>

      <ActivitySearchList items={activityList} />
      <Pager pager={activityPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ActivityDashboard: state.ActivityDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  activitySearch: (payload: IActivityQueryParams) => dispatch({ type: 'ActivityDashboard/activitySearch', payload }),
  activityGetStats: () => dispatch({ type: 'ActivityDashboard/activityGetStats' }),
  activityReset: () => dispatch({ type: 'ActivityDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDashboard);
