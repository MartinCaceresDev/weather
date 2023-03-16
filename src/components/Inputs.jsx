import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { getNamesAndCoords, setOptionsVisible } from '../store';
import { Option } from '.';


export const getOrderedOptions = (possibleOptions) => {
  const uniqueCountryOptions = [];
  const repeatedCountryOptions = [];
  possibleOptions.forEach(option => {
    let included = false;
    for (const unique of uniqueCountryOptions) {
      if (unique.country === option.country) included = true;
    };
    included ? repeatedCountryOptions.push(option) : uniqueCountryOptions.push(option);
  });
  return uniqueCountryOptions.concat(repeatedCountryOptions);
};


export const Inputs = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { possibleOptions, optionsVisible, isPending } = useSelector(state => state.weatherStore);

  const [typedCity, setTypedCity] = useState('');
  const [options, setOptions] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (typedCity.length > 2) {
      dispatch(getNamesAndCoords(typedCity.trim()));
      dispatch(setOptionsVisible(true));
    }
  };

  useEffect(() => {
    // One city per country will appear first. 
    const orderedOptions = getOrderedOptions(possibleOptions);

    orderedOptions?.length > 0
      ? setOptions(orderedOptions.map(option => (
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
    <div className='px-2 my-6 w-full max-w-md mx-auto'>
      <form onSubmit={onSubmit} className='relative w-full flex flex-row justify-center items-center text-2xl'>
        <input
          type='text'
          className='w-11/12 sm:w-80 text-md sm:placeholder:text-md sm:text-lg h-12 placeholder:lowercase font-light p-2 focus:outline-none shadow-xl capitalize'
          placeholder='Search for city...'
          onChange={e => setTypedCity(e.target.value)}
          value={typedCity}
          ref={inputRef}
        />
        <div className='flex items-center justify-center h-12 w-1/12 sm:w-12 sm:absolute ml-2 sm:ml-0 sm:-right-2 top-0'>
          <SearchIcon onClick={onSubmit} className='text-white cursor-pointer transition ease-out hover:scale-125' />
        </div>

        {(options && optionsVisible && !isPending)
          && (
            <div id='options' className='max-h-96 overflow-y-auto absolute top-10 left-0 sm:left-auto w-full sm:w-80 flex flex-col bg-slate-300 text-black p-2 sm:p-5 divide-y-2 divide-black/5'>
              {options}
            </div>
          )
        }
      </form>
    </div>
  )
}
