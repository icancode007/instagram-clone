import React from 'react';
import {
  navBrand,
  navCompas,
  navHeart,
  navIcon,
  navProfile,
  searchIcon,
} from './assets';
import './style.scss';

const Nav = () => {
  return (
    <div className='nav-wrapper'>
      <nav>
        <div className='nav-item'>
          <img src={navIcon} alt='ig-icon-camera' />
          <span className='icon-divider'>|</span>
          <img src={navBrand} alt='ig-logo-icon' />
        </div>
        <div className='nav-item'>
          <input placeholder='Search' />
          <span className='search-icon'>
            <img src={searchIcon} alt='ig-search-icon' />
          </span>
        </div>
        <div className='nav-item'>
          <img src={navCompas} alt='g-icon-compas' />
        </div>
        <div className='nav-item'>
          <img src={navHeart} alt='ig-icon-heart' />
        </div>
        <div className='nav-item'>
          <img src={navProfile} alt='ig-icon-profile' />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
