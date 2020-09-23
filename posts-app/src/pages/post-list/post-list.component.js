import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-list.component.css'

class PostList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if (!userData) {
            this.setState({ redirectTo: "/login" })
        } else {
            this.loadPosts()
        }
    }

    async loadPosts() {
        try {
            let res = await postsService.list()
            this.setState({ posts: res.data.data })
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os posts.")
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
                <div className="page-top">
                    <div className="page-top__title">
                        <h2>Posts</h2>
                        <p>Listagem dos posts</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-primary">
                            Adicionar
                        </button>
                    </div>
                </div>
                {this.state.posts.map(post => (
                    <Link to={"/post-detail/" + post.id}>
                        <div className="post-card">
                            <div className="post-card__img">
                                <img src={post.imageUrl}/>
                            </div>
                            <div className="post-card__text">
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

}

export default PostList;