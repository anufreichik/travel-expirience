import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IAttraction } from '@/pages/attraction/types';

interface IProps extends IAttraction {
  attractionDelete: (id: String) => void;
}

const AttractionSearchListItem = (props: IProps) => {
  const { attractionDelete } = props;

  const owner = get(props, 'item.owner', '');
  const attractionId = get(props, 'item._id', '');
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
        <Button danger onClick={() => attractionDelete(attractionId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  attractionDelete: (payload: any) => dispatch({ type: 'AttractionDashboard/attractionDelete', payload }),
});

export default connect(null, mapDispatchToProps)(AttractionSearchListItem);
