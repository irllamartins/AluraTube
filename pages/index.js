import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { createClient } from '@supabase/supabase-js'
import { videoService } from "../src/services/videoService";
import Footer from "../src/components/Rodape"

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {

        service
            .getAllVideos()
            .then((dados) => {
                //console.log(dados.data);

                const novasPlaylists = {};
                dados.data?.forEach(
                    (video) => {
                        if (!novasPlaylists[video.playlists]) {
                            novasPlaylists[video.playlists] = [];
                        }
                        novasPlaylists[video.playlists] = [
                            video,
                            ...novasPlaylists[video.playlists],
                        ];
                    });

                setPlaylists(novasPlaylists);
            });
    }, []);

    console.log(playlists)
    return (
        <>

            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists}>
                    Conteúdo
                </Timeline>
                <Favoritos searchValue={valorDoFiltro} favoritos={config.favoritos}/>
                <Footer />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(props) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(props.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = props.searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

const StyledFavotites = styled.div`
  width: 100%;
  padding: 16px;
  overflow: hidden;
  align-items: center;
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
 
 
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    font-weight: 500;
    object-fit: cover;
    //width: 100%;
    //max-width: 210px;
   height: auto;
    border-radius: 50%;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 20px;
    background-color:  ${({ theme }) => theme.backgroundLevel1};
    div {
      
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      padding-bottom: 24px;
      a {
        scroll-snap-align: start;
        padding: 6px;
        
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: ${({ theme }) => theme.backgroundLevel2} ${({ theme }) => theme.backgroundBase};
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    height: 6px;
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.backgroundLevel2};
    border-radius: 10px;
    border: 3px solid transparent;
  }
  `;

function Favoritos(props) {
    const favorites = Object.keys(props.favoritos);
    //console.log(favorites);
    return (
        <StyledFavotites>
            {favorites.map((usersFavorites) => {
                const users = props.favoritos[usersFavorites];
                
                console.log(users);
                return (
                    <section key={usersFavorites} className="user-infor">
                        <h2>{usersFavorites}</h2>
                        <div>
                            {users.filter((user) => {
                                const titleNormalized = user.name.toLowerCase();
                                const searchValueNormalized = props.searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((user) => {
                                return (
                                    <a key={user.name} >
                                         <img src={`https://github.com/${user.github}.png`} />
                                        <span>
                                            {user.name}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledFavotites>
    )
}