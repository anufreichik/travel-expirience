import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IRestaurant } from '@/pages/restaurant/types';

interface IProps extends IRestaurant {
  restaurantDelete: (id: String) => void;
}

const RestaurantSearchListItem = (props: IProps) => {
  const { restaurantDelete } = props;

  const owner = get(props, 'item.owner', '');
  const restaurantId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => restaurantDelete(restaurantId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  restaurantDelete: (payload: any) => dispatch({ type: 'RestaurantDashboard/restaurantDelete', payload }),
});

export default connect(null, mapDispatchToProps)(RestaurantSearchListItem);
