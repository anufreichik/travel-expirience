import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import OrderStats from '@/pages/order/dashboard/stats/OrderStats';
import OrderFilterForm from '@/pages/order/dashboard/search/OrderFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IOrderQueryParams } from '@/pages/order/types';
import OrderSearchList from '@/pages/order/dashboard/search/OrderSearchList';
import OrderDashboardControls from '@/pages/order/dashboard/controls/OrderDashboardControls';
import { IState } from '@/pages/order/dashboard/model';

const initialSearchForm = {
  orderSearchParam1: '',
  orderSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  orderGetStats: () => void;
  orderSearch: (arg: IOrderQueryParams) => void;
  orderReset: () => void;
  OrderDashboard: IState;
}

const OrderDashboard = (props: IProps) => {
  const orderStats = get(props, 'OrderDashboard.orderStats', {});
  const orderList = get(props, 'OrderDashboard.orderList', []);
  const orderPager = get(props, 'OrderDashboard.orderPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.orderGetStats();

    return () => {
      props.orderReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.orderSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IOrderQueryParams) => {
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
          <div className="h4 mr-4">Order dashboard</div>
          <OrderFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <OrderStats stats={orderStats} />

        <div>
          <OrderDashboardControls />
        </div>
      </div>

      <OrderSearchList items={orderList} />
      <Pager pager={orderPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  OrderDashboard: state.OrderDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  orderSearch: (payload: IOrderQueryParams) => dispatch({ type: 'OrderDashboard/orderSearch', payload }),
  orderGetStats: () => dispatch({ type: 'OrderDashboard/orderGetStats' }),
  orderReset: () => dispatch({ type: 'OrderDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDashboard);
