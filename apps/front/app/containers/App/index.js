import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'containers/LoginPage';
import ServicesPage from 'containers/ServicesPage/Loadable';
import SubscribersPage from 'containers/SubscribersPage/Loadable';
import SubscriberForm from 'containers/SubscriberForm/Loadable';
import ServiceCard from 'containers/ServiceCard/Loadable';
import SubscriberCard from 'containers/SubscriberCard/Loadable';
import ServiceForm from 'containers/ServiceForm/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Big Data Technologies"
        defaultTitle="Big Data Technologies Code Exercise"
      >
        <meta
          name="description"
          content="A Big Data Technologies Code Exercise"
        />
      </Helmet>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={SubscribersPage} />
        <PrivateRoute exact path="/subscribers" component={SubscribersPage} />
        <PrivateRoute
          exact
          path="/subscribers/new"
          component={SubscriberForm}
        />
        <PrivateRoute
          exact
          path="/subscribers/:id"
          component={SubscriberCard}
        />
        <PrivateRoute
          exact
          path="/subscribers/:id/edit"
          component={SubscriberForm}
        />
        <PrivateRoute
          exact
          path="/subscribers/:id/services/enable"
          component={ServicesPage}
        />
        <PrivateRoute exact path="/services" component={ServicesPage} />
        <PrivateRoute exact path="/services/new" component={ServiceForm} />
        <PrivateRoute exact path="/services/:id" component={ServiceCard} />
        <PrivateRoute exact path="/services/:id/edit" component={ServiceForm} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
