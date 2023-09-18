import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap'

import { fetchHero } from "../libs/utils";
import Auth from '../libs/auth'
import { saveHero  } from '../libs/userForms';
import { saveHeroIds, getSavedHeroIds } from '../libs/localStorage';

export default function HeroDetails() {
  let { id } = useParams();

  const [hero, setHero] = useState();
  const [savedHeroIds, setSavedHeroIds] = useState(getSavedHeroIds())
  
  useEffect(() => {
    return () => saveHeroIds(savedHeroIds);
  });

  let name;
  let description;
  let thumbnailPath;
  let thumbnailExtension;
  let thumbnailUrl;
  let series;

  useEffect(() => {
    fetchHero(id)
      .then((data) => setHero(data))
      .catch((err) => console.error(err));
  }, []);

  if (hero) {
    name = hero.data.results[0].name;
    description = hero.data.results[0].description;
    thumbnailPath = hero.data.results[0].thumbnail.path;
    thumbnailExtension = hero.data.results[0].thumbnail.extension;
    thumbnailUrl = `${thumbnailPath}.${thumbnailExtension}`;
    series = hero.data.results[0].series.items;
  }

  if (!hero) return;

  const handleSaveHero = async (heroId) => {
    // find the book in `searchedBooks` state by the matching id
    const heroToSave = hero.find((hero) => hero.heroId === heroId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveHero(heroToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedHeroIds([...savedHeroIds, heroToSave.heroId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container large">
      <div className="hero__details-container">
        <img src={thumbnailUrl} alt="hero image full size" />
        <div className="hero__details">
          <h4>Name</h4>
          <p>{name}</p>
          {Auth.loggedIn() && (
            <Button
              disabled={savedHeroIds?.some((savedHeroId) => savedHeroId === hero.heroId)}
              className='btn-block btn-info'
              onClick={() => handleSaveHero(hero.heroId)}>
                {savedHeroIds?.some((savedHeroId) => savedHeroId === hero.heroId)
                  ? 'This hero has already been saved!'
                  : 'Favorite this Hero!'}
            </Button>
          )}
          {description ? (
            <>
              <h4>Description</h4>
              <p>{description}</p>
            </>
          ) : null}
          <div className="hero__series">
            <h4>Series</h4>
            <ul>
              {series.length
                ? series.map((title) => (
                    <li key={Math.random() * 1000}>{title.name}</li>
                  ))
                : <li key={Math.random() * 1000}>Not Part of Any Series</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
