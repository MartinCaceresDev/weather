import { useSelector } from "react-redux"
import { selectHourlyData } from "../store"
import { codesList } from "../helpers";


let timesListIndexes = [7, 11, 15, 19, 23];

export const TodayForecast = () => {

  const { weathercode, time: times, temperature_2m } = useSelector(selectHourlyData);

  return (
    <div className='p-2 sm:p-4 lg:px-16'>
      <div className='flex items-center justify-start my-2'>
        <p className='text-white font-medium uppercase'>Today</p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-row items-center justify-between text-white'>

        {/* Today forecast for selected times */}
        {times.length > 4 && timesListIndexes.map(timeIndex => (
          <div className='flex flex-col items-center justify-center' key={times[timeIndex]}>
            <p className='font-light text-sm'>
              {timeIndex} {timeIndex < 12 ? 'AM' : 'PM'}
            </p>
            <img
              src={timeIndex >= 19 && (weathercode[timeIndex] < 3) ? codesList[weathercode[timeIndex]].nightURL : codesList[weathercode[timeIndex]].url}
              alt={weathercode.length > 4 ? codesList[weathercode[timeIndex]].description : codesList[0].description}
              title={weathercode.length > 4 ? codesList[weathercode[timeIndex]].description : codesList[0].description}
              className='w-9 sm:w-12 my-1'
            />
            <p className='font-medium text-sm'>{temperature_2m[timeIndex]}°</p>
          </div>
        ))}

      </div>
    </div>
  )
}
