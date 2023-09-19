import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_LAUNCH } from '../../utils/mutations';
import { storeLaunchIds, getStoredLaunchIds } from '../../utils/localStorage';
import Auth from '../../utils/auth';
import SearchForm from './SearchForm';
import SearchCard from './SearchCard';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';

const SearchLaunch = () => {
  const [searchedLaunches, setSearchedLaunches] = useState([]);

  const [savedLaunchIds, setSavedLaunchIds] = useState(getStoredLaunchIds());

  const [saveLaunch, { error }] = useMutation(SAVE_LAUNCH);

  useEffect(() => {
    return () => storeLaunchIds(savedLaunchIds);
  });

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

  const handleSaveLaunch = async (launchId) => {
    console.log('launch', launchId);
    const launchToSave = searchedLaunches.find(
      (launch) => launch.launchId === launchId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveLaunch({
        variables: { launchData: { ...launchToSave } },
      });
      
      setSavedLaunchIds([...savedLaunchIds, launchToSave.launchId]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <SearchForm getLocationData={getLocationData} />
      {searchedLaunches.length ? (
        <SearchCard
          launchResults={searchedLaunches}
          handleSaveLaunch={handleSaveLaunch}
        />
      ) : (
        <Card>Please enter Search Critiera</Card>
      )}
    </>
  );
};

export default SearchLaunch;
