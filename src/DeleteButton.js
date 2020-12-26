/**
 * Desc: Allows user to delete an employee from the database
 * Author: Christopher Banas
 */

import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

/**
 * Contains all information needed to render delete button
 */
class DeleteButton extends React.Component{

    /**
     * Constructs the delete button's state with given props
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            showModal : false
        }
    }

    /**
     * Updates database with employee to be deleted
     * @param list List of employee information to be deleted
     */
    updateDatabase = (list) => {
        this.setState({
            showModal : false,
        })
        this.props.deleteParent(list);
    }

    /**
     * Renders the delete button
     * @returns {JSX.Element} Usable delete button
     */
    render() {
        let name = this.props.infoList[3] + " " + this.props.infoList[4];
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