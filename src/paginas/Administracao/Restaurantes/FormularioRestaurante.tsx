import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    
    const parametros = useParams();
    useEffect(()=> {
        if(parametros.id){
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
            .then((resposta)=>{
                console.log(resposta);
                setNomeRestaurante(resposta.data.nome);
            })
            .catch((error) =>{
                console.log(error)
            })
        }
    }, [parametros])
    
    

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); //não recarregar a pagina;

        console.log(nomeRestaurante)
        let body = {nome : nomeRestaurante}
        if(parametros.id){
            http.put(`restaurantes/${parametros.id}/`, body)
            .then(() => {
                alert("Restaurante atualizado com sucesso!")
            })
            .catch((error) =>{
                console.log(error)
            })
        }else{
            http.post('restaurantes/', body)
            .then(() => {
                setNomeRestaurante('')
                alert("Restaurante cadastrado com sucesso!")
            })
            .catch((error) =>{
                console.log(error)
            })
        }
    }

    return (
        <>
        { /* conteudo da pagina */}
        <Box sx={{display: 'flex', flexDirection:"column", alignItems:"center", flexGrow: 1}}>     
            <Typography component="h1" variant="h6">
                Formulário de Restaurantes
            </Typography>
            <Box component="form" sx={{width: '100%'}} onSubmit={aoSubmeterForm}>
                <TextField 
                value={nomeRestaurante} 
                onChange={evento => setNomeRestaurante(evento.target.value)}  
                id="standard-basic" 
                label="Nome Restaurante" 
                variant="standard" 
                fullWidth
                required/>
                <Button 
                sx={{marginTop: 1}}
                type="submit" 
                variant="outlined"
                fullWidth>Salvar</Button>
            </Box>
        </Box>
        </>
    )
}

export default FormularioRestaurante