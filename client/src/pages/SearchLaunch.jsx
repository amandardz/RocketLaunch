import SearchForm from '../components/SearchForm/SearchForm';

const SearchLaunch = () => {
  const getLocationData = async (country, state, startDate, endDate) => {
    const locationIdsArr = [];

    const locationData = await fetch(`https://ll.thespacedevs.com/2.2.0/location/?country_code=${country}&name__contains=${state}`);

    if (!locationData.ok) {
      throw new Error('something went wrong!');
    };

    const { results } = await locationData.json();

    if(results.length === 0) {
      return 'No data available with that search criteria';
    } else {
      for (let i = 0; i < results.length; i++) {
        locationIdsArr.push(results[i].id);
      };
    };
    
    getLaunchData(locationIdsArr, startDate, endDate);
  };

  const getLaunchData = async(locationIdsArr, startDate, endDate) => {
    const locationIds = locationIdsArr.join();
    const launchData = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/?launcher_config__id=${locationIds}&window_end__lte=${endDate}&window_start__gte=${startDate}`);
    
    if(!launchData.ok) {
      throw new Error('something went wrong!');
    };

    const { results } = await launchData.json();

    console.log(results);
  };

  return <SearchForm getLocationData={getLocationData} />;
};

export default SearchLaunch;
