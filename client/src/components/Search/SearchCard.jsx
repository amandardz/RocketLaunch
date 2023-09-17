import Card from '../Card/Card';

const SearchCard = ({ launchResults }) => {
  return (
    <Card>
      {launchResults ? launchResults.map((launch) => {
        return (
          <>
            <div id={launch.launchId}>
              <h1>{launch.launch_name}</h1>
              <p>{launch.location}</p>
              <p>{launch.start_date}</p>
              <p>{launch.end_date}</p>
              <p>{launch.videos}</p>
            </div>
          </>
        );
      }): 'No launch found with that Search Critiera'}
    </Card>
  );
};

export default SearchCard;
