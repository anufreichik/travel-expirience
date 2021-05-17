import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ActivityForm from '@/pages/activity/form/ActivityForm';
import { IActivity } from '@/pages/activity/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (activityId: string) => void;
  reset: () => void;
  updateById: any;
  activityInfo: IActivity;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ActivityFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const activityId: string = get(props, 'sidepanel.activityId', '');

  const isLoadingGet = get(props, 'loadingEffects.ActivityForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ActivityForm/updateById', false);

  useEffect(() => {
    props.getById(activityId);
  }, []);

  const onFinish = (values: IActivity) => {
    props.updateById({ values, activityId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ActivityForm
      onFinish={onFinish}
      initialValues={props.activityInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  activityInfo: state.ActivityForm.activityInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ActivityForm/reset' }),
  updateById: (payload: IActivity) => dispatch({ type: 'ActivityForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ActivityForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivityFormEditWrapper));
