import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const RestaurantDashboardControls = (props: IProps) => {
  const restaurantCreate = () => {
    props.open({
      title: 'Create new Restaurant',
      component: 'RestaurantFormCreate',
      place: 'RestaurantDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={restaurantCreate}>
      Create Restaurant
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(RestaurantDashboardControls);
