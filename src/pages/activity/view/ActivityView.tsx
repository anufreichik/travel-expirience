import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  activityId: string;
  name: string;
  activityGetById: (id: string) => void;
}

const ActivityView = (props: IProps) => {
  const activityId = get(props, 'match.params.activityId');
  const name = get(props, 'ActivityView.name', '');

  console.log(props);

  useEffect(() => {
    props.activityGetById(activityId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ActivityView: state.ActivityView,
});

const mapDispatchToProps = (dispatch: any) => ({
  activityGetById: (payload: string) => dispatch({ type: 'ActivityView/activityGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityView);
