import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IExperience } from '@/pages/experience/types';

interface IProps extends IExperience {
  experienceDelete: (id: String) => void;
}

const ExperienceSearchListItem = (props: IProps) => {
  const { experienceDelete } = props;

  const owner = get(props, 'item.owner', '');
  const experienceId = get(props, 'item._id', '');
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
        <Button danger onClick={() => experienceDelete(experienceId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  experienceDelete: (payload: any) => dispatch({ type: 'ExperienceDashboard/experienceDelete', payload }),
});

export default connect(null, mapDispatchToProps)(ExperienceSearchListItem);
