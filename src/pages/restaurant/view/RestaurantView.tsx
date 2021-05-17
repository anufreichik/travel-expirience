import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  restaurantId: string;
  name: string;
  restaurantGetById: (id: string) => void;
}

const RestaurantView = (props: IProps) => {
  const restaurantId = get(props, 'match.params.restaurantId');
  const name = get(props, 'RestaurantView.name', '');

  console.log(props);

  useEffect(() => {
    props.restaurantGetById(restaurantId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  RestaurantView: state.RestaurantView,
});

const mapDispatchToProps = (dispatch: any) => ({
  restaurantGetById: (payload: string) => dispatch({ type: 'RestaurantView/restaurantGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantView);
