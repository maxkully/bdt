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
import { makeSelectService } from './selectors';
import messages from './messages';
import { loadService, resetService, removeService } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'serviceCard';

export function ServiceCard({
  loading,
  error,
  service,
  onInitPage,
  removeServiceClick,
  match,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => onInitPage(match.params.id), []);

  const users = service.users.map(user => (
    <li>
      <span>
        <Link to={`/subscribers/${user.id}`}>{user.phone}</Link>
      </span>
      <span> (Enabled at {user.created_at})</span>
    </li>
  ));

  let content = '';
  if (service) {
    content = (
      <div>
        <div>Details</div>
        <ul>
          <li>
            <span>ID: </span>
            <span>{service.id}</span>
          </li>
          <li>
            <span>Title: </span>
            <span>{service.title}</span>
          </li>
          <li>
            <span>Created at: </span>
            <span>{service.created_at}</span>
          </li>
          <li>
            <Link to={`/services/${service.id}/edit`}>Edit</Link>
          </li>
          <li>
            <button onClick={removeServiceClick.bind(this, service.id)}>
              Delete
            </button>
          </li>
        </ul>
        <div>Users:</div>
        <ul>{users}</ul>
      </div>
    );
  }

  return (
    <article>
      <Helmet>
        <title>Service Card</title>
        <meta name="description" content="Service details" />
      </Helmet>
      <Wrapper>{content}</Wrapper>
    </article>
  );
}

ServiceCard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  service: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onInitPage: PropTypes.func,
  removeServiceClick: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  service: makeSelectService(),
});

export function mapDispatchToProps(dispatch) {
  return {
    removeServiceClick: evt => {
      // @todo: throttling & disabling
      dispatch(removeService(evt));
    },
    onInitPage: id => {
      if (id) {
        dispatch(loadService(id));
        return;
      }

      dispatch(resetService());
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
)(ServiceCard);
