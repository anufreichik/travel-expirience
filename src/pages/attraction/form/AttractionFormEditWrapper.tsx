import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import AttractionForm from '@/pages/attraction/form/AttractionForm';
import { IAttraction } from '@/pages/attraction/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (attractionId: string) => void;
  reset: () => void;
  updateById: any;
  attractionInfo: IAttraction;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AttractionFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const attractionId: string = get(props, 'sidepanel.attractionId', '');

  const isLoadingGet = get(props, 'loadingEffects.AttractionForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.AttractionForm/updateById', false);

  useEffect(() => {
    props.getById(attractionId);
  }, []);

  const onFinish = (values: IAttraction) => {
    props.updateById({ values, attractionId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <AttractionForm
      onFinish={onFinish}
      initialValues={props.attractionInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  attractionInfo: state.AttractionForm.attractionInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'AttractionForm/reset' }),
  updateById: (payload: IAttraction) => dispatch({ type: 'AttractionForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'AttractionForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttractionFormEditWrapper));
