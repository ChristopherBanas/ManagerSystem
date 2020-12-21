import React from 'react';
import EditButton from "./EditButton";
import InfoButton from "./InfoButton";
import DeleteButton from "./DeleteButton";


class TableRow extends React.Component {
    render() {
        if(this.props.infoList === "") {
            return (<div></div>);
        }
        return (
            <tr>
                <td><DeleteButton infoList={this.props.infoList} deleteParent={this.props.deleteParent}/></td>
                <td><EditButton infoList={this.props.infoList} editParent={this.props.editParent}/></td>
                <td className={"text-left text-md-left"}>{this.props.infoList[4]}</td>
                <td className={"text-left text-md-left"}>{this.props.infoList[3]}</td>
                <td className={"text-left text-md-left"}><InfoButton infoList = {this.props.infoList}/></td>
            </tr>
        );
    }
}

export default TableRow;