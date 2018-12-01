import React from 'react';
import headerImg from '../assets/img/header.png';

import { Link } from 'react-router-dom';
import '../assets/css/banner.scss';

const Navigation = () => (
  <header className="relative">
    <img src={headerImg} alt=""/>
    <Link className="link-brand" to="/">Brand</Link>
    <Link className="link-home" to="/">Home</Link>
  </header>
);

export default Navigation;
