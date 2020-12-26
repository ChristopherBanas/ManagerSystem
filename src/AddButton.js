/**
 * Desc: Allows user to add a new employee to the database
 * Author: Christopher Banas
 */

import React from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './Button.css'

/**
 * Checks if a value is a number or not
 * @param value Value to be checked
 * @returns {boolean} If value is a number or not
 */
function checkNum(value){
    return /^\d+$/.test(value);
}

/**
 * Contains all information needed to render add button
 */
class AddButton extends React.Component{

    /**
     * Constructs the add button's state with given props
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            textLast : "",
            textFirst : "",
            textYear : "",
            textPhone : "",
            textDepartment : "Baker",  //in case department isn't selected
        }
    }

    /**
     * Updates text value of last name
     * @param e Target of e is inputted text
     */
    updateLastName = (e) => {
        this.setState({textLast: e.target.value});
    }

    /**
     * Updates text value of first name
     * @param e Target of e is inputted text
     */
    updateFirstName = (e) => {
        this.setState({textFirst: e.target.value});
    }

    /**
     * Updates text value of birth year
     * @param e Target of e is inputted text
     */
    updateBirthYear = (e) => {
        this.setState({textYear: e.target.value});
    }

    /**
     * Updates text value of phone number
     * @param e Target of e is inputted text
     */
    updatePhoneNumber = (e) => {
        this.setState({textPhone: e.target.value});
    }

    /**
     * Updates text value of department
     * @param e Target of e is inputted text
     */
    updateDepartment = (e) => {
        this.setState({textDepartment: e.target.value});
    }

    /**
     * Error checks numbers, then updates database given call back function from parent
     */
    updateDatabase = () => {
        let validYear = checkNum(this.state.textYear);
        let validPhone = checkNum(this.state.textPhone);
        if(!validYear && !validPhone){
            window.alert("ERROR: Invalid year and phone input. Input whole numbers only");
        } else if(!validYear){
            window.alert("ERROR: Invalid year input. Input whole numbers only");
        } else if(!validPhone){
            window.alert("ERROR: Invalid phone input. Input whole numbers only");
        } else if(this.state.textDepartment === ""){
            window.alert("ERROR: No department selected");
        } else{ // no errors
            this.setState({
                showModal : false,
            });
            this.props.addParent(this.state);
        }
    }

    /**
     * Updates modal back to default if user clicks cancel button
     */
    updateModal = () => {
        this.setState({
            showModal : false,
            textLast : "",
            textFirst : "",
            textYear : "",
            textPhone : "",
            textDepartment : "",
        })
    }

    /**
     * Renders the add button
     * @returns {JSX.Element} Usable add button
     */
    render() {
        return (
            <div>
                <Button normal color = "primary" onClick={()=>this.setState({showModal : true})}>
                    Add Employee
                </Button>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        Add Employee
                    </ModalHeader>
                    <ModalBody>
                        <Label for="lastName">Last Name</Label>
                        <Input id="lastName" type='text' onChange={this.updateLastName}/>
                        <Label for="firstName">First Name</Label>
                        <Input id="firstName" type='text' onChange={this.updateFirstName}/>
                        <Label for="birthYear">Birth Year</Label>
                        <Input id="birthYear" type='text' onChange={this.updateBirthYear}/>
                        <Label for="phoneNumber">Phone Number (numbers only)</Label>
                        <Input id="phoneNumber" type='text' onChange={this.updatePhoneNumber}/>
                        <FormGroup>
                            <Label for="department">Department</Label>
                            <Input type="select" name="departmentInput" id="department" onChange={this.updateDepartment}>
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
                        <Button color="primary" onClick={()=>this.updateDatabase()}>Ok</Button>
                        <Button color="secondary" onClick={() => this.updateModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddButton;

