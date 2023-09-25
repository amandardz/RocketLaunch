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

  const handleDate = (start, end) => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const startDate = new Date(parseInt(start)).toLocaleDateString(
      'en-US',
      options
    );
    const endDate = new Date(parseInt(end)).toLocaleDateString(
      'en-US',
      options
    );
    if (startDate === endDate) {
      return startDate;
    }
    return `${startDate} - ${endDate}`;
  };

  return launchResults?.map((launch) => (
    <>
      <Container className='w-5/12 bg-white m-1 p-2 rounded-md flex flex-col items-center'>
        <iframe
          className='m-auto aspect-square md:aspect-auto'
          title={launch.launch_name}
          src={handleVideo(launch.videos)}
        ></iframe>

        <div className='flex flex-col md:flex-row justify-between'>
          <div>
            <p className='font-bold'>{launch.launch_name}</p>
            <p className='italic'>{launch.location}</p>
          </div>
          <p>{handleDate(launch.start_date, launch.end_date)}</p>
        </div>
        <Button onClick={() => handleBtnClick(launch.launchId)}>
          Save
        </Button>
      </Container>
    </>
  ));
};

export default SearchCard;
