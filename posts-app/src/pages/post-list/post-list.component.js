import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
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

                <PageTop title='Posts' desc='Listagem dos posts'>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/post-add')}>
                        Adicionar
                    </button>
                </PageTop>

                {this.state.posts.map(post => (
                    <Link to={"/post-detail/" + post.id} key={post.id}>
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