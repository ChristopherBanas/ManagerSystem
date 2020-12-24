import React from 'react';
import EditButton from "./EditButton";
import InfoButton from "./InfoButton";
import DeleteButton from "./DeleteButton";
import './Table.css';


class TableRow extends React.Component {
    render() {
        if(this.props.infoList === "") {
            return (<div></div>);
        }
        return (
            <tr>
                <td>{this.props.infoList[4]}</td>
                <td>{this.props.infoList[3]}</td>
                <td><InfoButton infoList = {this.props.infoList}/></td>
                <td><EditButton infoList={this.props.infoList} editParent={this.props.editParent}/></td>
                <td><DeleteButton infoList={this.props.infoList} deleteParent={this.props.deleteParent}/></td>
            </tr>
        );
    }
}

export default TableRow;