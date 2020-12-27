/**
 * Desc: Allows user to edit an employee from the database
 * Author: Christopher Banas
 */

import React from 'react';
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup} from "reactstrap";

/**
 * Checks if a value is a number or not
 * @param value Value to be checked
 * @returns {boolean} If value is a number or not
 */
function checkNum(value){
    return /^\d+$/.test(value);
}

/**
 * Contains all information needed to render edit button
 */
class EditButton extends React.Component{

    state = {
        showModal : false,
        textLast : this.props.infoList[4],
        textFirst : this.props.infoList[3],
        textYear : this.props.infoList[5],
        textPhone : this.props.infoList[6],
        textDepartment : this.props.infoList[2],
        originalLast : this.props.infoList[4],
        originalFirst : this.props.infoList[3],
        originalYear : this.props.infoList[5],
        originalPhone : this.props.infoList[6],
        originalDepartment : this.props.infoList[2],
        employeeCode : this.props.infoList[1]
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
        } else {
            this.props.editParent(this.state);
            this.setState({
                showModal : false,
                originalLast : this.state.textLast,
                originalFirst : this.state.textFirst,
                originalYear : this.state.textYear,
                originalPhone : this.state.textPhone,
                textDepartment : this.state.textDepartment
            })
        }
    }

    /**
     * Updates modal back to default if user clicks cancel button
     */
    updateModal = () => {
        this.setState({
            showModal : false,
            textLast : this.state.originalLast,
            textFirst : this.state.originalFirst,
            textYear : this.state.originalYear,
            textPhone : this.state.originalPhone,
            textDepartment : this.state.originalDepartment
        })
    }

    /**
     * Updates state if information is being jumbled. Used to prevent
     * information from being swapped when table rearranges
     */
    updateState = () => {
        this.setState({
            textLast : this.props.infoList[4],
            textFirst : this.props.infoList[3],
            textYear : this.props.infoList[5],
            textPhone : this.props.infoList[6],
            textDepartment : this.props.infoList[2],
            originalLast : this.props.infoList[4],
            originalFirst : this.props.infoList[3],
            originalYear : this.props.infoList[5],
            originalPhone : this.props.infoList[6],
            originalDepartment : this.props.infoList[2],
            employeeCode : this.props.infoList[1]
        });
    }

    /**
     * Renders the edit button
     * @returns {JSX.Element} Usable edit button
     */
    render() {
        if(this.state.employeeCode !== this.props.infoList[1]){ //data needs to be updated
            this.updateState()
        }
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
                        <Button color="primary" onClick={()=>this.updateDatabase()}>Ok</Button>
                        <Button color="secondary" onClick={() => this.updateModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditButton;