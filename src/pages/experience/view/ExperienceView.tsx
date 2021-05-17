import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import ExperienceAttractionsView from '@/pages/experience/attraction/ExperienceAttractionsView';
import ExperienceActivitiesView from '@/pages/experience/activity/ExperienceActivitiesView';
import ExperienceRestaurantsView from '@/pages/experience/restaurant/ExperienceRestaurantsView';

interface IProps {
  experienceId: string;
  name: string;
  experienceGetById: (id: string) => void;
  ExperienceView: any;
}

const ExperienceView = (props: IProps) => {
  const experienceId = get(props, 'match.params.experienceId');
  const name = get(props, 'ExperienceView.name', '');
  const city = get(props, 'ExperienceView.city', '');
  const state = get(props, 'ExperienceView.state', '');
  const country = get(props, 'ExperienceView.country', '');
  const attractions = get(props, 'ExperienceView.attractions', []);
  const restaurants = get(props, 'ExperienceView.restaurants', []);
  const activities = get(props, 'ExperienceView.activities', []);

  console.log(props.ExperienceView);

  useEffect(() => {
    props.experienceGetById(experienceId);
  }, []);

  return (
    <div>
      <div className="experienceHeader__name d-flex justify-content-between">
        <div>{name}</div>
      </div>

      <small>{`${city}, ${country}`}</small>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {attractions.length > 0 && <h5 className="mt-3 experience_attractions_header text-center">Attractions</h5>}
            <ExperienceAttractionsView items={attractions} experienceId={experienceId} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {activities.length > 0 && <h5 className="mt-3 experience_activities_header text-center">Activities</h5>}
            <ExperienceActivitiesView items={activities} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {restaurants.length > 0 && <h5 className="mt-3 experience_dining_header text-center">Dining</h5>}
            <ExperienceRestaurantsView items={restaurants} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ExperienceView: state.ExperienceView,
});

const mapDispatchToProps = (dispatch: any) => ({
  experienceGetById: (payload: string) => dispatch({ type: 'ExperienceView/experienceGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceView);
