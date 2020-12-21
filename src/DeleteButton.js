import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    FormGroup, CardFooter
} from "reactstrap";

class DeleteButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal : false
        }
    }

    updateDatabase = (list) =>{
        this.setState({
            showModal : false,
        })
        this.props.deleteParent(list);
    }

    render() {
        var name = this.props.infoList[3] + " " + this.props.infoList[4]
        return(
            <div>
                <Button normal color = "danger" onClick={()=>this.setState({showModal : true})}>X</Button>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        Delete Employee
                    </ModalHeader>
                    <ModalBody>
                        <p className="font-weight-bold">You will be deleting {name} from the system</p>
                        <p>Once deleted, the information cannot be retrieved again</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={()=>this.updateDatabase(this.props.infoList)}>
                            Delete
                        </Button>
                        <Button color="secondary" onClick={() => this.setState({showModal : false})}>
                            Do not delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DeleteButton;