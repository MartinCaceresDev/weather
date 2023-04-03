
/**
 * 
 * @param {Array} locations - Receives an array with locations and saves it in local storage.
 */

export const saveLocationsInLocalStorage = (locations) => {

  localStorage.clear()

  localStorage.setItem('lastLocations', JSON.stringify(locations));

};