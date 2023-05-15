import React from 'react';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import Typography from './components/Typography/Typography';
import UserCards from './components/UserCards/UserCards';
import Form from './components/Form/Form';
import Section from './components/Section/Section';
import { sectionIds } from './constants/sectionIds';

function App() {
  return (
    <>
      <Header />

      <main>
        <Section id={sectionIds.usersSection}>
          <Typography as='h2' design='heading'>
            Working with GET request
          </Typography>
          <UserCards />
          <Button>Show more</Button>
        </Section>

        <Section id={sectionIds.formSection}>
          <Form id='registerForm' />
        </Section>
      </main>
    </>
  );
}

export default App;
