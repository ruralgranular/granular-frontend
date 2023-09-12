import React from 'react'
import { Translation } from "react-i18next"

function HeroSec() {
  return (
    <Translation>
    {(t, { i18n }) => (
        <div className="fancy-feature-fiftyOne position-relative mt-200">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 wow fadeInLeft">
                        <div className="title-style-five mb-65 lg-mb-40">
                            <div className="sc-title-two fst-italic position-relative">{t("NavBarRepository")}</div>
                            <h2 className="main-title fw-500 tx-green">{t("AvailDatasets")}</h2>
                        </div>
                    </div>
                </div>
            </div> 
            <img src="assets/icon_logo.png" alt="" className="lazy-img shapes shape-two"/>
        </div> 
     )}
     </Translation>
  )
}

export default HeroSec