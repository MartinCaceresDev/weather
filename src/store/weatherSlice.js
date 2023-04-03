import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { defaultCities, nameAndCoordsBaseURL, numberOfCitiesToShow } from '../helpers';


export const getCitiesOptions = createAsyncThunk('weatherStore/getCitiesOptions', async (city) => {
  try {
    const res = await fetch(nameAndCoordsBaseURL.concat(`${city}${numberOfCitiesToShow}`));
    const namesAndCoords = await res.json();
    return namesAndCoords.results;
  } catch(err){
    console.log(err);
    return { results:[] };
  }
});

export const getChosenCityForecast = createAsyncThunk('weatherStore/getChosenCityForecast', async ({ latitude, longitude })=> {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_hours,precipitation_probability_max,windspeed_10m_max,weathercode&current_weather=true`);
    const data = await res.json();
    return data;
  } catch(err){
    return err;
  }
})

// initialState contains placeholder initial data
const initialState = {
  lastLocations: defaultCities,
  possibleOptions: [],
  daily: {
    sunrise: ['06:45'],
    sunset: ['19:45'],
    temperature_2m_max: ['33.8'],
    temperature_2m_min: ['07.2'],
    time: [],
    weathercode: []
  },
  currentWeather: {temperature: '0', weathercode: '0'},
  hourly: {
    weathercode: '0',
    time: [],
    temperature_2m: ['20.2', '20.2', '20.2', '20.2', '20.2'],
    apparent_temperature: Array(24).fill('20'),
    relativehumidity_2m: Array(24).fill('30'),
  },
  isPending: true,
  localeTime: 0,
  optionsVisible: false
}

const weatherSlice = createSlice({
  name: 'weatherStore',
  initialState,
  
  reducers: {
    setLocations: (state, { payload })=>{
      state.lastLocations = payload;
    },
    setLocaleTime: (state, { payload })=>{
      state.localeTime = payload;
    },
    setOptionsVisible: (state, { payload })=>{
      state.optionsVisible = payload;
    }
  },

  extraReducers (builder){
    builder
      // Cities Options State
      .addCase(getCitiesOptions.pending, (state)=>{
        state.isPending = true;
      })
      .addCase(getCitiesOptions.fulfilled, (state, { payload })=>{        
        state.possibleOptions = payload;
        state.isPending = false;
      })
      .addCase(getCitiesOptions.rejected, (state)=>{
        console.log('error')
        state.possibleOptions = [];
      })
      // Chosen City Forecast State
      .addCase(getChosenCityForecast.pending, (state) =>{
        state.isPending = true;
      })
      .addCase(getChosenCityForecast.fulfilled, (state, { payload })=>{
        state.daily = payload.daily;
        state.hourly = payload.hourly;
        state.currentWeather = payload.current_weather;
        state.utc_offset_seconds = payload.utc_offset_seconds;
        state.isPending = false;
      })
      .addCase(getChosenCityForecast.rejected, (state)=>{
        console.log('error');
      })
  }
});

export const selectCurrentWeather = (state) => state.weatherStore.currentWeather;
export const selectDailyData = (state) => state.weatherStore.daily;
export const selectHourlyData = (state) => state.weatherStore.hourly;
export const selectWeatherState = (state) => state.weatherStore;

export const { setLocations, setLocaleTime, setOptionsVisible } = weatherSlice.actions;
export default weatherSlice.reducer;