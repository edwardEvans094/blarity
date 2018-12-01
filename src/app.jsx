import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import 'normalize.css';
import 'styles/index.scss';

const App = () => (
  <div className='App'>
    <Navigation/>
    <Footer />
  </div>
);

export default App;
