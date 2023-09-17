import { useState } from 'react';
import SearchForm from '../components/Search/SearchForm';
import SearchCard from '../components/Search/SearchCard';
import Card from '../components/Card/Card';

const SearchLaunch = () => {
  const [searchedLaunches, setSearchedLaunches] = useState([]);

  const getLocationData = async (country, state, startDate, endDate) => {
    const locationIdsArr = [];

    const locationResponse = await fetch(
      `https://ll.thespacedevs.com/2.2.0/location/?country_code=${country}&name__contains=${state}`
    );

    if (!locationResponse.ok) {
      throw new Error('something went wrong!');
    }

    const { results } = await locationResponse.json();

    if (results.length === 0) {
      return 'No data available with that search criteria';
    } else {
      for (let i = 0; i < results.length; i++) {
        locationIdsArr.push(results[i].id);
      }
    }

    getLaunchData(locationIdsArr, startDate, endDate);
  };

  const getLaunchData = async (locationIdsArr, startDate, endDate) => {
    const locationIds = locationIdsArr.join();
    const launchReponse = await fetch(
      `https://ll.thespacedevs.com/2.2.0/launch/?mode=detailed&launcher_config__id=${locationIds}&window_end__lte=${endDate}&window_start__gte=${startDate}`
    );

    if (!launchReponse.ok) {
      throw new Error('something went wrong!');
    }

    const { results } = await launchReponse.json();

    const getVideo = (vidURLs) => {
      const videoLinks = [];
      if (vidURLs.length) {
        vidURLs.forEach((video) => {
          console.log('video', video);
          videoLinks.push(video.url);
        });
      } else {
        videoLinks.push('No videos available');
      }
      return videoLinks;
    };

    const launchData = results.map((launch) => ({
      launchId: launch.id,
      launch_name: launch.name,
      location: launch.pad.location.name,
      start_date: launch.window_start,
      end_date: launch.window_end,
      videos: getVideo(launch.vidURLs),
    }));

    setSearchedLaunches(launchData);
  };

  return (
    <>
      <SearchForm getLocationData={getLocationData} />
      {searchedLaunches.length?<SearchCard launchResults={searchedLaunches}/> : <Card>Please enter Search Critiera</Card>}
      
    </>
  );
};

export default SearchLaunch;
