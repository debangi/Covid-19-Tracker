import { FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log('country code:', countryCode);
    setCountry(countryCode);
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>Covid-19 Tracker</h1>
        <FormControl className='app__dropdown' value='abc'>
          <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='app__stats'>
        <InfoBox title='Coronavirus cases' total='455' cases='57658' />
        <InfoBox title='Recovered' total='678' cases='768' />
        <InfoBox title='Deaths' total='56' cases='56568' />
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
