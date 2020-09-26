import Axios from "axios";
import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            user: {
                id: this.props.user.id,
                name: this.props.user.name,
                email: this.props.user.email,
                username: this.props.user.username,
                phone: this.props.user.phone,
                website: this.props.user.website,
                company: this.props.user.company.name
            }
        }

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.setDataForm = this.setDataForm.bind(this)
    }

    close(){
        this.setState({ show: false });
    }

    open(){
        this.setState({ show: true });
    }

    setDataForm(event){
        const { user } = { ...this.state };
        const currentState = user;
        const { name, value } = event.target;
        currentState[name] = value;
        this.setState({ user: currentState});
        console.log(this.state.user)
    }

    editData(){
        Axios.put("https://jsonplaceholder.typicode.com/users/"+this.state.user.id, this.state.user)
        .then((res) => {
            if(res.data != null){
                Swal.fire({
                    icon: "success",
                    text: "El usuario fue editado exitosamente"
                })
                this.props.editUser(this.state.user)
                this.close()
            }
        }).catch((err) => {
            console.log(err)
            Swal.fire({
                icon: "error",
                html: err
            })
        })
    }

    render(){
        const { show, user } = this.state
        return (
            <div className="modal-container">
                <Button variant="primary" className="edit_button" onClick={ this.open }>
                    <i className="fa fa-edit"></i>
                </Button>

                <Modal show={ show } onHide={ this.close } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title>Crear Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <Form.Group controlId="name">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" name="name" value={ user.name } onChange={ this.setDataForm }/>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="email">
                                        <Form.Label>Correo Electronico</Form.Label>
                                        <Form.Control type="email" name="email" value={ user.email } onChange={ this.setDataForm }/>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="username">
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control type="text" name="username" value={ user.username } onChange={ this.setDataForm }/>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="phone">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control type="number" name="phone" value={ user.phone } onChange={ this.setDataForm }/>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="website">
                                        <Form.Label>Pagina Web</Form.Label>
                                        <Form.Control type="text" name="website" value={ user.website } onChange={ this.setDataForm }/>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="company">
                                        <Form.Label>Compañia</Form.Label>
                                        <Form.Control type="text" name="company" value={ user.company } onChange={ this.setDataForm }/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} className="cancelButton">
                        <i className="fas fa-minus-circle"></i> Cancel
                        </Button>
                        <Button onClick={ this.editData.bind(this) } variant="success" appearance="subtle">
                        <i className="far fa-check-circle"></i>  Crear
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditUser;