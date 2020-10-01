import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-detail.component.css'

const PostDetail = ({ history }) => {

    let [post, setPost] = useState(null);
    let [redirectTo, setRedirectTo] = useState(null);
    let {id} = useParams()

    useEffect(() => {

        const loadPost = async (postId) => {
            try {
                let res = await postsService.getOne(postId)
                setPost(res.data.data[0])
            } catch (error) {
                console.log(error);
                alert("Não foi possível carregar post.")
            }
        }

        let userData = authService.getLoggedUser();
        if (!userData) {
            setRedirectTo("/login")
        } else {
            loadPost(id)
        }
        
    }, [])

    const deletePost = async (postId) => {

        if (!window.confirm("Deseja realmente excluir este post?")) return;

        try {
            await postsService.delete(postId)
            alert("Post excluído com sucesso")
            history.replace('/post-list')
        } catch (error) {
            console.log(error);
            alert("Não foi excluir o post.")
        }

    }

    if (redirectTo) {
        return (
            <Redirect to={redirectTo} />
        )
    }

    return (
        <div className="container">

            <button onClick={() => setPost(Math.random())}> Atualizar</button>

            <PageTop title='Post' desc='Detalhes do post'>
                <button className="btn btn-light" onClick={() => history.goBack()}>
                    Voltar
                </button>
            </PageTop>

            <div className="row">
                <div className="col-6">
                    <img className="post-img" src={post?.imageUrl} alt="image" />
                </div>
                <div className="col-6">
                    <div className="post-info">
                        <h4>ID</h4>
                        <p>{post?.id}</p>
                    </div>
                    <div className="post-info">
                        <h4>Título</h4>
                        <p>{post?.title}</p>
                    </div>
                    <div className="post-info">
                        <h4>Conteúdo</h4>
                        <p>{post?.content}</p>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deletePost(post.id)}>
                            Excluir
                            </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => history.push('/post-edit/' + post.id)}>
                            Editar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostDetail;
