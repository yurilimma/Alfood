import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() =>{
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
        .then((resposta) =>{
            setRestaurantes(resposta.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    }, []);

    const excluir = (restauranteExcluido: IRestaurante) =>{
        //http://localhost:8000/api/v2/restaurantes/
        
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluido.id}/`)
        .then((resposta) =>{
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id)
            setRestaurantes([...listaRestaurante])
            alert("Restaurante excluido!")
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {restaurantes.map((restaurante) => (
                    <TableRow
                    key={restaurante.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/admin/restaurantes/${restaurante.id}`}> editar</Link>]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                
            </Table>

        </TableContainer>
    )
}

export default AdministracaoRestaurantes