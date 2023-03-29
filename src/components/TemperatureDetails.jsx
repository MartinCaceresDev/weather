import { useSelector } from 'react-redux';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { weatherCodes } from '../utils';
import { currentWeatherSelector, dailyDataSelector, hourlyDataSelector, weatherSelector } from '../store/weatherSlice';


export const TemperatureDetails = () => {

  const { temperature = 0, weathercode = 0, windspeed = 0 } = useSelector(currentWeatherSelector);
  const { sunrise, sunset, temperature_2m_max, temperature_2m_min } = useSelector(dailyDataSelector);
  const { apparent_temperature, relativehumidity_2m } = useSelector(hourlyDataSelector);
  const { localeTime } = useSelector(weatherSelector);

  return (
    <>
      <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        {!isNaN(weathercode) && <p>{weatherCodes[`${weathercode}`].description}</p>}
      </div>

      <div className='flex flex-row items-center justify-between sm:justify-center text-white py-3 mb-3 px-2'>
        <div className='flex flex-col items-center justify-between sm:justify-end sm:flex-row w-1/3 sm:w-1/2'>
          <img
            src={((Number(new Date(localeTime).getHours()) >= 19 || Number(new Date(localeTime).getHours()) < 6))
              && (weathercode < 3)
              ? weatherCodes[`${weathercode}`].nightURL
              : weatherCodes[`${weathercode}`].url}
            alt={weatherCodes[`${weathercode}`].description}
            className='sm:w-20 w-14'
          />
          <p className='text-2xl sm:text-5xl sm:ml-8 sm:mr-20'>{temperature}°</p>
        </div>

        <div className='flex flex-col space-y-2 items-center w-2/3 sm:w-1/2'>
          <div className='flex font-light text-sm items-center justify-center'>
            <DeviceThermostatIcon className='mr-1' />
            Real fell: <span className='font-medium ml-1'>{apparent_temperature[Number(new Date(localeTime).getHours())]}°</span>
          </div>
          <div className='flex font-light text-sm items-center justify-center'>
            <WaterIcon className='mr-1' />
            Humidity: <span className='font-medium ml-1'>{relativehumidity_2m[Number(new Date(localeTime).getHours())]}%</span>
          </div>
          <div className='flex font-light text-sm items-center justify-center'>
            <AirIcon className='mr-1' />
            Wind: <span className='font-medium ml-1'>{windspeed} km/h</span>
          </div>
        </div>
      </div>


      <div className='grid grid-cols-2 grid-flow-col gap-y-3 justify-items-center grid-rows-2 sm:flex sm:flex-row items-center justify-between lg:justify-center space-x-2 lg:space-x-4 text-white text-sm py-3'>

        <div className='flex flex-col sm:flex-row items-center justify-center'>
          <LightModeIcon />
          <p className='font-light'>&nbsp;Rise:
            <span className='font-medium ml-1'>{sunrise[0].slice(-5).concat(' AM')}</span>
          </p>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-center'>
          <NightlightIcon />
          <p className='font-light'>&nbsp;Set:
            <span className='font-medium ml-1'>{sunset[0].slice(-5).concat(' PM')}</span>
          </p>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-center'>
          <ArrowUpwardIcon />
          <p className='font-light'>High:
            <span className='font-medium ml-1'>{temperature_2m_max[0]}°</span>
          </p>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-center'>
          <ArrowDownwardIcon />
          <p className='font-light'>Low:
            <span className='font-medium ml-1'>{temperature_2m_min[0]}°</span>
          </p>
        </div>
      </div>
    </>
  )
}
