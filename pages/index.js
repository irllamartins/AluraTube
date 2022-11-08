import config from"../config.json"
import styled from "styled-components"
function HomePage() {
    return( 
    <div>
        <Menu/>
        <Header/>
        <TimeLine/>
    </div>
    )
  }
  
  export default HomePage

  function Menu() {
    return( 
    <div>
        
    </div>
    )
  }
  
const styledHeader = styled.div`
img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-infor{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
  function Header() {
    return( 
    <styledHeader>
        <img src="banner"/>
        <section className="user-info">
        <img src={`https://github.com/${config.github}.png`}/>
        <div>
            <h2>{config.name}</h2>
            <p>{config.job}</p>
        </div>   
        </section>
        
    </styledHeader>
    )
  }

  function TimeLine() {
    return( 
    <div>Welcome to TimeLine!</div>
    )
  }
  