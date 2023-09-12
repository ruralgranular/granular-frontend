import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingTransition from '../../LoadingTransition/LoadingTransition';
import { Translation } from "react-i18next";
import { Link } from 'react-router-dom';


function ProjectInfoSection () {
  const [loading, setLoading] = useState(false);
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

  while (loading  === true) {
    return (<LoadingTransition></LoadingTransition>)
  }

  return (
    <Translation>
      {(t, { i18n }) => (
        <div className="fancy-feature-fortySix position-relative">
          <div className="container">
            <div className="line-bg-wrapper position-relative pt-150 pb-180 lg-pt-100 md-pb-110">

              <div className="row align-items-start">
                <div className="col-lg-5 wow fadeInLeft">
                  <div className="title-style-eleven md-mb-20">
                    <h2 className="main-title tx-green">{t("Gran")}</h2>
                  </div>
                  <div className="title-style-eleven md-mb-20">
                    <h2 className="main-title tx-dark">{t("DigPlat")}</h2>
                  </div>
                </div>
                <div className="col-lg-7 ms-auto wow fadeInRight">
                  <p className="text-lg m0">{t("GranDigPlatDesc")}</p>
                </div>
              </div>

              <div className="text-center mt-80 sm-mt-20 wow fadeInUp">
                <div className="row">
                  <div className="col-12">
                    <div className="diagonal-squares">
                      <div className="available-datasets-preview">
                        <img src="/assets/available-datasets-preview.webp" />
                      </div>
                      <div className="d-flex flex-column dataset-counter-box justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center counter-box">
                          <h1 className="counter-text">{count}</h1>
                        </div>
                        <h2 className="counter-text-datasets">Datasets</h2>
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end mt-4 mt-sm-0">
                      <div className="col-12 col-sm-8 mt-30 mt-sm-0">
                        <p className="text-lg" style={{ textAlign: 'left'}}>{t("GranSuppDig")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 

              <div className="shapes shape-two">
                <img src="/assets/Hexagon5.webp" alt="" className="lazy-img " />
              </div>
              <div className="d-flex flex-row justify-content-center justify-content-sm-end mt-2">
                <Link to="/collection/All/1">
                  <div className="d-flex flex-row justify-content-around align-items-center p-3 py-1 explore-button">
                    <h4 className="tx-white btn-text" style={{ marginBottom: '0px', fontWeight: "600" }}>Explore now <i className="bi bi-arrow-right-short arrow-icon"></i></h4>
                  </div>
                </Link>
              </div>
              <div style={{ position: 'relative', left: '-4vw'}}><img src="/assets/shape_162.webp"alt="" className="lazy-img"/></div>
            </div> 
          </div> 
        </div>
      )}
    </Translation>
  );
};

export default ProjectInfoSection;