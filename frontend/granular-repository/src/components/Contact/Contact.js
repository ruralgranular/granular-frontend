import React ,{useState} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Translation } from "react-i18next"
import ReactModal from 'react-modal';
import { ContactUs } from '../../Functions'


function Contact() {
    const [selectedOption, setSelectedOption] = useState("general");
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [url, setUrl] = useState('');
    const [comment, setComment] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showReq , setShowReq] = useState(false)
  
    function closePopup() {
      setShowPopup(false);
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
    const handleInputCommChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        async function sendmessage(){
            try{
                await ContactUs(selectedOption,inputEmail,inputName,comment,url)
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
                setShowReq(false)
                setShowPopup(true);
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
            <div>
                <Header/>
                <div>
                <div className="inner-banner-three text-center ">	
                <div className="bg-wrapper text-center" style={{backgroundImage :`url("/assets/digital.jpg")`}} >
					<div className="container">
						<div className="title-style-five">
							<h2 className="main-title tx-dark fw-bold tx-green">{t("Contactnavbar")}</h2>
						</div>
						<p className="fs-20 mt-30 lg-mt-20 tx-dark">{t("ContactUsHead")}</p>
					</div>
					<div className="container">
						<div className="contact-section-two text-start mt-80 lg-mt-60">
							<div className="row">
								<div className="">
									<div className="form-style-three md-mb-60 wow fadeInLeft" style={{visibility:"visible", animationName: "fadeInLeft"}}>
										<form action="inc/contact.php" id="contact-form" data-toggle="validator" novalidate="true" onSubmit={handleSubmit}>
											<div className="messages"></div>
											<div className="row controls">
                                                <div className="col-12">
                                                    <div className="input-group-meta form-group mb-35 ">
                                                        <label htmlFor="dropdown d-block" for="">{t("CUTopic")}*</label><br/>
                                                        <select className="ddown form-control contact-us-type-select" id="dropdown"  value={selectedOption} onChange={handleOptionChange}>
                                                            <option value="general">General</option>
                                                            <option value="platform">Platform</option>
                                                        </select>
                                                    </div>
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
                                                            {(inputEmail==='' && showReq===true) && (
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
                                                            {(comment==='' && showReq===true) && (
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
				</div>
                </div>
                </div>
                <Footer/>
            </div>
        )}
        </Translation>
    )
}

export default Contact