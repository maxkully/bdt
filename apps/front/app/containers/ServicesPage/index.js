import React, { useEffect, memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import Wrapper from 'components/List/Wrapper';
import { makeSelectServices } from './selectors';
import messages from './messages';
import { loadServices, removeService, enableService } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'services';

export function ServicesPage({
  loading,
  error,
  services,
  onPageOpened,
  removeServiceClick,
  enableServiceClick,
  match,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => onPageOpened(), []);

  let actionButton;
  if (match.params.id) {
    actionButton = serviceId => (
      <button
        id={serviceId}
        onClick={enableServiceClick.bind(this, {
          service_id: serviceId,
          subscriber_id: match.params.id,
        })}
      >
        +
      </button>
    );
  } else {
    actionButton = serviceId => (
      <button id={serviceId} onClick={removeServiceClick}>
        X
      </button>
    );
  }

  let content;
  if (services) {
    content = services.map(item => (
      <div key={item.id}>
        {actionButton(item.id)}
        <Link to={`/services/${item.id}`}>
          {item.id} - {item.title} - {item.created_at};
        </Link>
      </div>
    ));
  } else {
    // Otherwise render a single component
    content = <div>Nothing</div>;
  }

  return (
    <article>
      <Helmet>
        <title>Services List</title>
        <meta name="description" content="Services List" />
      </Helmet>
      <Wrapper>
        <Link to="/services/new">
          <FormattedMessage {...messages.new} />
        </Link>
        <div>{content}</div>
      </Wrapper>
    </article>
  );
}

ServicesPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  subscribers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onPageOpened: PropTypes.func,
  removeServiceClick: PropTypes.func,
  enableServiceClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  services: makeSelectServices(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onPageOpened: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      dispatch(loadServices());
    },
    removeServiceClick: evt => {
      // @todo: throttling & disabling
      dispatch(removeService(evt.target.id));
    },
    enableServiceClick: evt => {
      // @todo: throttling & disabling
      dispatch(enableService(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(ServicesPage);
