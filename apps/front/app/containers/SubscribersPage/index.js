import React, { useEffect, memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Delete, Add } from '@material-ui/icons';
import { Input } from '@material-ui/core';
import saga from './saga';
import reducer from './reducer';
import {
  loadSubscribers,
  removeSubscriber,
  sortingBy,
  filterByPhone,
  loadMore,
} from './actions';
import { makeSelectSubscribers, makeSelectQuery } from './selectors';
import messages from './messages';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const key = 'subscribersPage';

export function SubscribersPage({
  loading,
  error,
  subscribers,
  query,
  onPageOpened,
  removeSubscriberClick,
  sortingByClick,
  loadMoreClick,
  searchPhoneChange,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => onPageOpened(query), []);
  const classes = useStyles();

  // @todo: extract to paging block
  let loadMoreBlock = '';
  console.log(query.paging.limit)
  console.log(subscribers.length)
  if (query.paging.limit <= subscribers.length) {
    loadMoreBlock = (
      <div className={classes.seeMore}>
        <Button color="primary" onClick={loadMoreClick}>
          See more orders
        </Button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Title>Subscribers</Title>
      <div className={classes.seeMore}>
        <Link color="primary" to="/subscribers/new">
          <Add />
        </Link>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell id="id" onClick={sortingByClick}>
              ID
            </TableCell>
            <TableCell id="created_at" onClick={sortingByClick}>
              Created At
            </TableCell>
            <TableCell id="phone" onClick={sortingByClick}>
              Phone
            </TableCell>
            <TableCell id="locale" onClick={sortingByClick}>
              Language
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>&nbsp;</TableCell>
            <TableCell colSpan={1}>
              <Input type="calendar" placeholder="search by date..." />
            </TableCell>
            <TableCell colSpan={2}>
              <Input
                type="number"
                placeholder="search by phone..."
                onChange={searchPhoneChange}
                value={query.filter.phone}
              />
            </TableCell>
          </TableRow>
          {subscribers.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <Button id={row.id} onClick={removeSubscriberClick}>
                  <Delete />
                </Button>
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.created_at}</TableCell>
              <TableCell>
                <Link to={`/subscribers/${row.id}`}>{row.phone}</Link>
              </TableCell>
              <TableCell>{row.locale}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loadMoreBlock}
    </React.Fragment>
  );
}

SubscribersPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  subscribers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onPageOpened: PropTypes.func,
  removeSubscriberClick: PropTypes.func,
  sortingByClick: PropTypes.func,
  loadMoreClick: PropTypes.func,
  searchPhoneChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  subscribers: makeSelectSubscribers(),
  query: makeSelectQuery(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onPageOpened: query => {
      dispatch(loadSubscribers(query));
    },
    removeSubscriberClick: evt => {
      // @todo: throttling & disabling
      if (confirm('Are you sure?')) {
        dispatch(removeSubscriber(evt.target.id));
      }
    },
    sortingByClick: evt => {
      console.log('[sortingByClick] target field => ', evt.target.id);
      dispatch(sortingBy(evt.target.id));
    },
    searchPhoneChange: evt => {
      dispatch(filterByPhone(evt.target.value));
    },
    loadMoreClick: evt => {
      dispatch(loadMore());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(SubscribersPage);
