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

export const removeLaunchId = (launchId) => {
  const savedLaunchIds = localStorage.getItem('saved_launches')
    ? JSON.parse(localStorage.getItem('saved_launches'))
    : null;

  if (!savedLaunchIds) {
    return false;
  }

  const updatedSavedLaunchIds = savedLaunchIds?.filter((savedLaunchId) => savedLaunchId !== launchId);
  localStorage.setItem('saved_launches', JSON.stringify(updatedSavedLaunchIds));

  console.log(updatedSavedLaunchIds);
};