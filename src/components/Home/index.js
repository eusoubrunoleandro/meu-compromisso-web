import React, {useState} from 'react';
import '../../styles/Main.css';
import imgLogo from '../../assets/logo-igreja.svg'
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../../Services/api';

function Home()
{
    const [ styleMessage, setStyleMessage ] = useState("response");
    const [messageInscricao, setMessageInscricao] =useState();
    const [handleBtnConfirm, setHandleBtnConfirm] = useState("Confirma presença");
    function handleSubmit(data)
    {
        setHandleBtnConfirm("Salvando dados")
        const {complete_name, city} = data;
        api.post("/cursopregacao/add", {
            complete_name: complete_name,
            city: city
        })
        .then(response => {
            const { message, status, erro } = response.data;
            if(status != "ok")
            {
                setStyleMessage("response erro")
                console.log(erro)
            }
            setHandleBtnConfirm("Salvando dados")
            setMessageInscricao(message)
        })
        .catch(error => {
            setStyleMessage("response erro")
            setMessageInscricao("Erro inesperado!")
        })
    }
    return(
        <div id="app">
            <figure className="logo">
                <img src={imgLogo}/>
            </figure>
            <h1 className="title">Curso de pregação</h1>
            <Form onSubmit={handleSubmit} method="post">
                <div className="box-form">
                    <div className="fields-form">
                        <label for="complete_name">Nome completo <em>*</em></label>
                        <Input name="complete_name" required/>
                    </div>
                    <div className="fields-form">
                        <label for="city">Cidade <em>*</em></label>
                        <Input name="city" list="churc-list" required/>
                        <datalist id="churc-list">
                            <option>Comodoro</option>
                            <option>Noroagro</option>
                            <option>Campos de Júlio</option>
                            <option>Consquista do Oeste</option>
                            <option>Nova lacerda</option>
                            <option>Santa Helina</option>
                        </datalist>
                    </div>
                    <div className="fields-form">
                        <button type="submit">{handleBtnConfirm}</button>
                    </div>
                    <div className={styleMessage}>{messageInscricao}</div>
                </div>
            </Form>
        </div>
    )
}
export default Home;