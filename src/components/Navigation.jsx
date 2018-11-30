import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/list">List</Link></li>
      <li><Link to="/detail">Detail</Link></li>
      <li><Link to="/approve">Approve</Link></li>
    </ul>
  </div>
);

export default Navigation;
