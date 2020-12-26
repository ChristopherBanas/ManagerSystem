import React from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './Button.css'
function checkNum(value){
    return /^\d+$/.test(value);
}

class AddButton extends React.Component{
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

    updateDatabase = () =>{
        let validYear = checkNum(this.state.textYear);
        let validPhone = checkNum(this.state.textPhone);
        if(!validYear && !validPhone){
            window.alert("ERROR: Invalid year and phone input. Input whole numbers only")
        } else if(!validYear){
            window.alert("ERROR: Invalid year input. Input whole numbers only")
        } else if(!validPhone){
            window.alert("ERROR: Invalid phone input. Input whole numbers only")
        } else if(this.state.textDepartment === ""){
            window.alert("ERROR: No department selected")
        } else{
            this.setState({
                showModal : false,
            })
            this.props.addParent(this.state);
        }
    }

    updateModal=()=>{
        this.setState({
            showModal : false,
            textLast : "",
            textFirst : "",
            textYear : "",
            textPhone : "",
            textDepartment : "",
        })
    }

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

