import { StyledRegisterVideo } from "./styles"
import React from "react"
import { createClient } from '@supabase/supabase-js'

//custom hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            //console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}
const PROJECT_URL = "https://ubdmnintdshkstbwkuks.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZG1uaW50ZHNoa3N0YndrdWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMjg0OTcsImV4cCI6MTk4MzkwNDQ5N30.WYxDSpsC96yKUhFKp5sQpODZg6luVqN3_8aXafLQ2HI"
const supabase = createClient(PROJECT_URL,PROJECT_KEY )

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });
     const [formVisivel, setFormVisivel] = React.useState(false);
    
    return (
        <StyledRegisterVideo>

            <button type="button" className="add-video" onClick={()=>setFormVisivel(true)} >
                +
            </button>
            {
                formVisivel
                    ? (
                        <form onSubmit={(evento)=>{
                            evento.preventDefault();
                            supabase.from("video").insert({
                                title: formCadastro.values.titulo,
                                url: formCadastro.values.url,
                                thumb: getThumbnail(formCadastro.values.url),
                                playlists: "jogos",
                             })
                             .then((oqueveio) => {
                                console.log(oqueveio);
                             })
                             .catch((err) => {
                                console.log(err);
                             })
    
                            setFormVisivel(false);
                            formCadastro.clearForm();
                        }}>
                            <div>
                                <button className="close-modal" onClick={()=>setFormVisivel(false)} >
                                    X
                                </button>
                                <input
                                 placeholder="Titulo do video" 
                                 name="Titulo"
                                 value={formCadastro.values.titulo}
                                  onChange={formCadastro.handleChange}/>
                                <input 
                                placeholder="URL" 
                                name="URL"
                                value={formCadastro.values.url}
                                 onChange={formCadastro.handleChange}/>
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