import React from 'react';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import { sectionIds } from './constants/sectionIds';
import Typography from './components/Typography/Typography';
import UserCards from './components/UserCards/UserCards';
import Form from './components/Form/Form';
import UserContextProvider from './components/UserContextProvider/UserContextProvider';

function App() {
  return (
    <>
      <Header />

      <main>
        <UserContextProvider>
          <Section id={sectionIds.usersSection}>
            <Typography as='h2' design='heading'>
              Working with GET request
            </Typography>
            <UserCards />
          </Section>

          <Section id={sectionIds.formSection}>
            <Form id='registerForm' />
          </Section>
        </UserContextProvider>
      </main>
    </>
  );
}

export default App;
