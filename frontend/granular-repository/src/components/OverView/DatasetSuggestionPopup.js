import React,{useState} from 'react';
import Modal from 'react-modal';
import { Translation } from "react-i18next"
import ReactModal from 'react-modal';
import { ContactUs } from '../../Functions'
import CloseIcon from '@mui/icons-material/Close';

const customStyles = {
  // Define your modal styles here
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '70vh', // Set a maximum height if needed
  },
};


function DatasetSuggestionPopup(props) {

    const [selectedOption, setSelectedOption] = useState("dataset");
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [url, setUrl] = useState('');
    const [comment, setComment] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showReq, setShowReq] = useState(false);
  
    function closePopup() {
      setShowPopup(false);
      setShowReq(false)
    }
    function closePopup2() {
        setShowPopup2(false);
      }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleInputNameChange = (event) => {
        setInputName(event.target.value);
    };
    const handleInputEmailChange = (event) => {
        setInputEmail(event.target.value);
    };
    const handleInputUrlChange = (event) => {
        setUrl(event.target.value);
    };
    const handleInputCommChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        async function sendmessage(){
            try{
                await ContactUs("dataset",inputEmail,inputName,comment,url)
            }catch(error){
                console.error(error);
            }
        }
        event.preventDefault();
        if( ( ( inputEmail !== ''&& inputEmail) && ( comment !== ''&& comment) )  ){
            if((selectedOption === "dataset" && ( url === '' || url===undefined) )){
                setShowPopup2(true);
                setShowReq(true)
            }else{
                setShowPopup(true);
                setShowReq(false)
                sendmessage()
                setInputEmail('')
                setSelectedOption('general')
                setInputName('')
                setComment('')
                setUrl('')
            }
        }else{
            setShowPopup2(true);
            setShowReq(true)
        }   
    };
    return (
        <Translation>
        {(t, { i18n }) => (
        <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        >
        <button className="close-button" onClick={props.closeModal}>
            < CloseIcon/>
        </button>
        <div className="container">
                <div className="contact-section-two text-start mt-80 lg-mt-60">
                    <div className="row">
                        <div className="">
                            <div className="form-style-three md-mb-60 wow fadeInLeft" style={{ animationName: "fadeInLeft"}}>{/* visibility:"visible", */}
                                <form action="inc/contact.php" id="contact-form" data-toggle="validator" novalidate="true" onSubmit={handleSubmit}>
                                    <div className="messages"></div>
                                    <div className="row controls">
                                        <div className="col-12">
                                            <h1>Dataset suggestion</h1>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group-meta form-group mb-35">
                                                <label className="d-block" for="">{t("CUName")}</label>
                                                <input type="text" placeholder={t("NamePlaceholder")} value={inputName} onChange={handleInputNameChange} name="name" required="required" data-error="Name is required."  />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group-meta form-group mb-40">
                                                <label className="d-block" for="">{t("CUEmail")}*</label>
                                                <input type="email" placeholder={t("EmailPlaceholder")} value={inputEmail} onChange={handleInputEmailChange} name="email" required="required" data-error="Valid email is required."/>
                                                <div className="help-block with-errors">
                                                    {(inputEmail==='' && showReq===true ) && (
                                                        <p>{t("reqfield")}</p>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group-meta form-group mb-40">
                                            <label className="d-block" for="">Dataset's url*</label>
                                                <input type="url" placeholder={t("UrlPlaceholder")} value={url} onChange={handleInputUrlChange} name="url" required="required" data-error="Valid email is required."/>
                                                <div className="help-block with-errors">
                                                {(url==='' && showReq===true)&& (
                                                    <p>{t("reqfield")}</p>
                                                )
                                                }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group-meta form-group mb-30">
                                                <label className="d-block" for="">{t("CUComm")}*</label>
                                                    <textarea name="message" placeholder={t("MsgPlaceholder")} value={comment} onChange={handleInputCommChange} required="required" data-error="Please,leave us a message."></textarea>
                                                    <div className="help-block with-errors">
                                                    {(comment==='' && showReq===true)&& (
                                                        <p>{t("reqfield")}</p>
                                                    )
                                                    }
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="col-12"><button className="btn-one fw-500 w-100 text-uppercase fs-14 d-block">Send Message</button></div>
                                        <ReactModal
                                            className="Modal"
                                            overlayClassName="Overlay"
                                            isOpen={showPopup}
                                            onRequestClose={closePopup}
                                        >
                                            <h4>{t("Popuptext")}</h4>
                                            <p>We will evaluate the message</p>
                                            <button  className="closebutton"  onClick={closePopup}>Close</button>
                                        </ReactModal>
                                        <ReactModal
                                            className="Modal"
                                            overlayClassName="Overlay"
                                            isOpen={showPopup2}
                                            onRequestClose={closePopup2}
                                        >
                                            <h4>Please fill all the necessary fields</h4>
                                            <button  className="closebutton"  onClick={closePopup2}>Close</button>
                                        </ReactModal>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </Modal>
        )}
        </Translation>
    );
};

export default DatasetSuggestionPopup;