import { useSelector } from "react-redux"
import { hourlyDataSelector } from "../store"
import { weatherCodes } from "../utils";


let timesListIndexes = [7, 11, 15, 19, 23];

export const HourlyForecast = () => {

  const { weathercode, time: times, temperature_2m } = useSelector(hourlyDataSelector);

  return (
    <div className='p-2 sm:p-4 lg:px-16'>
      <div className='flex items-center justify-start my-2'>
        <p className='text-white font-medium uppercase'>Hourly forecast:</p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-row items-center justify-between text-white'>

        {times.length > 4 && timesListIndexes.map(timeIndex => (
          <div className='flex flex-col items-center justify-center' key={times[timeIndex]}>
            <p className='font-light text-sm'>
              {timeIndex} {timeIndex < 12 ? 'AM' : 'PM'}
            </p>
            <img
              // src={weathercode.length > 4 ? weatherCodes[weathercode[timeIndex]].url : weatherCodes[0].url}
              src={timeIndex >= 19 && (weathercode[timeIndex] < 3) ? weatherCodes[weathercode[timeIndex]].nightURL : weatherCodes[weathercode[timeIndex]].url}
              alt={weathercode.length > 4 ? weatherCodes[weathercode[timeIndex]].description : weatherCodes[0].description}
              title={weathercode.length > 4 ? weatherCodes[weathercode[timeIndex]].description : weatherCodes[0].description}
              className='w-9 sm:w-12 my-1'
            />
            <p className='font-medium text-sm'>{temperature_2m[timeIndex]}°</p>
          </div>
        ))}

      </div>
    </div>
  )
}
