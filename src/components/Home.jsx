import React from 'react';
import bannerImg from '../assets/img/banner.png';
import aboutUsImg from '../assets/img/about_us.png';
import contentImg from '../assets/img/content.png';
import supplies1Img from '../assets/img/supplies_1.png';
import supplies2Img from '../assets/img/supplies_2.png';

import { Link } from 'react-router-dom';
import '../assets/css/home.scss';

const Home = () => (
  <React.Fragment>
    <section className="relative">
      <img src={bannerImg} alt="" />
      <Link className="link-banner" to="/detail">Donate now</Link>
    </section>
    <section>
      <img src={contentImg} alt="" />
      <img src={aboutUsImg} alt="" />
      <img src={supplies1Img} alt="" />
      <img src={supplies2Img} alt="" />
    </section>
  </React.Fragment>
);

export default Home;
