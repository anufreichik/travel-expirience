import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import RestaurantStats from '@/pages/restaurant/dashboard/stats/RestaurantStats';
import RestaurantFilterForm from '@/pages/restaurant/dashboard/search/RestaurantFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IRestaurantQueryParams } from '@/pages/restaurant/types';
import RestaurantSearchList from '@/pages/restaurant/dashboard/search/RestaurantSearchList';
import RestaurantDashboardControls from '@/pages/restaurant/dashboard/controls/RestaurantDashboardControls';
import { IState } from '@/pages/restaurant/dashboard/model';

const initialSearchForm = {
  restaurantSearchParam1: '',
  restaurantSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  restaurantGetStats: () => void;
  restaurantSearch: (arg: IRestaurantQueryParams) => void;
  restaurantReset: () => void;
  RestaurantDashboard: IState;
}

const RestaurantDashboard = (props: IProps) => {
  const restaurantStats = get(props, 'RestaurantDashboard.restaurantStats', {});
  const restaurantList = get(props, 'RestaurantDashboard.restaurantList', []);
  const restaurantPager = get(props, 'RestaurantDashboard.restaurantPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.restaurantGetStats();

    return () => {
      props.restaurantReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.restaurantSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IRestaurantQueryParams) => {
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
          <div className="h4 mr-4">Restaurant dashboard</div>
          <RestaurantFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <RestaurantStats stats={restaurantStats} />

        <div>
          <RestaurantDashboardControls />
        </div>
      </div>

      <RestaurantSearchList items={restaurantList} />
      <Pager pager={restaurantPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  RestaurantDashboard: state.RestaurantDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  restaurantSearch: (payload: IRestaurantQueryParams) =>
    dispatch({ type: 'RestaurantDashboard/restaurantSearch', payload }),
  restaurantGetStats: () => dispatch({ type: 'RestaurantDashboard/restaurantGetStats' }),
  restaurantReset: () => dispatch({ type: 'RestaurantDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDashboard);
