import react from "react"
import { ThemeProvider } from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import ColorModeProvider,{ColorModeContext} from "../src/components/Menu/components/ColorMode";
const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};
function MyApp({ Component, pageProps }) {
    const contexto = React.useContext(ColorModeContext)
    //colorModeProvide responsavel por mandar o status de cor
    //ThemeProvider responsavel por passar o objeto com cores para os demais componentes
    return (
        <ColorModeProvider>
            <ThemeProvider theme={theme.dark}>
                <CSSReset />
                <Component {...pageProps} />
            </ThemeProvider >
        </ColorModeProvider>
    )
}
export default MyApp;