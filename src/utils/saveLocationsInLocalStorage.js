export const saveLocationsInLocalStorage = (locations) => {

  localStorage.clear()

  localStorage.setItem('lastLocations', JSON.stringify(locations));

};