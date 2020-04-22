import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import Wrapper from 'components/List/Wrapper';
import { makeSelectSubscribers } from './selectors';
import messages from './messages';
import { loadSubscribers, removeSubscriber } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'subscribers';

export function SubscribersPage({
  loading,
  error,
  subscribers,
  onPageOpened,
  removeSubscriberClick,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => onPageOpened(), []);

  let content;
  if (subscribers) {
    content = subscribers.map(item => (
      <div key={item.id}>
        <button id={item.id} onClick={removeSubscriberClick}>
          X
        </button>
        <Link to={`/subscribers/${item.id}`}>
          {item.id} - {item.phone} - {item.locale} - {item.created_at};
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
        <title>Subscribers List</title>
        <meta name="description" content="Big Data Technologies Homepage" />
      </Helmet>
      <Wrapper>
        <Link to="/subscribers/new">
          <FormattedMessage {...messages.new} />
        </Link>
        <div>{content}</div>
      </Wrapper>
    </article>
  );
}

SubscribersPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  subscribers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onPageOpened: PropTypes.func,
  removeSubscriberClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  subscribers: makeSelectSubscribers(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onPageOpened: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      dispatch(loadSubscribers());
    },
    removeSubscriberClick: evt => {
      // @todo: throttling & disabling
      dispatch(removeSubscriber(evt.target.id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SubscribersPage);
