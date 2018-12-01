import React from 'react';
import Navigation from './components/Navigation';
import bannerImg from 'assets/img/banner.png';
import aboutUsImg from 'assets/img/about_us.png';
import supplies1Img from 'assets/img/supplies_1.png';
import supplies2Img from 'assets/img/supplies_2.png';
import footerImg from 'assets/img/footer.png';

import 'normalize.css';
import 'styles/index.scss';

const App = () => (
  <div className='App'>
    <Navigation/>
    <section>
      <img src="img/banner.png" alt="" />
    </section>
    <section>
      <img src={bannerImg} alt="" />
      <img src={aboutUsImg} alt="" />
      <img src={supplies1Img} alt="" />
      <img src={supplies2Img} alt="" />
      <img src={footerImg} alt="" />
    </section>
  </div>
);

export default App;
