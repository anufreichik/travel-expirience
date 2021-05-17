import React from 'react';
import { connect } from 'umi';
import AttractionForm from '@/pages/attraction/form/AttractionForm';
import { IAttraction } from '@/pages/attraction/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IAttraction) => void;
  loadingEffects: ILoadingEffects;
}

const AttractionFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IAttraction) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.AttractionForm/create', false);

  return <AttractionForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IAttraction) => dispatch({ type: 'AttractionForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttractionFormCreateWrapper);
