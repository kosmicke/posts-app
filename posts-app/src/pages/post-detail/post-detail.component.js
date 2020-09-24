import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-detail.component.css'

class PostDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            post: null,
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if (!userData) {
            this.setState({ redirectTo: "/login" })
        } else {
            let postId = this.props.match.params.id
            this.loadPost(postId)
        }
    }

    async loadPost(postId) {
        try {
            let res = await postsService.getOne(postId)
            this.setState({ post: res.data.data[0] })
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar post.")
        }
    }

    async deletePost(postId) {
        
        if (!window.confirm("Deseja realmente excluir este post?")) return;

        try {
            await postsService.delete(postId)
            alert("Post excluído com sucesso")
            this.props.history.replace('/post-list')
        } catch (error) {
            console.log(error);
            alert("Não foi excluir o post.")
        }
    }

    render() {
        if (this.state.redirectTo) {
            return (
                <Redirect to={this.state.redirectTo} />
            )
        }
        return (
            <div className="container">

                <PageTop title='Post' desc='Detalhes do post'>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                </PageTop>

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
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.deletePost(this.state.post.id)}>
                                Excluir
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.history.push('/post-edit/' + this.state.post.id)}>
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default PostDetail