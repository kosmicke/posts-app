import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-detail.component.css'

class PostDetail extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            post : null,
            redirectTo : null
        }
    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(!userData){
            this.setState({redirectTo : "/login"})
        }else{
            let postId = this.props.match.params.id
            this.loadPost(postId) 
        }
    }

    async loadPost(postId){
        try {
            let res = await postsService.getOne(postId)
            this.setState({post : res.data.data[0]})
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar post.")
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
                        <h2>Post</h2>
                        <p>Detalhes do post</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light">
                            Voltar
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <img className="post-img" src={this.state?.post?.imageUrl} alt="image" />
                    </div>
                    <div className="col-6">
                        <div className="post-info">
                            <h4>ID</h4>
                            <p>{this.state.post?.id}</p>
                        </div>
                        <div className="post-info">
                            <h4>Título</h4>
                            <p>{this.state.post?.title}</p>
                        </div>
                        <div className="post-info">
                            <h4>Conteúdo</h4>
                            <p>{this.state.post?.content}</p>
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-sm btn-outline-danger">Excluir</button>
                            <button type="button" class="btn btn-sm btn-outline-primary">Editar</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    
}

export default PostDetail