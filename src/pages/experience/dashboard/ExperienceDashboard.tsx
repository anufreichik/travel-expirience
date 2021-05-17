import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import Pager from '@/pages/utils/pager/Pager';
import { IExperienceQueryParams } from '@/pages/experience/types';
import { IState } from '@/pages/experience/dashboard/model';
import ExperienceFilterForm from '@/pages/experience/dashboard/search/ExperienceFilterForm';
import ExperienceDashboardControls from '@/pages/experience/dashboard/controls/ExperienceDashboardControls';
import ExperienceSearchList from '@/pages/experience/dashboard/search/ExperienceSearchList';
import ExperienceStats from '@/pages/experience/dashboard/stats/ExperienceStats';

const initialSearchForm = {
  experienceSearchParam1: '',
  experienceSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  experienceGetStats: () => void;
  experienceSearch: (arg: IExperienceQueryParams) => void;
  experienceReset: () => void;
  ExperienceDashboard: IState;
}

const ExperienceDashboard = (props: IProps) => {
  const experienceStats = get(props, 'ExperienceDashboard.experienceStats', {});
  const experienceList = get(props, 'ExperienceDashboard.experienceList', []);
  const experiencePager = get(props, 'ExperienceDashboard.experiencePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.experienceGetStats();

    return () => {
      props.experienceReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.experienceSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IExperienceQueryParams) => {
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
          <div className="h4 mr-4">Experience dashboard</div>
          <ExperienceFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <ExperienceStats stats={experienceStats} />

        <div>
          <ExperienceDashboardControls />
        </div>
      </div>

      <ExperienceSearchList items={experienceList} />
      <Pager pager={experiencePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ExperienceDashboard: state.ExperienceDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  experienceSearch: (payload: IExperienceQueryParams) =>
    dispatch({ type: 'ExperienceDashboard/experienceSearch', payload }),
  experienceGetStats: () => dispatch({ type: 'ExperienceDashboard/experienceGetStats' }),
  experienceReset: () => dispatch({ type: 'ExperienceDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDashboard);
