import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import List from './components/List';
import Detail from './components/Detail';
import DetailConfirm from './components/DetailConfirm';
import DetailForDao from './components/DetailForDao';
import Approve from './components/Approve';

import './assets/css/app.scss';

const Routes = () => (
  <Router>
    <div className='App'>
      <Navigation/>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/list" component={List}/>
        <Route path="/detail" component={Detail}/>
        <Route path="/detail-confirm" component={DetailConfirm}/>
        <Route path="/detail-dao" component={DetailForDao}/>
        <Route path="/deligate" component={Approve}/>
      </div>
      <Footer />
    </div>
  </Router>
);

export default Routes;
