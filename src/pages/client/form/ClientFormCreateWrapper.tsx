import React from 'react';
import { connect } from 'umi';
import ClientForm from '@/pages/client/form/ClientForm';
import { IClient } from '@/pages/client/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IClient) => void;
  loadingEffects: ILoadingEffects;
}

const ClientFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClient) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ClientForm/create', false);

  return <ClientForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClient) => dispatch({ type: 'ClientForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientFormCreateWrapper);
