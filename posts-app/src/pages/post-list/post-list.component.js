import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import postsService from '../../services/posts.service';
import './post-list.component.css'

const PostList = (props) => {

    const [posts, setPost] = useState([])
    const [redirectTo, setRedirectTo] = useState(null)
    const [search, setSearch] = useState("")

    // useEffect(()=> {
    //     let userData = authService.getLoggedUser();
    //     if (!userData) {
    //         setRedirectTo("/login")
    //     } else {
    //         loadPosts()
    //     }
    // }, [])

    // useEffect(()=> {
    //     if(search != ""){
    //         console.log("called")
    //         loadPosts({search})
    //     }else{
            //     loadPosts()
            // }
    // }, [search])

    // useEffect(()=> {
    //     const timeOutId = setTimeout(() => {
    //         if(search != ""){
    //             console.log("called")
    //             loadPosts({search})
    //         }else{
    //             loadPosts()
    //         }
    //     }, 500)
    //     return () => {
    //         clearTimeout(timeOutId)
    //     }
    // }, [search])

    useEffect(()=> {
        
        let userData = authService.getLoggedUser();
        if (!userData) {
            setRedirectTo("/login")
            return;
        }

        const timeOutId = setTimeout(() => {
            if(search != ""){
                console.log("called")
                loadPosts({search})
            }else{
                loadPosts()
            }
        }, 500)
        return () => {
            clearTimeout(timeOutId)
        }
        
    }, [search])

    const loadPosts = async (query) => {
        try {
            let res = await postsService.list(query)
            setPost(res.data.data)
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os posts.")
        }
    }

    if (redirectTo) {
        return (
            <Redirect to={redirectTo} />
        )
    }

    return (
        <div className="container">

            <PageTop title='Posts' desc='Listagem dos posts'>
                <button className="btn btn-primary" onClick={() => props.history.push('/post-add')}>
                    Adicionar
                </button>
            </PageTop>

            <div className="form-group">
            <label htmlFor="search">Pesquisar</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="search" 
                    placeholder="Comece a digitar para pesquisar" 
                    value={search}
                    onChange={e => setSearch(e.target.value)}/>
            </div>

            {posts.map(post => (
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

export default PostList;