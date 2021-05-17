import React from 'react';
import { connect } from 'umi';

import { IExperience } from '@/pages/experience/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import ExperienceForm from '@/pages/experience/form/ExperienceForm';

interface IProps {
  create: (arg: IExperience) => void;
  loadingEffects: ILoadingEffects;
}

const ExperienceFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IExperience) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ExperienceForm/create', false);

  return <ExperienceForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IExperience) => dispatch({ type: 'ExperienceForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceFormCreateWrapper);
