export const getStoredLaunchIds = () => {
  const savedLaunchIds = localStorage.getItem('saved_launches')
    ? JSON.parse(localStorage.getItem('saved_launches'))
    : [];

  return savedLaunchIds;
};

export const storeLaunchIds = (launchIdArr) => {
  if (launchIdArr.length) {
    localStorage.setItem('saved_launches', JSON.stringify(launchIdArr));
  } else {
    localStorage.removeItem('saved_launches');
  }
};