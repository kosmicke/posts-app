import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/home/home.page';
import Login from './pages/login/login.page';
import PostDetail from './pages/post-detail/post-detail.component';
import PostList from './pages/post-list/post-list.component';
import authService from './services/auth.service';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userData : null
    }
  }

  componentDidMount(){
    this.loadUserData()
  }
  
  loadUserData(){
    let userData = authService.getLoggedUser()
    if(userData){
      this.setState({ userData : userData })
    }
  }

  logout(){
    authService.clearLoggedUser();
    window.location.reload();
  }

  render(){
    return(
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">Home</Link>
                <Link to="/post-list" className="nav-item nav-link">Posts</Link>
              </div>
              {(this.state.userData) ? (
                <div className="nav-user">
                  <div className="nav-user__info">
                    <h4>{this.state.userData.user.name}</h4>
                    <p>{this.state.userData.user.email}</p>
                  </div>
                  <button className="btn btn-outline-dark" onClick={e => this.logout()}>Sair</button>
                </div>
              ) : null}
            </div>
          </nav>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/login" component={props => <Login {...props} onLogin={() => this.loadUserData()}/>}/>
            <Route path="/post-list" component={PostList}/>
            <Route path="/post-detail/:id" component={PostDetail}/>
          </Switch>
        </BrowserRouter>
    )
  }

}

export default App;
