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
import { makeSelectError, makeSelectLoading } from 'containers/App/selectors';
import Wrapper from 'components/List/Wrapper';
import { makeSelectCredentials } from './selectors';
import messages from './messages';
import { loginUser, changeCredentials } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'loginPage';

export function LoginPage({
  loading,
  error,
  credentials,
  handleSubmit,
  handleChange,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">E-mail</label>
      <input
        name="username"
        placeholder="E-mail"
        value={credentials.username}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <br />

      <input type="submit" />
    </form>
  );
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  credentials: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  credentials: makeSelectCredentials(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleChange: evt => {
      dispatch(
        changeCredentials({
          [evt.target.name]: evt.target.value,
        }),
      );
    },
    handleSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      const data = {
        username: evt.target.elements[0].value,
        password: evt.target.elements[1].value,
      };

      dispatch(loginUser(data));
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
)(LoginPage);
