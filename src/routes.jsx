import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './app';
// import About from './components/About';
// import Sample from './components/Sample';


import List from './components/List';
import Detail from './components/Detail';
import Approve from './components/Approve';

import 'styles/index.scss';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/list" component={List}/>
      <Route path="/detail" component={Detail}/>
      <Route path="/deligate" component={Approve}/>
    </div>
  </Router>
);

export default Routes;
