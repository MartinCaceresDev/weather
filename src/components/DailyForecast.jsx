import { useSelector } from "react-redux"
import { dailyDataSelector } from "../store"
import { weatherCodes } from "../utils";


export const DailyForecast = () => {

  const { temperature_2m_max, temperature_2m_min, weathercode, time: times } = useSelector(dailyDataSelector);

  return (
    <div className='p-2 sm:p-4 lg:px-16'>
      <div className='flex items-center justify-start my-2'>
        <p className='text-white font-medium uppercase'>Daily forecast:</p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-row items-center justify-between text-white'>

        {times.length > 4 && times.slice(1, 6).map((time, index) => (
          <div className='flex flex-col items-center justify-center' key={time}>
            <p className='font-light text-sm'>
              {new Date(time).toUTCString().slice(0, 3)}
            </p>
            <img
              src={weathercode.length > 4 ? (weatherCodes[weathercode[index]].url || weatherCodes[0].url) : weatherCodes[0].url}
              alt={weathercode.length > 4 ? weatherCodes[weathercode[index]].description : weatherCodes[0].description}
              className='w-9 sm:w-12 my-1'
            />
            <p className='font-medium text-sm flex flex-col sm:flex-row items-center justify-center'>
              <span className='sm:hidden text-xs font-light'>min</span>
              <span>{temperature_2m_min[index + 1]}°</span>
              <span className='hidden sm:inline'>/</span>
              <span className='sm:hidden text-xs font-light mt-2'>max</span>
              <span>{temperature_2m_max[index + 1]}°</span>
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}
