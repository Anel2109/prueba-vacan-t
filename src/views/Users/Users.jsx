import React from "react";
import { Modal, Button } from "react-bootstrap";

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close(){
        this.setState({ show: false });
    }

    open(){
        this.setState({ show: true });
    }

    render(){
        const { show } = this.state
        const { user } = this.props
        return (
            <div className="modal-container">
                <span className="nameTable" onClick={ this.open }>{this.props.user.name}</span>

                <Modal show={ show } onHide={ this.close } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title>{ user.name }, { user.address.city }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5><b>{ user.name }</b></h5>
                        <h5>Correo Electronico: <b>{ user.email }</b></h5>
                        <h5>Telefono: <b>{ user.phone }</b></h5><br/>
                        <h5>Dirección</h5>
                        <span>Ciudad: <b>{user.address.city}</b></span><br/>
                        <span>Dirección: <b>{user.address.street}</b></span><br/>
                        <span>Complemento: <b>{user.address.suite}</b></span><br/><br/>
                        <h5>Compañia</h5>
                        <span>Nombre de la compañia: <b>{user.company.name}</b></span><br/>
                        <span>Descripción de la empresa: <b>{user.company.catchPhrase}, {user.company.bs}</b></span><br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} className="cancelButton">
                        <i className="fas fa-minus-circle"></i> Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default User;