import React, { useEffect, memo } from 'react';
import {Link, withRouter} from 'react-router-dom';
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
import { makeSelectSubscriber } from './selectors';
import messages from './messages';
import {
  loadSubscriber,
  resetSubscriber,
  removeSubscriber,
  disableService,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'subscriberCard';

export function SubscriberCard({
  loading,
  error,
  subscriber,
  onInitPage,
  removeSubscriberClick,
                                 disableServiceClick,
  match,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => onInitPage(match.params.id), []);

  let content = '';
  if (subscriber) {
    const services = subscriber.services.map(service => {
      const context = {
        service_id: service.id,
        subscriber_id: subscriber.id,
      };
      return <li key={service.id}>
        <span><Link to={`/services/${service.id}`}>{service.title}</Link></span>
        <span> (Enabled at {service.created_at})</span>
        <button onClick={disableServiceClick.bind(this, context)}>Disable</button>
      </li>
    });

    content = <div>
      <ul>
        <li>
          <span>ID: </span><span>{subscriber.id}</span>
        </li>
        <li>
          <span>Phone: </span><span>{subscriber.phone}</span>
        </li>
        <li>
          <span>Locale: </span><span>{subscriber.locale}</span>
        </li>
        <li>
          <span>Created at: </span><span>{subscriber.created_at}</span>
        </li>
        <li>
          <Link to={`/subscribers/${subscriber.id}/edit`}>Edit</Link>
        </li>
        <li>
          <button disabled={loading} onClick={removeSubscriberClick.bind(this, subscriber.id)}>Delete</button>
        </li>
      </ul>
      <div>Enabled services:</div>
      <Link to={`/subscribers/${subscriber.id}/services/enable`}>Enable New Service</Link>
      <ul>
        {services}
      </ul>
    </div>
  }

  return (
    <article>
      <Helmet>
        <title>Subscriber Card</title>
        <meta name="description" content="Subscriber details" />
      </Helmet>
      <Wrapper>{content}</Wrapper>
    </article>
  );
}

SubscriberCard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  subscriber: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onInitPage: PropTypes.func,
  removeSubscriberClick: PropTypes.func,
  disableServiceClick: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  subscriber: makeSelectSubscriber(),
});

export function mapDispatchToProps(dispatch) {
  return {
    disableServiceClick: evt => {
      // @todo: throttling & disabling
      dispatch(disableService(evt));
    },
    removeSubscriberClick: evt => {
      // @todo: throttling & disabling
      dispatch(removeSubscriber(evt));
    },
    onInitPage: id => {
      if (id) {
        dispatch(loadSubscriber(id));
        return;
      }

      dispatch(resetSubscriber());
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
)(SubscriberCard);
