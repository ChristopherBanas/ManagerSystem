import React from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class InfoButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal : false
        }
    }

    render() {
        var code = this.props.infoList[1];
        var department = this.props.infoList[2];
        var lastName = this.props.infoList[4];
        var firstName = this.props.infoList[3];
        var year = this.props.infoList[5];
        var phone = this.props.infoList[6];
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
                        <Button color="primary" onClick={()=>this.setState({showModal : false})}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default InfoButton;