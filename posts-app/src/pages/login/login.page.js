import React, { useCallback, useRef, useState } from 'react';
import AlertModal from '../../components/alert-modal/alert-modal.component';
import authService from '../../services/auth.service';

const Login = (props) => {

    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);

    const alertModal = useRef();

    // const sendLogin = async (event) => {
    //     event.preventDefault();

    //     const data = {
    //         nickName : userName,
    //         password : password
    //     }

    //     if(!data.nickName || data.nickName == ""){
    //         setAlertMessage("Nome de usuário é obrigatório")
    //         alertModal.current.toggleShow(true)
    //         return;
    //     }

    //     if(!data.password || data.password == ""){
    //         setAlertMessage("Senha é obrigatória")
    //         alertModal.current.toggleShow(true)
    //         return;
    //     }

    //     try {
    //         let res = await authService.sendLogin(data)
    //         authService.setLoggedUser(res.data.data)
    //         props.onLogin();
    //         props.history.replace("/")
    //     } catch (error) {
    //         console.log(error)
    //         setAlertMessage("Não foi possível efetuar o login.")
    //         alertModal.current.toggleShow(true)
    //     }

    // }

    const sendLogin = useCallback((event) => {
        event.preventDefault();

        const data = {
            nickName : userName,
            password : password
        }

        if(!data.nickName || data.nickName == ""){
            setAlertMessage("Nome de usuário é obrigatório")
            alertModal.current.toggleShow(true)
            return;
        }

        if(!data.password || data.password == ""){
            setAlertMessage("Senha é obrigatória")
            alertModal.current.toggleShow(true)
            return;
        }

        authService.sendLogin(data)
            .then(res => {
                authService.setLoggedUser(res.data.data)
                props.onLogin();
                props.history.replace("/")
            })
            .catch(error => {
                console.log(error)
                setAlertMessage("Não foi possível efetuar o login.")
                alertModal.current.toggleShow(true)
            })
            

    })

    const closeModal = () => {
        setAlertMessage( null );
        alertModal.current.toggleShow(false)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                <form onSubmit={sendLogin}>
                    <div className="form-group">
                        <label htmlFor="userName">Nome de usuário</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="userName" 
                            placeholder="Insira seu nome de usuário" 
                            value={userName}
                            onChange={e => setUserName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Insira sua senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </form>
                </div>
            </div>
            <AlertModal 
                ref={alertModal}
                title="Atenção" 
                onCancel={() => closeModal()}
                onConfirm={() => closeModal()}>
                {alertMessage}
            </AlertModal>
        </div>
    )
    
}

export default Login