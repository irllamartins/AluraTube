import { StyledRegisterVideo } from "./styles"
import React from "react"

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const [values, setValues] = React.useState({titulo:"",url:""});
    return (
        <StyledRegisterVideo>

            <button className="add-video" onClick={()=>setFormVisivel(true)} >
                +
            </button>
            {
                formVisivel
                    ? (
                        <form>
                            <div>
                                <button className="close-modal" onClick={()=>setFormVisivel(false)} >
                                    X
                                </button>
                                <input placeholder="Titulo do video" value={values.titulo} onChange={(evento)=>
                                   {
                                     const value = evento.target.value;
                                     setValues({
                                        ...values,
                                        titulo: value,
                                     })
                                }

                                }/>
                                <input placeholder="URL" value={values.url}/>
                                <button type="submit">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    )
                    : false
            }


        </StyledRegisterVideo>
    )
}