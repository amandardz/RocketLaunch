import Container from '../Container/Container';
import Button from '../Button/Button';

const SearchCard = ({ launchResults, handleSaveLaunch }) => {
  const handleBtnClick = (launchId) => {
    handleSaveLaunch(launchId);
  };

  const handleVideo = (videoLink) => {
    const pattern = /[^=]*.$/gm;
    const videoId = videoLink[0].match(pattern);
    const embedVideoLink = `https://www.youtube.com/embed/${videoId}?mute=1`;
    return embedVideoLink;
  };

  return launchResults?.map((launch) => (
    <>
      <Container className='w-5/12 bg-white m-1 p-2 rounded-md flex flex-col items-center'>
        <iframe
          className='m-auto aspect-square md:aspect-auto'
          title={launch.launch_name}
          src={handleVideo(launch.videos)}
        ></iframe>

        <div className='flex flex-col text-center'>
          <div>
            <p className='font-bold'>{launch.launch_name}</p>
            <p className='italic'>{launch.location}</p>
          </div>
          <p>
            <span className='font-bold'>Start</span>: {launch.start_date}
          </p>
          <p>
            <span className='font-bold'>End</span>: {launch.end_date}
          </p>
        </div>
        <Button onClick={() => handleBtnClick(launch.launchId)}>Save</Button>
      </Container>
    </>
  ));
};

export default SearchCard;
