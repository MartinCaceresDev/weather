import { useDispatch, useSelector } from "react-redux";
import { getWeatherForecast, setLocations, weatherSelector } from "../store";
import { saveLocationsInLocalStorage } from "../utils";

export const Option = ({ option, setOptionsVisible, setTypedCity }) => {

  const dispatch = useDispatch();
  const { lastLocations } = useSelector(weatherSelector);

  const onOptionSelection = ({ name, country, latitude, longitude, id, utc_offset_seconds }) => {
    setOptionsVisible(false);
    setTypedCity('');

    let lastLocationsCopy = lastLocations.concat();
    lastLocationsCopy = lastLocationsCopy.filter(location => location.id !== id);
    lastLocationsCopy.unshift({ name, country, latitude, longitude, id, utc_offset_seconds });
    lastLocationsCopy.length > 6 && lastLocationsCopy.pop();

    dispatch(setLocations(lastLocationsCopy));
    saveLocationsInLocalStorage(lastLocationsCopy);
    dispatch(getWeatherForecast({ latitude, longitude }));
  };

  return (
    <article
      onClick={() => onOptionSelection(option)}
      className='cursor-pointer py-3'
    >
      <span className='font-semibold text-sky-900'>
        {option.name},
      </span>
      <span className='text-xs'>
        {' '}{option.admin1}, {option.country || option.country_code}
      </span>
    </article>
  )
}
