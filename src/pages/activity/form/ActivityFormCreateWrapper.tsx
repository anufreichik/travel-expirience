import React from 'react';
import { connect } from 'umi';
import ActivityForm from '@/pages/activity/form/ActivityForm';
import { IActivity } from '@/pages/activity/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IActivity) => void;
  loadingEffects: ILoadingEffects;
}

const ActivityFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IActivity) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ActivityForm/create', false);

  return <ActivityForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IActivity) => dispatch({ type: 'ActivityForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFormCreateWrapper);
