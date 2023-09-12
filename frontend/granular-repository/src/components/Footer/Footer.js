import React from "react";
import { Link } from "react-router-dom";
import { Translation } from "react-i18next"

function Footer() {
    const handleScrollToTop = () =>{
        window.scrollTo({top:0,behavior:'smooth'})
    }
    
    return (
    <Translation>
    {(t, { i18n }) => (
        <div>
            <div className="footer-style-twelve theme-basic-footer position-relative zn2">
                <div className="container">
                    <div className="line-bg-wrapper position-relative pt-130 pb-60 lg-pt-100 lg-pb-40">
                        <div className="row justify-content-between">
                            <div className="col-lg-4 footer-intro mb-40">
                                <img src="/assets/logo-Granular-horizontal-white.webp" className="logofooter" alt="" />
                                <p className="fs-18 text-white pt-30 m0">{t("FooterDesc")}</p>
                                    <div className="logo d-flex flex-wrap justify-content-start align-items-center mt-3"  >
                                        <img src="/assets/logo-co-founded-by-eu-h.webp" alt="EU logo"  style={{width:"250px", padding: '10px'}}/>
                                        <img src="/assets/logo-ukri.webp" alt="UKRI" style={{width:"170px", padding: '10px'}} />
                                    </div>
                                <ul className="d-flex social-icon style-none" style = {{marginTop: "40px"}}>
                                    <li><a href="https://www.facebook.com/ruralgranular"  target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="https://twitter.com/ruralgranular"  target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="https://www.linkedin.com/company/87389717"  target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-sm-4 mb-30">
                                <h4 className="footer-title text-white fw-500">{t("About")}</h4>
                                <ul className="footer-nav-link style-none">
                                    <li><Link to="/home">{t("NavBarHome")}</Link></li>
                                    
                                    <li><a href="https://www.ruralgranular.eu/privacy-policy/" target="_blank" rel="noreferrer">{t("PrivPol")}</a></li>
                                    <li><a href="https://www.ruralgranular.eu/cookie-policy"  target="_blank" rel="noreferrer">{t("CookPol")}</a></li>
                                    <li><a href="javascript:void(0)" onClick={() => {document.getElementById("open_preferences_center").click()}} >Update cookies preferences</a></li>
                                    
                                </ul>
                            </div>
                            <div className="col-lg-2 col-sm-4 mb-30">
                                <h5 className="footer-title text-white fw-500">{t("NavBarRepository")}</h5>
                                <ul className="footer-nav-link style-none">
                                    <li><Link to="/collection/All/1">{t("AvailDatasets")}</Link></li>
                                    <li><Link to="/visualization-toolkit">{t("VisualToolkit")}</Link></li>
                                    <li><a href="https://www.ruralgranular.eu/"  role="button"  data-bs-auto-close="outside" aria-expanded="false" target="_blank" rel="noreferrer" >Granular Website</a></li>
                                    <li><a href="https://observatory.rural-vision.europa.eu/?lng=en&ctx=RUROBS"  role="button"  data-bs-auto-close="outside" aria-expanded="false" target="_blank" rel="noreferrer" >Rural observatory</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-sm-4 mb-30">
                                <h4 className="footer-title text-white fw-500">{t("Contact")}</h4>
                                <h5 className="footer-title text-white fw-500">{t("ProjCord")}</h5>						
                                <p className="footer-nav-link style-none"><b>{t("DrTristanB")}</b> <br/><a href="mailto: granular@iamm.fr">{t("GranIamFR")}</a></p>
                                <h5 className="footer-title text-white fw-500">{t("Comm&Diss")}</h5>						
                                <p className="footer-nav-link style-none"><b>{t("CarlaL")}</b> <br/><a  href="mailto: clo@aeidl.eu">{t("CloEU")}</a></p>
                                <h5 className="footer-title text-white fw-500">{t("DevTeam")}:</h5>
                                <p className="footer-nav-link style-none"><b>{t("AUA")}</b> <br/><a href="mailto: platform@ruralgranular.eu">platform@ruralgranular.eu</a></p>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div> 
            <button className="scroll-top"  onClick={handleScrollToTop} >
                <i className="bi bi-arrow-up-short"></i>
            </button>
        </div>
    )}
    </Translation>
  )
}

export default Footer