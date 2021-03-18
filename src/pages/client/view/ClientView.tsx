import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  clientId: string;
  name: string;
  clientGetById: (id: string) => void;
}

const ClientView = (props: IProps) => {
  const clientId = get(props, 'match.params.clientId');
  const name = get(props, 'ClientView.name', '');

  console.log(props);

  useEffect(() => {
    props.clientGetById(clientId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClientView: state.ClientView,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetById: (payload: string) => dispatch({ type: 'ClientView/clientGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientView);
