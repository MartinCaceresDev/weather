import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextDaysForecast, TodayForecast, Inputs, TemperatureDetails, TimeAndLocation, TomorrowForecast, TopButtons } from "./components"
import { getChosenCityForecast, setLocaleTime, setLocations, setOptionsVisible, selectWeatherState } from "./store";
import { defaultCities, localeTimePayload } from "./helpers";


const getCitiesFromLocalStorage = () => JSON.parse(localStorage.getItem('lastLocations'));


export default function App() {
  const dispatch = useDispatch();
  const { lastLocations, utc_offset_seconds, optionsVisible } = useSelector(selectWeatherState);

  const clickOutsideOptions = (e) => {
    if (optionsVisible && e.target.id !== 'options') {
      dispatch(setOptionsVisible(false));
    }
  };

  useEffect(() => {
    const recentCities = getCitiesFromLocalStorage() || defaultCities;
    // display last cities chosen in navbar
    dispatch(setLocations(recentCities));

    // get and display data from last city chosen from local storage
    dispatch(getChosenCityForecast({ latitude: recentCities[0].latitude, longitude: recentCities[0].longitude }));
  }, [])

  // display locale time in chosen city
  useEffect(() => {
    if (typeof utc_offset_seconds === 'number') {
      const payload = localeTimePayload(utc_offset_seconds);
      dispatch(setLocaleTime(payload));
    }
  }, [lastLocations[0].id, utc_offset_seconds])

  return (
    <div onClick={clickOutsideOptions} className='h-full overflow-x-hidden sm:mx-auto w-full pt-5 pb-10 sm:px-20 md:px-28 lg:px-48 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-sm shadow-gray-400'>
      <TopButtons />
      <Inputs />
      <TimeAndLocation />
      <TemperatureDetails />
      <TodayForecast />
      <TomorrowForecast />
      <NextDaysForecast />
    </div>
  );
};