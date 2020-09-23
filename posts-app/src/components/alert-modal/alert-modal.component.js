import React, { Component } from 'react';
// Importando o arquivo de estilo do componente
import './alert-modal.component.css'

class AlertModal extends Component{

    // Definindo o contrutor
    constructor(props){
        super(props)
        // Definindo o estado inicial
        this.state = {
            show : false
        }
    }

    toggleShow(status){
        this.setState({show : status})
    }

    render(){

        // Definindo a classe que será aplicada de acordo com o estado de visualização
        let myClasses = this.state.show ? "my-modal-wrapper" : "my-modal-wrapper--hidden" ;

        return(
            // Atribuindo a classe definida
            <div className={myClasses}>
                <div className="my-modal">
                    
                    {/* Exibindo o "title" passado pelas props */}
                    <h2>{this.props.title}</h2>
                    
                    {/* Projetando o conteúdo filho entre as tags do componente */}
                    <div>{this.props.children}</div>

                    <div className="row mt-5">
                        <div className="col">

                            {/* Botão de cancelar que chama a fução  "onCancel" passada pelas props */}
                            <button className="btn btn-danger mr-2" onClick={() => { this.props.onCancel()}}>
                                Cancelar
                            </button>

                            {/* Botão de confirmar que chama a fução  "onConfirm" passada pelas props */}
                            <button className="btn btn-primary" onClick={() => { this.props.onConfirm()}}>
                                Confirmar
                            </button>

                        </div>
                    </div>
                </div>  
            </div>
        )
    }

}

export default AlertModal;