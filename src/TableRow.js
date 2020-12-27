/**
 * Desc: Contains components needed to render a table row for table in StarterPage
 * Author: Christopher Banas
 */

import React from 'react';
import EditButton from "./EditButton";
import InfoButton from "./InfoButton";
import DeleteButton from "./DeleteButton";
import './Table.css';

/**
 * Contains all information needed to render a table row
 */
class TableRow extends React.Component {

    /**
     * Renders the table row
     * @returns {JSX.Element} Row for table in StarterPage
     */
    render() {
        if(this.props.infoList === "") {  //if no employees are in database
            return (<div></div>);
        }
        let lastName = this.props.infoList[4];
        let firstName = this.props.infoList[3];
        return (
            <tr>
                <td>{lastName}</td>
                <td>{firstName}</td>
                <td><InfoButton infoList = {this.props.infoList}/></td>
                <td><EditButton infoList={this.props.infoList} editParent={this.props.editParent}/></td>
                <td><DeleteButton infoList={this.props.infoList} deleteParent={this.props.deleteParent}/></td>
            </tr>
        );
    }
}

export default TableRow;