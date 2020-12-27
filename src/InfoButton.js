/**
 * Desc: Allows user to add a see employee information in the database
 * Author: Christopher Banas
 */

import React from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

/**
 * Contains all information needed to render information button
 */
class InfoButton extends React.Component{

    /**
     * Constructs the information button's state with given props
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            showModal : false
        }
    }

    /**
     * Renders the information button
     * @returns {JSX.Element} Usable information button
     */
    render() {
        let code = this.props.infoList[1];
        let department = this.props.infoList[2];
        let firstName = this.props.infoList[3];
        let lastName = this.props.infoList[4];
        let year = this.props.infoList[5];
        let phone = this.props.infoList[6];
        return (
            <div>
                <Button normal onClick={()=>this.setState({showModal : true})}>Info</Button>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        {firstName} {lastName} Info
                    </ModalHeader>
                    <ModalBody>
                        <Label for="infoCode" className="font-weight-bold">Employee Code</Label>
                        <p id="infoCode">{code}</p>
                        <Label for="infoLast" className="font-weight-bold">Last Name</Label>
                        <p id="infoLast">{lastName}</p>
                        <Label for="infoFirst" className="font-weight-bold">First Name</Label>
                        <p id="infoFirst">{firstName}</p>
                        <Label for="infoYear" className="font-weight-bold">Birth Year</Label>
                        <p id="infoYear">{year}</p>
                        <Label for="infoPhone" className="font-weight-bold">Phone Number</Label>
                        <p id="infoPhone">{phone}</p>
                        <Label for="infoDepartment" className="font-weight-bold">Department</Label>
                        <p id="infoDepartment">{department}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={()=>this.setState({showModal : false})}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default InfoButton;