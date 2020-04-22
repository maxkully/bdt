import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

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
        <meta name="description" content="A Big Data Technologies Code Exercise" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={SubscribersPage} />
        <Route exact path="/subscribers" component={SubscribersPage} />
        <Route exact path="/subscribers/new" component={SubscriberForm} />
        <Route exact path="/subscribers/:id" component={SubscriberCard} />
        <Route exact path="/subscribers/:id/edit" component={SubscriberForm} />
        <Route exact path="/subscribers/:id/services/enable" component={ServicesPage} />
        <Route exact path="/services" component={ServicesPage} />
        <Route exact path="/services/new" component={ServiceForm} />
        <Route exact path="/services/:id" component={ServiceCard} />
        <Route exact path="/services/:id/edit" component={ServiceForm} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
