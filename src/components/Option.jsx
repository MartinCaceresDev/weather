import { useDispatch, useSelector } from "react-redux";
import { getChosenCityForecast, setLocations, selectWeatherState } from "../store";
import { saveLocationsInLocalStorage } from "../helpers";

export const Option = ({ option, setOptionsVisible, setTypedCity }) => {

  const dispatch = useDispatch();
  const { lastLocations } = useSelector(selectWeatherState);

  const onOptionSelection = ({ name, country, latitude, longitude, id, utc_offset_seconds }) => {
    setOptionsVisible(false);
    setTypedCity('');

    // update last locations in state and local storage
    let lastLocationsCopy = lastLocations.concat();
    lastLocationsCopy = lastLocationsCopy.filter(location => location.id !== id);
    lastLocationsCopy.unshift({ name, country, latitude, longitude, id, utc_offset_seconds });
    lastLocationsCopy.length > 6 && lastLocationsCopy.pop();
    dispatch(setLocations(lastLocationsCopy));
    saveLocationsInLocalStorage(lastLocationsCopy);

    // query data of chosen city
    dispatch(getChosenCityForecast({ latitude, longitude }));
  };

  return (
    <article
      onClick={() => onOptionSelection(option)}
      className='cursor-pointer py-3'
    >
      <span className='font-semibold text-sky-900 text-lg'>
        {option.name},
      </span>
      <span className='text-xs'>
        {' '}{option.admin1}, {option.country || option.country_code}
      </span>
    </article>
  )
}
