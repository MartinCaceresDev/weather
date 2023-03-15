import { useSelector } from "react-redux";


export const TimeAndLocation = () => {
  const { lastLocations, localeTime } = useSelector(state => state.weatherStore);

  return (
    <>
      <p className='text-white text-lg font-extralight my-6 mx-auto text-center flex justify-center flex-col sm:flex-row'>
        {localeTime
          ? <span>{new Date(localeTime).toDateString()}</span>
          : <span>Loading...</span>
        }
        <span className='hidden sm:inline'>&nbsp;|&nbsp;</span>
        <span>Local time {localeTime
          ? new Date(localeTime).toTimeString().slice(0, 5)
          : <span>Loading...</span>}
        </span>
      </p>
      <p className='text-white text-lg sm:text-3xl font-medium my-3 text-center'>
        {lastLocations[0].name}, {lastLocations[0].country}
      </p>
    </>
  )
}
