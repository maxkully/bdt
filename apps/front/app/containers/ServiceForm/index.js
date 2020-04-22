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
import { makeSelectService } from './selectors';
import messages from './messages';
import {
  addService,
  changeTitle,
  changeDescription,
  updateService,
  resetService,
  loadService,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import Input from './Input';
import Form from './Form';

const key = 'serviceForm';

export function ServiceForm({
  loading,
  error,
  service,
  onSubmitForm,
  onChangeTitle,
  onChangeDescription,
  onInitPage,
  match,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => onInitPage(match.params.id), []);

  return (
    <article>
      <Helmet>
        <title>New Service</title>
        <meta name="description" content="Adding new service" />
      </Helmet>
      <Wrapper>
        <Form onSubmit={onSubmitForm}>
          <Input
            id="serviceId"
            name="serviceId"
            type="hidden"
            value={service.id}
          />
          <label htmlFor="title">
            <FormattedMessage {...messages.title} />
            {/* @todo: put Phone component here */}
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="type something here..."
              value={service.title}
              // @todo: uniqueness control
              onChange={onChangeTitle}
            />
          </label>
          <label htmlFor="description">
            <FormattedMessage {...messages.description} />
            {/* @todo: put Phone component here */}
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="type something here..."
              value={service.description}
              onChange={onChangeDescription}
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

ServiceForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  service: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onInitPage: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  service: makeSelectService(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTitle: evt => {
      dispatch(changeTitle(evt.target.value));
    },
    onChangeDescription: evt => {
      dispatch(changeDescription(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // @todo: throttling & disabling
      let data = {
        title: evt.target.elements.title.value,
        description: evt.target.elements.description.value,
      };

      if (evt.target.elements.serviceId.value !== '') {
        data = { id: evt.target.elements.serviceId.value, ...data };
        dispatch(updateService(data));
        return;
      }

      dispatch(addService(data));
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
)(ServiceForm);
