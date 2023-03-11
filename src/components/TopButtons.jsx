import { useDispatch, useSelector } from "react-redux";
import { getWeatherForecast, setLocations, weatherSelector } from "../store";
import { saveLocationsInLocalStorage } from "../utils";


export const TopButtons = () => {
  const dispatch = useDispatch();
  const { lastLocations } = useSelector(weatherSelector);

  const handleLocation = ({ name, country, latitude, longitude, id, utc_offset_seconds }) => {
    let lastLocationsCopy = lastLocations.concat();
    lastLocationsCopy = lastLocationsCopy.filter(location => location.id !== id);
    lastLocationsCopy.unshift({ name, country, latitude, longitude, id, utc_offset_seconds });
    lastLocationsCopy.length > 6 && lastLocationsCopy.pop();

    dispatch(setLocations(lastLocationsCopy));
    dispatch(getWeatherForecast({ latitude, longitude }));
    saveLocationsInLocalStorage(lastLocationsCopy);
  }

  return (
    <div className='grid gap-y-2 grid-cols-2 grid-rows-2 sm:flex items-center justify-between sm:justify-around my-2 sm:mt-6 sm:mb-10 flex-wrap sm:flex-nowrap px-1 sm:px-0'>
      {lastLocations.slice(1).map((location) => (
        <button
          key={location.id}
          className='text-white text-sm sm:text-lg font-medium last:hidden'
          onClick={() => handleLocation(location)}
        >
          {location.name}
        </button>
      ))}
    </div>
  )
}