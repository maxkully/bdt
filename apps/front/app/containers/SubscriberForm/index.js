import React, { useEffect, memo } from 'react';
import { withRouter } from 'react-router-dom';
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
  addSubscriber,
  changeLocale,
  changePhone,
  loadSubscriber,
  updateSubscriber,
  resetSubscriber,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import Input from './Input';
import Form from './Form';

const key = 'subscriberForm';

export function SubscriberForm({
  loading,
  error,
  subscriber,
  onSubmitForm,
  onChangePhone,
  onChangeLocale,
  onInitPage,
  match,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => onInitPage(match.params.id), []);

  return (
    <article>
      <Helmet>
        <title>New Subscriber</title>
        <meta name="description" content="Adding new subscriber" />
      </Helmet>
      <Wrapper>
        <Form onSubmit={onSubmitForm}>
          <Input
            id="subscriberId"
            name="subscriberId"
            type="hidden"
            value={subscriber.id}
          />
          <label htmlFor="phone">
            <FormattedMessage {...messages.phone} />
            {/* @todo: put Phone component here */}
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="+111111111111"
              value={subscriber.phone}
              // @todo: uniqueness control
              onChange={onChangePhone}
            />
          </label>
          <label htmlFor="locale">
            <FormattedMessage {...messages.locale} />
            {/* @todo: put Locale component here */}
            <Input
              id="locale"
              name="locale"
              type="text"
              placeholder="RU"
              value={subscriber.locale}
              onChange={onChangeLocale}
            />
          </label>
          <button type="submit">
            <FormattedMessage {...messages.submit} />
          </button>
        </Form>
      </Wrapper>
    </article>
  );
}

SubscriberForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  subscriber: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangeLocale: PropTypes.func,
  onInitPage: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  subscriber: makeSelectSubscriber(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangePhone: evt => {
      dispatch(changePhone(evt.target.value));
    },
    onChangeLocale: evt => {
      dispatch(changeLocale(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // @todo: throttling & disabling
      const data = {
        id: evt.target.elements.subscriberId.value,
        phone: evt.target.elements.phone.value,
        locale: evt.target.elements.locale.value,
      };
      console.log('onSubmitForm event data => ', data);
      if (data.id !== '') {
        dispatch(updateSubscriber(data));
        return;
      }

      dispatch(addSubscriber(data));
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
)(SubscriberForm);
