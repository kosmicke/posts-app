import React from 'react';
import AlertModal from '../../components/alert-modal/alert-modal.component';
import authService from '../../services/auth.service';

class Login extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            userName : "",
            password : "",
            alertMessage : null
        }

        this.alertModal = React.createRef()
    }

   async sendLogin(event){
        event.preventDefault();

        const data = {
            nickName : this.state.userName,
            password : this.state.password
        }

        if(!data.nickName || data.nickName == ""){
            this.setState({alertMessage : "Nome de usuário é obrigatório"})
            this.alertModal.current.toggleShow(true)
            return;
        }

        if(!data.password || data.password == ""){
            this.setState({alertMessage : "Senha é obrigatória"})
            this.alertModal.current.toggleShow(true)
            return;
        }

        try {
            let res = await authService.sendLogin(data)
            authService.setLoggedUser(res.data.data)
            this.props.onLogin();
            this.props.history.replace("/")
        } catch (error) {
            console.log(error)
            this.setState({alertMessage : "Não foi possível efetuar o login."})
            this.alertModal.current.toggleShow(true)
        }

    }

    closeModal(){
        this.setState({alertMessage : null });
        this.alertModal.current.toggleShow(false)
    }

    render(){
        return (
           <div className="container">
               <div className="card">
                   <div className="card-body">
                   <form onSubmit={e => this.sendLogin(e)}>
                        <div className="form-group">
                            <label htmlFor="userName">Nome de usuário</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="userName" 
                                placeholder="Insira seu nome de usuário" 
                                value={this.state.userName}
                                onChange={e => this.setState({userName : e.target.value})}/>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Insira sua senha"
                                value={this.state.password}
                                onChange={e => this.setState({password : e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Entrar</button>
                    </form>
                   </div>
               </div>
               <AlertModal 
                    ref={this.alertModal}
                    title="Atenção" 
                    onCancel={() => this.closeModal()}
                    onConfirm={() => this.closeModal()}>
                    {this.state.alertMessage}
               </AlertModal>
           </div>
        )
    }
    
}

export default Login