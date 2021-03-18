import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import ClientStats from '@/pages/client/dashboard/stats/ClientStats';
import ClientFilterForm from '@/pages/client/dashboard/search/ClientFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IClientQueryParams } from '@/pages/client/types';
import ClientSearchList from '@/pages/client/dashboard/search/ClientSearchList';
import ClientDashboardControls from '@/pages/client/dashboard/controls/ClientDashboardControls';
import { IState } from '@/pages/client/dashboard/model';

const initialSearchForm = {
  clientSearchParam1: '',
  clientSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  clientGetStats: () => void;
  clientSearch: (arg: IClientQueryParams) => void;
  clientReset: () => void;
  ClientDashboard: IState;
}

const ClientDashboard = (props: IProps) => {
  const clientStats = get(props, 'ClientDashboard.clientStats', {});
  const clientList = get(props, 'ClientDashboard.clientList', []);
  const clientPager = get(props, 'ClientDashboard.clientPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.clientGetStats();

    return () => {
      props.clientReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.clientSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IClientQueryParams) => {
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
          <div className="h4 mr-4">Client dashboard</div>
          <ClientFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <ClientStats stats={clientStats} />

        <div>
          <ClientDashboardControls />
        </div>
      </div>

      <ClientSearchList items={clientList} />
      <Pager pager={clientPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ClientDashboard: state.ClientDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientSearch: (payload: IClientQueryParams) => dispatch({ type: 'ClientDashboard/clientSearch', payload }),
  clientGetStats: () => dispatch({ type: 'ClientDashboard/clientGetStats' }),
  clientReset: () => dispatch({ type: 'ClientDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
