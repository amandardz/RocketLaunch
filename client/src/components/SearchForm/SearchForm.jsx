import Card from '../Card/Card';
import { useState } from 'react';

const SearchForm = ({ getLocationData}) => {
  const [searchInput, setSearchInput] = useState({
    country: '',
    state: '',
    start_date: '',
    end_date: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    const country = searchInput.country.toUpperCase();
    const state = searchInput.state.toUpperCase();
    const startDate = new Date(searchInput.start_date).toISOString();
    const endDate = new Date(searchInput.end_date).toISOString();

    getLocationData(country, state, startDate, endDate);
  }

  return (
  <form onSubmit={handleFormSubmit}>
    <Card>
      <div>
        <label htmlFor='location'>Search by Location</label>
        <input
          type='text'
          name='state'
          value={searchInput.state}
          onChange={handleInputChange}
          placeholder='State Abbreviation'
          required
        />
        <input
          type='text'
          name='country'
          value={searchInput.country}
          onChange={handleInputChange}
          placeholder='Country Abbreviation'
          required
        />
      </div>
      <div>
        <div>
          <label htmlFor='start-date'>Start Date</label>
          <input
            type='date'
            name='start_date'
            value={searchInput.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='end-date'>End Date</label>
          <input
            type='date'
            name='end_date'
            value={searchInput.end_date}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <button type='submit'>Submit</button>
    </Card>
  </form>
  )
};

export default SearchForm;
