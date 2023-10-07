import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";



const FormularioRestaurante = () => {
    
    const parametros = useParams();
    useEffect(()=> {
        if(parametros.id){
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
            .then((resposta)=>{
                console.log(resposta);
                setNomeRestaurante(resposta.data.nome);
            })
            .catch((error) =>{
                console.log(error)
            })
        }
    }, [parametros])
    
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); //não recarregar a pagina;

        console.log(nomeRestaurante)
        let body = {nome : nomeRestaurante}
        if(parametros.id){
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, body)
            .then(() => {
                alert("Restaurante astualizado com sucesso!")
            })
            .catch((error) =>{
                console.log(error)
            })
        }else{
            axios.post('http://localhost:8000/api/v2/restaurantes/', body)
            .then(() => {
                alert("Restaurante cadastrado com sucesso!")
            })
            .catch((error) =>{
                console.log(error)
            })
        }
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