import Button from '../Button/Button';
import Card from '../Card/Card';

const SearchCard = ({ launchResults, handleSaveLaunch }) => {
  const handleBtnClick = (launchId) => {
    console.log('searchCard', launchId)
    handleSaveLaunch(launchId);
  };

  return launchResults?.map(launch =>
    <>
      <Card key={launch.launchId}>
        <h1>{launch.launch_name}</h1>
        <p>{launch.location}</p>
        <p>{launch.start_date}</p>
        <p>{launch.end_date}</p>
        <p>{launch.videos}</p>
      <Button onClick={() => handleBtnClick(launch.launchId)}>Save</Button>
      </Card>
    </>)
};

export default SearchCard;
