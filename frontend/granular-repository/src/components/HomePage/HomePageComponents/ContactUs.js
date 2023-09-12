import React from 'react'
import { Translation } from "react-i18next"

function ContactUs() {
  return (
    <Translation>
    {(t, { i18n }) => (
        <div className="fancy-short-banner-fifteen pt-150 lg-pt-80 pb-30 position-relative zn2 mt-200 lg-mt-100">
            <div className="container">
                <div className="wrapper">
                    <div className="row align-items-center">
                        <div className="col-lg-6 wow fadeInLeft">
                            <h2 className="title fw-500 text-white mb-20">{t("FFI")}</h2>
                            <p className="text-lg text-white m0"> 
                                <a href="mailto: repogranular@gmail.com" className="text-decoration-underline">{t("ConUs")}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </Translation>
  )
}

export default ContactUs