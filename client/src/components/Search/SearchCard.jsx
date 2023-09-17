import Card from '../Card/Card';

const SearchCard = ({ launchResults, handleSaveLaunch}) => {
  const handleBtnClick = (launchId) => {
    handleSaveLaunch(launchId);
  };

  return (
    <Card>
      {launchResults ? launchResults.map((launch) => {
        return (
          <>
            <div key={launch.launchId}>
              <h1>{launch.launch_name}</h1>
              <p>{launch.location}</p>
              <p>{launch.start_date}</p>
              <p>{launch.end_date}</p>
              <p>{launch.videos}</p>
            </div>
            <button onClick={() => handleBtnClick(launch.launchId)}> 
            Save
            </button>
          </>
        );
      }): 'No launch found with that Search Critiera'}
    </Card>
  );
};

export default SearchCard;
