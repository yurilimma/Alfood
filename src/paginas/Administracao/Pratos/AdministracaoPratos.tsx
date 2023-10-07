import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
    const navegate = useNavigate();
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() =>{
        http.get<IPrato[]>('pratos/')
        .then((resposta) =>{
            setPratos(resposta.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    }, []);

    const excluir = (pratoExcluido: IPrato) =>{
        //http://localhost:8000/api/v2/pratos/
        
        http.delete(`pratos/${pratoExcluido.id}/`)
        .then((resposta) =>{
            const listaPrato = pratos.filter(prato => prato.id !== pratoExcluido.id)
            setPratos([...listaPrato])
            alert("Pestaurante excluido!")
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
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                {pratos.map((prato) => (
                    <TableRow
                    key={prato.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {prato.nome}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {prato.descricao}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {prato.tag}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <a href={prato.imagem} target="blank">ver imagem</a>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="primary" onClick={() => navegate(`/admin/pratos/${prato.id}`)}>
                                    Editar
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos