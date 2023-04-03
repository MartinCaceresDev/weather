import { useSelector } from "react-redux"
import { selectDailyData } from "../store"
import { codesList } from "../helpers";


export const NextDaysForecast = () => {

  const { temperature_2m_max, temperature_2m_min, weathercode: dailyWeatherCodes, time: times } = useSelector(selectDailyData);

  return (
    <div className='p-2 sm:p-4 lg:px-16'>
      <div className='flex items-center justify-start my-2'>
        <p className='text-white font-medium uppercase'>Next days</p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-row items-center justify-between text-white'>

        {/* Next days forecast - starting from index 2 (day after tomorrow) */}
        {times.length > 4 && times.slice(2, 7).map((time, dayIndex) => (
          <div className='flex flex-col items-center justify-center' key={time}>
            <p className='font-light text-sm'>
              {new Date(time).toUTCString().slice(0, 3)}
            </p>

            {/* From codesList we display the specific weather code belonging to the proper day (dailyWeatherCodes(dayIndex)) */}
            <img
              src={dailyWeatherCodes.length > 4 ? (codesList[dailyWeatherCodes[dayIndex]].url || codesList[0].url) : codesList[0].url}
              alt={dailyWeatherCodes.length > 4 ? codesList[dailyWeatherCodes[dayIndex]].description : codesList[0].description}
              title={dailyWeatherCodes.length > 4 ? codesList[dailyWeatherCodes[dayIndex]].description : codesList[0].description}
              className='w-9 sm:w-12 my-1'
            />
            <p className='font-medium text-sm flex flex-col sm:flex-row items-center justify-center'>
              <span className='sm:hidden text-xs font-light'>min</span>
              <span>{temperature_2m_min[dayIndex + 2]}°</span>
              <span className='hidden sm:inline'>/</span>
              <span className='sm:hidden text-xs font-light mt-2'>max</span>
              <span>{temperature_2m_max[dayIndex + 2]}°</span>
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}
