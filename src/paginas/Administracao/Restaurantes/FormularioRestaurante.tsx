import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";



const FormularioRestaurante = () => {
    
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); //não recarregar a pagina;
        console.log(' preciso enviar dados para api: ')
        console.log(nomeRestaurante)
        let body = {nome : nomeRestaurante}
        axios.post('http://localhost:8000/api/v2/restaurantes/', body)
        .then(() => {
            alert("Restaurante cadastrado com sucesso!")
        })
        .catch((error) =>{
            console.log(error)
        })

    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField 
            value={nomeRestaurante} 
            onChange={evento => setNomeRestaurante(evento.target.value)}  
            id="standard-basic" 
            label="Nome Restaurante" 
            variant="standard" />
            <Button 
            type="submit" 
            variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante