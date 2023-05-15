import React from 'react';
import Svg from '../svg/svg';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { sectionIds } from '../../constants/sectionIds';

import './Header.scss';

function Header() {
  return (
    <header>
      <nav className='nav'>
        <div className='nav_wrap'>
          <a href='#' className='nav_link'>
            <Svg id='logo' className='logo' />
          </a>

          <div className='nav_buttons'>
            <Button as='a' href={`#${sectionIds.usersSection}`}>
              Users
            </Button>
            <Button as='a' href={`#${sectionIds.formSection}`}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <section className='description'>
        <div className='description_text'>
          <Typography as='h1' design='heading'>
            Test assignment for front-end developer
          </Typography>
          <Typography>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </Typography>
        </div>
        <Button as='a' href={`#${sectionIds.formSection}`}>
          Sign Up
        </Button>
      </section>
    </header>
  );
}

export default Header;
