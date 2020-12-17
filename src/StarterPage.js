import React from 'react';
import {Card, CardHeader, CardBody, Table} from "reactstrap";
import TableRow from "./TableRow";
class StarterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            employeeList : []
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
                                    <th>Employee code</th>
                                    <th>Last name</th>
                                    <th>First name</th>
                                    <th>Information</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.employeeList.map((list,i) =>{
                                return <TableRow infoList={list}/>
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default StarterPage;

