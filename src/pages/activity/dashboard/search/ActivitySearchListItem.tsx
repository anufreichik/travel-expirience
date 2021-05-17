import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IActivity } from '@/pages/activity/types';

interface IProps extends IActivity {
  activityDelete: (id: String) => void;
}

const ActivitySearchListItem = (props: IProps) => {
  const { activityDelete } = props;

  const owner = get(props, 'item.owner', '');
  const activityId = get(props, 'item._id', '');
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
        <Button danger onClick={() => activityDelete(activityId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  activityDelete: (payload: any) => dispatch({ type: 'ActivityDashboard/activityDelete', payload }),
});

export default connect(null, mapDispatchToProps)(ActivitySearchListItem);
