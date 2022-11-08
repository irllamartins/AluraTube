import config from "../config.json"
import styled from "styled-components"
function HomePage() {

  console.log(config.playlists)
  return (
    <div>
      <Menu />
      <Header />
      <TimeLine playlists={config.playlists} />
    </div>
  )
}

export default HomePage

function Menu() {
  return (
    <div>

    </div>
  )
}

const StyledHeader = styled.div`
img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner"/>*/}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>

    </StyledHeader>
  )
}

function TimeLine(props) {
  const playlistNames = Object.keys(props.playlists);

  //Statement
  //Retorno por expressão
  return (
    <div>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists(playlistName);
        console.log(videos);
        return videos.map(() => {
          return (
            <section>
              <h2>
                {playlistName}
              </h2>
              <div>

                <a href={videos.url}>
                  <img src={videos.thumbs} />
                </a>
                <span>
                  {videos.title}
                </span>
              </div>
            </section>
          )
        })
      })}

    </div>
  )
}
