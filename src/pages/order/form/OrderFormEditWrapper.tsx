import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import OrderForm from '@/pages/order/form/OrderForm';
import { IOrder } from '@/pages/order/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (orderId: string) => void;
  reset: () => void;
  updateById: any;
  orderInfo: IOrder;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OrderFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const orderId: string = get(props, 'sidepanel.orderId', '');

  const isLoadingGet = get(props, 'loadingEffects.OrderForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.OrderForm/updateById', false);

  useEffect(() => {
    props.getById(orderId);
  }, []);

  const onFinish = (values: IOrder) => {
    props.updateById({ values, orderId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <OrderForm
      onFinish={onFinish}
      initialValues={props.orderInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  orderInfo: state.OrderForm.orderInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'OrderForm/reset' }),
  updateById: (payload: IOrder) => dispatch({ type: 'OrderForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'OrderForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderFormEditWrapper));
