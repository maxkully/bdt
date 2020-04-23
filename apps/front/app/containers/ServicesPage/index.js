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
import { makeSelectLoading, makeSelectErrors } from 'containers/App/selectors';
import Wrapper from 'components/List/Wrapper';
import { makeSelectServices } from './selectors';
import messages from './messages';
import { loadServices, removeService, enableService } from './actions';
import reducer from './reducer';
import saga from './saga';
import CommonTable from '../../components/CommonTable';

const key = 'services';

export function ServicesPage({
  loading,
  errors,
  services,
  onPageOpened,
  removeServiceClick,
  enableServiceClick,
  match,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => onPageOpened(), []);

  let actions = [];
  let callBack = false;
  if (match.params.id) {
    // @todo: find solution for icons
    actions = [
      {
        icon: '+',
        tooltip: 'Enable service',
        onClick: (event, rowData) =>
          enableServiceClick(rowData.id, match.params.id),
      },
    ];
  } else {
    callBack = removeServiceClick;
  }

  const columns = [
    { title: 'Title', field: 'title', render: row => <Link to={`/services/${row.id}`}>{row.title}</Link> },
    { title: 'Created At', field: 'created_at', type: 'date' },
  ];

  let servicesContent = <React.Fragment />;
  if (services.length) {
    servicesContent = <CommonTable columns={columns} data={services} onRowDelete={callBack} actions={actions} />
  }

  return (
    <React.Fragment>
      <Link to="/services/new">
        <FormattedMessage {...messages.new} />
      </Link>
      {servicesContent}
      <Helmet>
        <title>Services List</title>
        <meta name="description" content="Services List" />
      </Helmet>
    </React.Fragment>
  );
}

ServicesPage.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  services: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onPageOpened: PropTypes.func,
  removeServiceClick: PropTypes.func,
  enableServiceClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
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
      dispatch(removeService(evt));
    },
    // eslint-disable-next-line camelcase
    enableServiceClick: (service_id, subscriber_id) => {
      // @todo: throttling & disabling
      dispatch(enableService({ service_id, subscriber_id }));
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
