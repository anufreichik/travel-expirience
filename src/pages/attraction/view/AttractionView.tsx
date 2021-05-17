import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  attractionId: string;
  name: string;
  attractionGetById: (id: string) => void;
}

const AttractionView = (props: IProps) => {
  const attractionId = get(props, 'match.params.attractionId');
  const name = get(props, 'AttractionView.name', '');

  console.log(props);

  useEffect(() => {
    props.attractionGetById(attractionId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  AttractionView: state.AttractionView,
});

const mapDispatchToProps = (dispatch: any) => ({
  attractionGetById: (payload: string) => dispatch({ type: 'AttractionView/attractionGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttractionView);
