import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
    const navegate = useNavigate();

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() =>{
        http.get<IRestaurante[]>('restaurantes/')
        .then((resposta) =>{
            setRestaurantes(resposta.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    }, []);

    const excluir = (restauranteExcluido: IRestaurante) =>{
        //http://localhost:8000/api/v2/restaurantes/
        
        http.delete(`restaurantes/${restauranteExcluido.id}/`)
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
                        <TableCell>
                            Excluir
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
                            <Button variant="outlined" color="primary" onClick={() => navegate(`/admin/restaurante/${restaurante.id}`)}>
                                        Editar
                                </Button>
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