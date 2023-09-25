import Container from '../Container/Container';
import Button from '../Button/Button';
import { useState } from 'react';

const SearchForm = ({ getLocationData }) => {
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
  };

  return (
    <Container className='mx-auto my-2 bg-space-blue md:w-7/12 rounded-md'>
      <form className='flex flex-col items-center p-1' onSubmit={handleFormSubmit}>
        <div>
          <div>
            <div className='flex flex-col items-center'>
              <label className='text-xl text-white mb-2' htmlFor='location'>
                Search by Location
              </label>
              <div>
                <input
                  className='rounded-md placeholder: italic mr-2'
                  type='text'
                  name='state'
                  value={searchInput.state.toUpperCase()}
                  onChange={handleInputChange}
                  placeholder='State Abbreviation'
                  required
                />
                <input
                  className='rounded-md placeholder: italic'
                  type='text'
                  name='country'
                  value={searchInput.country.toUpperCase()}
                  onChange={handleInputChange}
                  placeholder='Country Abbreviation'
                  required
                />
              </div>
            </div>
            <div className='mt-2 w-full flex justify-around'>
              <label className='text-xl text-white mr-5' htmlFor='start-date'>
                Start Date
              </label>
              <input
                className='rounded-md placeholder: italic'
                type='date'
                name='start_date'
                value={searchInput.start_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='mt-2 w-full flex justify-around'>
              <label className='text-xl text-white mr-5' htmlFor='end-date'>
                End Date
              </label>
              <input
                className='rounded-md placeholder: italic'
                type='date'
                name='end_date'
                value={searchInput.end_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button className='blueBtn text-white' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SearchForm;
