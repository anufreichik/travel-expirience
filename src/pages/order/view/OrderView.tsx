import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  orderId: string;
  name: string;
  orderGetById: (id: string) => void;
}

const OrderView = (props: IProps) => {
  const orderId = get(props, 'match.params.orderId');
  const name = get(props, 'OrderView.name', '');

  console.log(props);

  useEffect(() => {
    props.orderGetById(orderId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  OrderView: state.OrderView,
});

const mapDispatchToProps = (dispatch: any) => ({
  orderGetById: (payload: string) => dispatch({ type: 'OrderView/orderGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
