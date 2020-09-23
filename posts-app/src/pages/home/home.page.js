import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/auth.service';

class Home extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            redirectTo : null
        }
    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(!userData){
            this.setState({redirectTo : "/login"})
        }
    }

    render(){

        if(this.state.redirectTo){
            return (
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
           <div className="container">
                <div className="page-top">
                    <div className="page-top__title">
                        <h2>Home</h2>
                        <p>Tela inicial do sistema</p>
                    </div>
                </div>
           </div>
        )
    }
    
}

export default Home