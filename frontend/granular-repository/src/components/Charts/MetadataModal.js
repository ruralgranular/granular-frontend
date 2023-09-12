import React,{useState} from 'react'
import ReactModal from 'react-modal';
import Table from 'react-bootstrap/Table';
import { useMediaQuery } from 'react-responsive';
import CloseIcon from '@mui/icons-material/Close';
import { downloadCSV } from '../../Functions';

function MetadataModal(props) {

    const currentDate = new Date();
    function closePopup() {
        props.setShowPopup(false);
    }
    return (
        <div>
            <ReactModal
                className="chart-Modal p-5"
                overlayClassName="Overlay"
                isOpen={props.showPopup}
                onRequestClose={closePopup}
            >
                <button className="close-button-metadata-popup" onClick={closePopup}>
                    < CloseIcon/>
                </button>
                <h3 className="p-3 ">"{props.name}" metadata</h3>
                <Table bordered hover className="metadata-modal">
                    <tbody>
                        <tr >
                            <td>Title</td>
                            <td>{props.name}</td>
                        </tr>
                        <tr>
                            <td>Graph type</td>
                            <td>{props.type} chart</td>
                        </tr>
                        <tr >
                            <td>Indicator category</td>
                            <td>{props.name}</td>
                        </tr>
                        <tr>
                            <td>Number of visualized indicators</td>
                            <td>{props.values.length}</td>
                        </tr>
                        <tr  >
                            <td>Visualized_indicators</td>
                            <td>{props.values.map((item,index)=>(
                                item.name + (index !== props.values.length - 1 ? ' , ': "")
                            ))}
                            </td>
                        </tr>
                        <tr >
                            <td>Created at</td>
                            <td>{currentDate.toString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </ReactModal>
        </div>
    )
}

export default MetadataModal