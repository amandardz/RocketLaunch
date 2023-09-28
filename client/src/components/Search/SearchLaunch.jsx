import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_LAUNCH } from '../../utils/mutations';
import { storeLaunchIds, getStoredLaunchIds } from '../../utils/localStorage';
import Auth from '../../utils/auth';
import SearchForm from './SearchForm';
import SearchCard from './SearchCard';
import Container from '../Container/Container';
import NavBar from '../NavBar/NavBar';
import Credentials from '../../pages/Credentials';

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
      `https://ll.thespacedevs.com/2.2.0/location/?country_code=${country}&search=${state}`
    );

    if (!locationResponse.ok) {
      throw new Error('something went wrong!');
    }

    const { results } = await locationResponse.json();

    if (results.count === 0) {
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
      `https://ll.thespacedevs.com/2.2.0/launch/?mode=detailed&launcher_config__id=${locationIds}&window_start__gte=${startDate}&window_end__lte=${endDate}`
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
      start_date: new Date(launch.window_start).toLocaleString('en-US'),
      end_date: new Date(launch.window_end).toLocaleString('en-US'),
      videos: getVideo(launch.vidURLs),
    }));
    
    setSearchedLaunches(launchData);
  };

  const handleSaveLaunch = async (launchId) => {
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
      {!Auth.loggedIn() ? (
        <>
          <Container className='text-white text-center bg-space-blue'>
            Please log in to search for launches.
          </Container>
          <Credentials />
        </>
      ) : (
        <>
          <NavBar />
          <SearchForm getLocationData={getLocationData} />
          {searchedLaunches.length ? (
          <Container className='h-100 bg-space-blue mt-2 mx-auto flex flex-row justify-evenly flex-wrap md:w-11/12 rounded-md'>
            <SearchCard
              launchResults={searchedLaunches}
              handleSaveLaunch={handleSaveLaunch}
            />

          </Container>
          ) : (
            <Container className='mt-5 text-white flex justify-center bg-space-blue'>
              Please enter Search Critiera
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default SearchLaunch;
