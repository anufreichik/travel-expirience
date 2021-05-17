import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const ActivityDashboardControls = (props: IProps) => {
  const activityCreate = () => {
    props.open({
      title: 'Create new Activity',
      component: 'ActivityFormCreate',
      place: 'ActivityDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={activityCreate}>
      Create Activity
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(ActivityDashboardControls);
