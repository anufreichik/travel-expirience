import React from 'react';
import { connect } from 'umi';
import RestaurantForm from '@/pages/restaurant/form/RestaurantForm';
import { IRestaurant } from '@/pages/restaurant/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IRestaurant) => void;
  loadingEffects: ILoadingEffects;
}

const RestaurantFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IRestaurant) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.RestaurantForm/create', false);

  return <RestaurantForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IRestaurant) => dispatch({ type: 'RestaurantForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFormCreateWrapper);
