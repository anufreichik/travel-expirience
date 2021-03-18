import React from 'react';
import { connect } from 'umi';
import OrderForm from '@/pages/order/form/OrderForm';
import { IOrder } from '@/pages/order/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IOrder) => void;
  loadingEffects: ILoadingEffects;
}

const OrderFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IOrder) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.OrderForm/create', false);

  return <OrderForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IOrder) => dispatch({ type: 'OrderForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormCreateWrapper);
