import Container from '../Container/Container';
import NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_LAUNCH } from '../../utils/mutations';
import { removeLaunchId } from '../../utils/localStorage';

import Auth from '../../utils/auth';
import Credentials from '../../pages/Credentials';
import SearchLaunch from '../Search/SearchLaunch';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const [removeLaunch, { error }] = useMutation(REMOVE_LAUNCH);

  const userData = data?.user || {};

  const handleUsername = (username) => {
    const capializedName = username.charAt(0).toUpperCase() + username.slice(1);
    return capializedName;
  };

  const handleVideo = (videoLink) => {
    const pattern = /[^=]*.$/gm;
    const videoId = videoLink[0].match(pattern);
    const embedVideoLink = `https://www.youtube.com/embed/${videoId}?mute=1`;
    return embedVideoLink;
  };

  const handleDeleteLaunch = async (launchId) => {
    const token = Auth.loggedIn ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeLaunch({
        variables: { launchId },
      });

      removeLaunchId(launchId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!Auth.loggedIn() ? (
        <>
          <Container className='text-white text-center'>
            Please log in to access Dashboard.
          </Container>
          <Credentials />
        </>
      ) : (
        <>
          <NavBar />
          <Container className='bg-space-blue mt-2 w-10/12 m-auto rounded-md'>
            <Container className='p-7 flex flex-col items-center justify-center'>
              <Container className='text-center text-white text-2xl font-medium'>
                <div className='flex justify-center'>
                  <p className='mr-2'>Welcome,</p>
                  <p>
                    <FontAwesomeIcon
                      icon={faUserAstronaut}
                      style={{ color: '#ffffff' }}
                      className='mr-2'
                    />
                    Astronaut{' '}
                    {userData.username ? handleUsername(userData.username) : ''}{' '}
                  </p>
                </div>
                <p>Here you will find all of the launches you've saved:</p>
              </Container>
              <Container>
                {!userData.savedLaunches ||
                userData.savedLaunches.length === 0 ? (
                  <>
                    <p className='text-orange text-xl text-center'>
                      There are no launches saved. Search for a launch to begin.
                    </p>
                  </>
                ) : (
                  userData.savedLaunches.map((savedLaunch) => {
                    return (
                      <Container
                        key={savedLaunch.launchId}
                        className='bg-white mt-2 p-4 rounded-md'
                      >
                        <iframe
                          title={savedLaunch.launch_name}
                          className='m-auto'
                          src={handleVideo(savedLaunch.videos)}
                        ></iframe>
                        <div className='flex flex-col justify-between text-center'>
                          <div>
                            <p className='font-bold'>
                              {savedLaunch.launch_name}
                            </p>
                            <p className='italic'>{savedLaunch.location}</p>
                          </div>
                          <p>
                            <span className='font-bold'>Start</span>:{' '}
                            {new Date(
                              parseInt(savedLaunch.start_date)
                            ).toLocaleString('en-US')}
                          </p>
                          <p>
                            <span className='font-bold'>End</span>:{' '}
                            {new Date(
                              parseInt(savedLaunch.end_date)
                            ).toLocaleString('en-US')}
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            handleDeleteLaunch(savedLaunch.launchId)
                          }
                        >
                          Delete Launch
                        </Button>
                      </Container>
                    );
                  })
                )}
              </Container>
            </Container>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default Dashboard;
