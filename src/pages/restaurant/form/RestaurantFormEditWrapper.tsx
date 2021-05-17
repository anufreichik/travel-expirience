import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import RestaurantForm from '@/pages/restaurant/form/RestaurantForm';
import { IRestaurant } from '@/pages/restaurant/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (restaurantId: string) => void;
  reset: () => void;
  updateById: any;
  restaurantInfo: IRestaurant;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const RestaurantFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const restaurantId: string = get(props, 'sidepanel.restaurantId', '');

  const isLoadingGet = get(props, 'loadingEffects.RestaurantForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.RestaurantForm/updateById', false);

  useEffect(() => {
    props.getById(restaurantId);
  }, []);

  const onFinish = (values: IRestaurant) => {
    props.updateById({ values, restaurantId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <RestaurantForm
      onFinish={onFinish}
      initialValues={props.restaurantInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  restaurantInfo: state.RestaurantForm.restaurantInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'RestaurantForm/reset' }),
  updateById: (payload: IRestaurant) => dispatch({ type: 'RestaurantForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'RestaurantForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantFormEditWrapper));
