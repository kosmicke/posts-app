import React from 'react';
import PageTop from '../../components/page-top/page-top.component';
import postsService from '../../services/posts.service';

class PostEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: null,
            title : '',
            content : '',
            imageUrl : ''
        }
    }

    componentDidMount(){
        if(this.props?.match?.params?.id){
            let postId = this.props.match.params.id
            this.loadPost(postId)
        }
    }

    async loadPost(postId){
        try {
            let res = await postsService.getOne(postId)
            let post = res.data.data[0]
            this.setState(post)
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar post.")
        }
    }

    async sendPost(){
        
        let data = {
            title : this.state.title,
            content : this.state.content,
            imageUrl : this.state.imageUrl,
        }

        if(!data.title || data.title === ''){
            alert("Título é obrigatório!")
            return;
        }
        if(!data.content || data.content === ''){
            alert("Conteúdo é obrigatório!")
            return;
        }
        if(!data.imageUrl || data.imageUrl === ''){
            alert("Imagem URl é obrigatório!")
            return;
        }

        try {
            if(this.state.id){
                await postsService.edit(data, this.state.id)
                alert("Post editado com sucesso!")
            }else{
                await postsService.create(data)
                alert("Post criado com sucesso!")
            }
            this.props.history.push('/post-list')
        } catch (error) {
            console.log(error)
            alert("Erro ao criar post.")
        }
    }

    render() {

        let title = this.state.id ? 'Editar Post' : 'Novo Post';
        let desc = this.state.id ? 'Editar informações de um post' : 'Formulário de criação de posts';

        return (
            <div className="container">
                <PageTop title={title} desc={desc}>
                    <button className="btn btn-light" onClick={() => this.props.history.replace('/post-list')}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.sendPost()}>
                        Salvar
                    </button>
                </PageTop>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.title}
                            onChange={e => this.setState({ title: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Conteúdo</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="content"
                            value={this.state.content}
                            rows={4}
                            style={{resize: 'none'}}
                            onChange={e => this.setState({ content: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="batata">Url da imagem</label>
                        <input
                            type="text"
                            className="form-control"
                            id="batata"
                            value={this.state.imageUrl}
                            onChange={e => this.setState({ imageUrl: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </form>
            </div>
        )
    }

}

export default PostEdit;