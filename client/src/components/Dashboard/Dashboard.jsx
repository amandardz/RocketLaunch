import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_LAUNCH } from '../../utils/mutations';
import { removeLaunchId } from '../../utils/localStorage';

import Auth from '../../utils/auth';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const [removeLaunch, { error }] = useMutation(REMOVE_LAUNCH);

  const userData = data?.user || {};

  console.log(userData);

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
      <NavBar />
      <Card key={userData._id}>
        <h1>Welcome, {userData.username}</h1>
          {!userData.savedLaunches? (
            <>
              <h2>Search for a launch to begin.</h2>
              <p>The launches you save will display here.</p>
            </>
          ) : (
            userData.savedLaunches.map((savedLaunch) => {
              return (
                <Card key={savedLaunch.launchId}>
                  <p>{savedLaunch.name}</p>
                  <p>{savedLaunch.location}</p>
                  <p>{savedLaunch.start_date}</p>
                  <p>{savedLaunch.end_date}</p>
                  <p>{savedLaunch.videos}</p>
                  <Button
                    onClick={() => handleDeleteLaunch(savedLaunch.launchId)}
                  >
                    Delete Launch
                  </Button>
                </Card>
              );
            })
          )}
      </Card>
      ;
    </>
  );
};

export default Dashboard;
