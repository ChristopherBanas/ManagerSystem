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

class EditButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            textLast : props.infoList[4],
            textFirst : props.infoList[3],
            textYear : props.infoList[5],
            textPhone : props.infoList[6],
            textDepartment : props.infoList[2],
            originalLast : props.infoList[4],
            originalFirst : props.infoList[3],
            originalYear : props.infoList[5],
            originalPhone : props.infoList[6],
            originalDepartment : props.infoList[2],
        }
    }

    updateLastName = (e) => {
        this.setState({textLast: e.target.value})
    }

    updateFirstName = (e) => {
        this.setState({textFirst: e.target.value})
    }

    updateBirthYear = (e) => {
        this.setState({textYear: e.target.value})
    }

    updatePhoneNumber = (e) => {
        this.setState({textPhone: e.target.value})
    }

    updateDepartment = (e) => {
        this.setState({textDepartment: e.target.value})
    }

    updateDB = () =>{
        this.setState({
            showModal : false,
            originalLast : this.state.textLast,
            originalFirst : this.state.textFirst,
            originalYear : this.state.textYear,
            originalPhone : this.state.textPhone,
            originalDepartment : this.state.textDepartment,

        })
        this.props.editParent(this.state);
    }

    updateModal=()=>{
        this.setState({
            showModal : false,
            textLast : this.state.originalLast,
            textFirst : this.state.originalFirst,
            textYear : this.state.originalYear,
            textPhone : this.state.originalPhone,
            textDepartment : this.state.originalDepartment
        })
    }

    render() {
        return (
            <div>
                <Button normal onClick={()=>this.setState({showModal : true})}>Edit</Button>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        Edit Employee
                    </ModalHeader>
                    <ModalBody>
                        <Label for="editLast">Last Name</Label>
                        <Input id="editLast" type='text' value={this.state.textLast} onChange={this.updateLastName}/>
                        <Label for="editFirst">First Name</Label>
                        <Input id="editFirst" type='text' value={this.state.textFirst} onChange={this.updateFirstName}/>
                        <Label for="editYear">Birth Year</Label>
                        <Input id="editYear" type='text' value={this.state.textYear} onChange={this.updateBirthYear}/>
                        <Label for="editPhone">Phone Number</Label>
                        <Input id="editPhone" type='text' value={this.state.textPhone} onChange={this.updatePhoneNumber}/>
                        <FormGroup>
                            <Label for="editDepartment">Department</Label>
                            <Input type="select" name="editDepartInfo" id="editDepartment" onChange={this.updateDepartment}>
                                <option>Baker</option>
                                <option>Cleaner</option>
                                <option>Cook</option>
                                <option>Delivery</option>
                                <option>Greeter</option>
                                <option>Manager</option>
                                <option>Waiter / Waitress</option>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>this.updateDB()}>Ok</Button>
                        <Button color="secondary" onClick={() => this.updateModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default EditButton;