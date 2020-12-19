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
import TableRow from "./TableRow";
import AddButton from "./AddButton";
class StarterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            employeeList : [],
            addModal : false
        }
    }
    fetchData = () => {
         fetch('/getAllEmployees')
         .then(response => response.json())
         .then (jsonOutput => {this.setState({
             employeeList : jsonOutput
         })})
    }

    componentDidMount(){
        this.fetchData();
    }

    addHandler = (props) => {
        const URL = '/createEmployee'
        fetch(URL,{
            method : 'POST',
            body : JSON.stringify({
                department : props.textDepartment,
                firstName : props.textFirst,
                lastName : props.textLast,
                birthYear : props.textYear,
                phoneNumber : props.textPhone
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response=>{
            return response.json()
        }).then(json =>{
            //update the courses with the updated DB information
            console.log("json response")
            console.log(json)
            this.setState({
                employeeList : this.state.employeeList.concat([json])
            })
            this.fetchData()
        })
    }

    render() {
        return(
            <div>
                <Card className = "mb-4">
                    <CardHeader as={"h5"} className = "text-center text-md-center">
                        Employee List
                    </CardHeader>
                    <CardBody>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th className={"text-left text-md-left"}>Employee code</th>
                                    <th className={"text-left text-md-left"}>Last name</th>
                                    <th className={"text-left text-md-left"}>First name</th>
                                    <th className={"text-left text-md-left"}>Information</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.employeeList.map((list,i) =>{
                                console.log("list loop")
                                console.log(this.state.employeeList)
                                console.log(list)
                                return <TableRow infoList={list}/>
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <AddButton callParent={this.addHandler}/>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default StarterPage;

