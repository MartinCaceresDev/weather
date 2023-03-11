import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { getNamesAndCoords, setOptionsVisible } from '../store';
import { Option } from '.';


export const Inputs = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { possibleOptions, optionsVisible, isPending } = useSelector(state => state.weatherStore);

  const [typedCity, setTypedCity] = useState('');
  const [options, setOptions] = useState(null);

  const onSearch = () => {
    if (typedCity.length > 2) {
      dispatch(getNamesAndCoords(typedCity));
      dispatch(setOptionsVisible(true));
    }
  };

  useEffect(() => {
    possibleOptions?.length > 0
      ? setOptions(possibleOptions.map(option => (
        <Option option={option} setOptionsVisible={setOptionsVisible} setTypedCity={setTypedCity} key={option.id} />
      )))
      : setOptions(
        <article className='text-red-500 font-semibold text-center'>No encontramos una ciudad con ese nombre.</article>
      );
  }, [possibleOptions]);

  useEffect(() => {
    !typedCity && inputRef.current.focus();
  })

  return (
    <div className='relative flex flex-row px-2 justify-between sm:justify-center items-center my-6 w-full max-w-md mx-auto'>
      <input
        type='text'
        className='w-5/6 sm:w-80 text-md sm:placeholder:text-md sm:text-xl h-10 placeholder:lowercase font-light p-2 focus:outline-none shadow-xl capitalize'
        placeholder='Search for city...'
        onChange={e => setTypedCity(e.target.value)}
        value={typedCity}
        ref={inputRef}
      />
      {(options && optionsVisible && !isPending)
        && (
          <div id='options' className='absolute top-10 left-0 sm:left-auto w-full sm:w-80 flex flex-col bg-slate-300 text-black p-2 sm:p-5 divide-y-2 divide-black/5'>
            {options}
          </div>
        )
      }
      <div className='flex w-1/6 absolute -right-5 top-3'>
        <SearchIcon onClick={onSearch} className='text-white cursor-pointer transition ease-out hover:scale-125' />
      </div>
    </div>
  )
}
