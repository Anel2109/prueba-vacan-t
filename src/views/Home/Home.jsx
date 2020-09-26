import React, { Fragment } from "react";
import Axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import CreateUser from "../createUser/createUser";
import EditUser from "./components/EditUser";
import User from "../Users/Users";
import Swal from "sweetalert2";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            showModal: false,
        }

        this.getUsers = this.getUsers.bind(this)
        this.showModalComponent = this.showModalComponent.bind(this)
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        document.getElementById("title").innerText = "Home - Prueba Vacan-t";
        this.getUsers();
    }

    getUsers(){
        Axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            var response_data = res.data
            this.setState({
                data: response_data
            })
        })
    }

    showModalComponent(){
        this.setState({ showModal: true })
    }

    closeModal(){
        this.setState({ showModal: false })
        this.getUsers();
    }

    deleteRow(id){
        Axios.delete("https://jsonplaceholder.typicode.com/users/"+id)
        .then(res => {      
            Swal.fire({
                icon: "success",
                text: "El usuario fue eliminado exitosamente"
            })                    
            this.getUsers();
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const { data } = this.state
        return (
            <Fragment>
                <Container>
                    <CreateUser CreateUser={ this.getUsers }></CreateUser>
                    <Table responsive striped hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo Electronico</th>
                                <th>Telefono</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map(item => 
                                <tr key={item.id}>
                                    <td>
                                        <User user={item}></User>
                                    </td>
                                    <td>{ item.email }</td>
                                    <td>{ item.phone }</td>
                                    <td>
                                        <EditUser editUser={ this.getUsers } user={item}></EditUser>
                                        
                                        <Button variant="danger" onClick={() => this.deleteRow(item.id)}>
                                            <i className="fa fa-remove"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ) }
                        </tbody>
                    </Table>
                </Container>
                
            </Fragment>
        );
    }
}

export default Home;