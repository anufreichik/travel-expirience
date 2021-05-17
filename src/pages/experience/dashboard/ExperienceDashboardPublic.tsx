import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import { IExperienceQueryParams } from '@/pages/experience/types';
import { IState } from '@/pages/experience/dashboard/model';
import ExperienceSearchCards from '@/pages/experience/dashboard/search/ExperienceSearchCards';
import ExperienceSearchInput from '@/pages/experience/dashboard/search/ExperienceSearchInput';

const initialSearchForm = {
  name: '',
  country: '',
  city: '',
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

const ExperienceDashboardPublic = (props: IProps) => {
  const experienceList = get(props, 'ExperienceDashboard.experienceList', []);
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...mixin };
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
  }, []);

  const onFiltersChange = (values: null | IExperienceQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    props.experienceSearch(query);
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
  };

  return (
    <>
      <div className="container mt-3 mb-2">
        <div className="row mb-2">
          <div className="d-flex justify-content-center">
            <ExperienceSearchInput onChange={onFiltersChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1>Travel Experiences</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12">
            <ExperienceSearchCards items={experienceList} />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ExperienceDashboard: state.ExperienceDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  experienceSearch: (payload: IExperienceQueryParams) =>
    dispatch({
      type: 'ExperienceDashboard/experienceSearch',
      payload,
    }),
  experienceGetStats: () => dispatch({ type: 'ExperienceDashboard/experienceGetStats' }),
  experienceReset: () => dispatch({ type: 'ExperienceDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDashboardPublic);
