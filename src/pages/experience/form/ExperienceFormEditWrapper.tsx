import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ExperienceForm from '@/pages/experience/form/ExperienceForm';
import { IExperience } from '@/pages/experience/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (experienceId: string) => void;
  reset: () => void;
  updateById: any;
  experienceInfo: IExperience;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ExperienceFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const experienceId: string = get(props, 'sidepanel.experienceId', '');

  const isLoadingGet = get(props, 'loadingEffects.ExperienceForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ExperienceForm/updateById', false);

  useEffect(() => {
    props.getById(experienceId);
  }, []);

  const onFinish = (values: IExperience) => {
    props.updateById({ values, experienceId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ExperienceForm
      onFinish={onFinish}
      initialValues={props.experienceInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  experienceInfo: state.ExperienceForm.experienceInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ExperienceForm/reset' }),
  updateById: (payload: IExperience) => dispatch({ type: 'ExperienceForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ExperienceForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExperienceFormEditWrapper));
