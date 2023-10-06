import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');


  useEffect(()=>{
    // obter restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/') //tipagem do retorno a chamada do endpoint
    .then(resposta => {
      setRestaurantes(resposta.data.results)
      setProximaPagina(resposta.data.next)
      console.log(resposta)
    })
    .catch(erro => {
      console.log(erro)
    })
    
  }, []); // quando o segundo parâmetro do useEffect está em branco, o mesmo só é executado quando o componente monta(similar ao componentDidMount)

  
  const verMais = ()=>{
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then(resposta => {
      setRestaurantes([...restaurantes, ...resposta.data.results]) //utilizamos o spread operator para concatenar o que já está em restaurantes com o que retornou do endpoint proximaPagina
      setProximaPagina(resposta.data.next)
      console.log(resposta)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      ver mais</button>}
  </section>)
}

export default ListaRestaurantes