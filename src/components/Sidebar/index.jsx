import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';

const Sidebar = () => {
  return (
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    <div className='sidebarContainer'>
      <Menu right >
        <Link className='sidebar-link' to='/'>Beranda</Link>
        <Link className='sidebar-link' to='/about'>Tentang Sekolah</Link>
        <Link className='sidebar-link' to='/service'>Informasi</Link>
        <Link className='sidebar-link' to='/gallery'>Hubungi Kamu</Link>
        <Link className="sidebar-link" to="/portfolio">Login</Link>
      </Menu>
    </div>
  );
}

export default Sidebar;
