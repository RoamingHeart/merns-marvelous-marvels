export const getSavedHeroIds = () => {
  const savedHeroIds = localStorage.getItem('saved_heroes')
    ? JSON.parse(localStorage.getItem('saved_heroes'))
    : [];

  return savedHeroIds;
};

export const saveHeroIds = (heroIdArr) => {
  if (heroIdArr.length) {
    localStorage.setItem('saved_heroes', JSON.stringify(heroIdArr));
  } else {
    localStorage.removeItem('saved_heroes');
  }
};

export const removeHeroId = (heroId) => {
  const savedHeroIds = localStorage.getItem('saved_heroes')
    ? JSON.parse(localStorage.getItem('saved_heroes'))
    : null;

  if (!savedHeroIds) {
    return false;
  }

  const updatedSavedHeroIds = savedHeroIds?.filter((savedHeroId) => savedHeroId !== heroId);
  localStorage.setItem('saved_heroes', JSON.stringify(updatedSavedHeroIds));

  return true;
};
