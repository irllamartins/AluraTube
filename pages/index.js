import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { createClient } from '@supabase/supabase-js'
import { videoService } from "../src/services/videoService";


function HomePage() {
    const service = videoService();
    const [valorDoFiltro,setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
      /*  supabase.from("video")
            .select("*")
            .then((dados) => {
          
           
            dados.data.forEach(
                (video) => {
               playlists[video.playlists]?.push(video);
                }
            )
            setPlaylists(playlists);
        });*/
   service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
              
                const novasPlaylists = {};
                dados.data?.forEach(
                    (video) => {
                    if (!novasPlaylists[video.playlists]){
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
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <Timeline searchValue={valorDoFiltro } playlists={playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({theme})=> theme.backgroundLevel1};
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
                            {videos.filter((video)=>{
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = props.searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized )
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