import React from 'react';

import block from '../../../helpers/bem-cn';
import Nav from '../Nav/Nav';

import './Header.css';

const b = block('j-header');

const Header = () => (
  <header className={b}>
    <div className={b('col', { left: true })}>
      <span className={b('logo')} />
    </div>
    <div className={b('col', { middle: true })}>
      <Nav />
    </div>
    <div className={b('col', { right: true })}>
        Lorem ipsum
    </div>
  </header>
);

export default Header;