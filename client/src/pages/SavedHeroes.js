import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { getMe, deleteHero } from '../libs/userForms';
import Auth from '../libs/auth';
import { removeHeroId } from '../libs/localStorage';

const SavedHeroes = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the hero's mongo _id value as param and deletes the book from the database
  const handleDeleteHero = async (heroId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteHero(heroId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove hero's id from localStorage
      removeHeroId(heroId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved heroes!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedHeroes.length
            ? `Viewing ${userData.savedHeroes.length} saved ${userData.savedHeroes.length === 1 ? 'hero' : 'heroes'}:`
            : 'You have no saved heroes!'}
        </h2>
        <Row>
          {userData.savedHeroes.map((hero) => {
            return (
              <Col md="4">
                <Card key={hero.heroId} border='dark'>
                  {hero.image ? <Card.Img src={hero.image} alt={`The cover for ${hero.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{hero.title}</Card.Title>
                    <p className='small'>Authors: {hero.authors}</p>
                    <Card.Text>{hero.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteHero(hero.heroId)}>
                      Banish This Hero to the Shadow Realm!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedHeroes;
