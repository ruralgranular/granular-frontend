import React, { useEffect, useState } from 'react'
import { Translation } from "react-i18next"
import axios from 'axios'
import { Link } from 'react-router-dom'

function Aboutus(props) {
    const [count,setCount] = useState(0)
    
    useEffect(()=>{
        var url = `${process.env.REACT_APP_API_URL}`
        axios.get(url+"/datasets/count")
        .then(res => {
            setCount(res.data[0].nid);
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    return (
        <Translation>
        {(t, { i18n }) => (
            <div className="fancy-feature-fortyEight position-relative">
            <div className="container">
                <div className="line-bg-wrapper position-relative pt-200 pb-200 lg-pt-120 lg-pb-110">
                    <div className="row align-items-center">
                        <div className="col-lg-6 ms-auto order-lg-last wow fadeInRight">
                            <div className="ps-xl-4">
                                <div className="title-style-eleven">
                                    <div className="sc-title">{t("AbUs")}</div>
                                    <h2 className="main-title tx-dark">{t("DigPlat")}</h2>
                                </div>
                                <div className="d-flex mt-70 mb-40 lg-mt-40 lg-mb-10">
                                    <p className="text-lg m0 ps-lg-5">{t("AbUsDesc")}</p>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col-lg-8 col-sm-6">
                                        <div className="counter-block-three mt-40 md-mt-30 wow fadeInUp" ></div> 
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="counter-block-three mt-40 md-mt-30 wow fadeInUp">
                                            <div className="main-count fw-500 tx-dark">
                                                <Link to="/collection/All/1"><span className="counter">{ count }</span></Link>
                                            </div>
                                            <p className="tx-red fs-30 m0">{t("DataSets")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 order-lg-first wow fadeInLeft">
                            <div className="img-gallery md-mt-60 position-relative">
                                <div className="row align-items-center">
                                    <div className="img-holder position-relative mt-25" >
                                        <img src={props.image} alt="" className="lazy-img ms-auto"/>
                                    </div>
                                </div>
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

export default Aboutus