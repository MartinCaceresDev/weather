import { useSelector } from "react-redux"
import { selectHourlyData } from "../store"
import { codesList } from "../helpers";


let timesListIndexes = [31, 35, 39, 43, 47];

export const TomorrowForecast = () => {

  const { weathercode, time: times, temperature_2m } = useSelector(selectHourlyData);

  return (
    <div className='p-2 sm:p-4 lg:px-16'>
      <div className='flex items-center justify-start my-2'>
        <p className='text-white font-medium uppercase'>Tomorrow</p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-row items-center justify-between text-white'>

        {/* Tomorrow forecast on selected times */}
        {times.length > 4 && timesListIndexes.map(timeIndex => (
          <div className='flex flex-col items-center justify-center' key={times[timeIndex]}>
            <p className='font-light text-sm'>
              {timeIndex - 24} {(timeIndex - 24) < 12 ? 'AM' : 'PM'}
            </p>
            <img
              src={(timeIndex - 24) >= 19 && (weathercode[timeIndex] < 3) ? codesList[weathercode[timeIndex]].nightURL : codesList[weathercode[timeIndex]].url}
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
