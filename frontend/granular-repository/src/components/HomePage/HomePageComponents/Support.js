import React from 'react'
import { Translation } from "react-i18next"

function Support() {
  return (
    <Translation>
    {(t, { i18n }) => (
        <div className="fancy-feature-fortyNine pt-110 pb-90 xl-pt-70 lg-pb-60 zn2 position-relative" style={{ margin: '0px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 ms-auto wow fadeInRight">
                        <h2 className="title text-white fw-bold">{t("SuppRA")}</h2>
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 ">
                                <p className="text-lg text-white mt-55 lg-mt-20">{t("SuppDesc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
    )}
    </Translation>
  )
}

export default Support