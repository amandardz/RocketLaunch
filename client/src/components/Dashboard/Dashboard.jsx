import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import Button from '../Button/Button';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.user || {};
  console.log(userData);
  return (
    <>
      <NavBar />
      <Card>
        <h1>Welcome {userData.username}</h1>
      </Card>;
    </>
  );
};

export default Dashboard;
