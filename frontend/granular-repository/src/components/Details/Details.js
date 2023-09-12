import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import HeadDetails from './HeadDetails'
import OVSearchbar from '../OverView/OVSearchbar'
import SimilarData from './SimilarData'
import { Translation, useSSR } from "react-i18next"
import {FetchWithId ,UpdateViews,FetchSimilar,FetchMetadataTooltip} from '../../Functions'
import { useParams } from 'react-router'
import LoadingTransition from '../LoadingTransition/LoadingTransition'
import { Link } from 'react-router-dom'
import CsvDownloadButton from 'react-json-to-csv'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton , FacebookIcon , TwitterIcon , LinkedinIcon} from 'react-share';
import Tooltip from '@mui/material/Tooltip';
import DatasetSuggestionPopup from '../OverView/DatasetSuggestionPopup'


// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

// import 'popper.min.js';

function BuildMetaData(dataset){
  var arr = [];
  var j = 0
  var exclude = ["nid","field_views","field_description","title","field_doi_api","field_indicator_class","term_node_tid","field_url","uuid","field_doi","field_imageurl","field_living_labs","field_policy_indicators","field_spatial_extent","field_spatial_resolution","field_temporal_resolution","field_thematic_area","field_thematic_area","category_icon","category_color"]
  for (var key in dataset) {
    if (dataset.hasOwnProperty(key) && dataset[key]!==false && !exclude.includes(key)) {
      arr[j] = [key,dataset[key]]
      j++
    }
  }
  return arr;
}

function Details(props) {
  var urls=`${process.env.REACT_APP_API_URL}`
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [similar,setSimilar] = useState()
  const [dataset,setDataset] = useState()
  const [tooltip,setTooltip] = useState()
  const keyw = useParams();
  const [shareurl,setShareurl] = useState('')
  const [sharetitle,setSharetitle] = useState("Check out this Granural's repository dataset")
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openContactus = () => {
    setModalIsOpen(true);
  };

  const closeContactus = () => {
    setModalIsOpen(false);
  };
  
  useEffect(() => {
    async function buildDetails() {
      setLoading(true);
      try {
        const response = await FetchWithId(keyw.id);
        setDataset(response.data);
      } catch (error) {
        console.error(error);
      } 
    }
    buildDetails();
  }, [keyw.id]);

  useEffect(()=>{
    async function updateviews(){
      try{
        const response = await UpdateViews(dataset[0].uuid,dataset[0].field_views)
      }catch(error){
        console.error(error);
      }
    }
    async function fetchSimilar(){
      try {
        const response = await FetchSimilar(dataset[0].field_indicator_class);
        setSimilar(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (dataset!==undefined && dataset.length!==0 && dataset!==null){
      updateviews()
      fetchSimilar()
      setShareurl( "https://repository.ruralgranular.eu//details/" + dataset[0].nid )
    }
  },[dataset])

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  
  const handleTooltipHover = async (name) => {
    try {
      const response = await FetchMetadataTooltip(name);
      setTooltip(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  var image = "";
  
  if (dataset!==undefined && dataset.length!==0 && dataset!==null){
    image = "/assets/"+dataset[0].field_imageurl;
    
    // if (dataset[0].term_node_tid === "Cohesion &amp; Values"){
    //   image = "/assets/Cohesion & Values.jpg"
    // }
    // if (dataset[0].term_node_tid === "Well being &amp; Cohesion"){
    //   image = "/assets/Well being & Cohesion.jpg"
    // }
  }

  while (loading  === true) {
    return (<LoadingTransition></LoadingTransition>)
  }

  return (
    <Translation>
        {(t, { i18n }) => (
        <div style={{ overflowX: 'hidden' }}>
            <Header/>
            <div className="blog-details-one mt-120 lg-mt-60">
            <div className="container">
              <div className="border-bottom p-3 p-sm-0 mb-4">
                <div className="row gx-xl-5">
                  <div className="col-lg-8">
                    <div className="mt-70">
                      <Link className="d-flex flex-row align-items-center justify-content-start back-link"
                        to={`${localStorage.getItem('backUrl') ?? '/collection/All/1/'}`}>
                        <i className='bi bi-arrow-left-short back-link-icon' style={{ fontSize: '2rem'}}/>
                        <p className="back-link"> Go back to results</p>
                      </Link>
                    </div>
                    <HeadDetails  category={dataset[0].term_node_tid} date={dataset[0].field_uploaded_date} author={dataset[0].field_author_producer} title={dataset[0].title} image={dataset[0].category_icon} color={dataset[0].category_color}/>
                    <div className="blog-meta-wrapper pe-xxl-5 mt-50">
                      <article className="blog-details-content">
                      <b>{dataset[0].field_description?(dataset[0].field_description):("No description given.")}</b>
                      <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                        <ul className="d-flex tags style-none pb-20">
                          <li>{t("tg")}</li>
                          <li><Link to={`/collection/All/1/${dataset[0].term_node_tid}`}>{dataset[0].term_node_tid},</Link></li>
                          <li><Link to={`/collection/${dataset[0].field_author_producer}/1`}>{dataset[0].field_author_producer}</Link></li>
                        </ul>
                          {/* <ul class="d-flex share-icon align-items-center style-none pb-20">
                            <li>{t("shr")}</li>
                            <li><FacebookShareButton url={shareurl} quote={sharetitle}>
                              <FacebookIcon  size={32} round/>
                            </FacebookShareButton></li>
                            <li><TwitterShareButton url={shareurl} title={sharetitle}>
                              <TwitterIcon  size={32} round/>
                            </TwitterShareButton>
                            </li>
                            <li><LinkedinShareButton url={shareurl} title={sharetitle}>
                              <LinkedinIcon  size={32} round/>
                            </LinkedinShareButton></li>
                          </ul> */}
                      </div> 
                      </article>
                      {/* <br></br> */}
                      <img src={image} alt="" class="lazy-img image-meta w-100 detailsimage" style={{ marginTop: '34px', width: '100%', height: 'auto', marginBottom: '40px',maxHeight: "500px", objectFit: "contain"}}/>
                      <div className="blog-sidebar-category mb-60 md-mb-50 mt-3">
                        <h4 className="sidebar-title">{t("AvlbleMtData")}</h4>
                        <ul className="style-none d-flex flex-wrap">
                          {BuildMetaData(dataset[0]).map(data=>
                            <dl style={{ flexGrow: 1, flexBasis: '50%'}}>
                              <dt>
                                <b>{data[0].substring(6, 100).charAt(0).toUpperCase() + data[0].slice(7).replace("_", " ")}:</b>
                                <Tooltip className="muitoolkit" title={tooltip} arrow placement="top-start">
                                  <span
                                    className="d-inline-block ps-3 metadatatool"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    // title={tooltip}
                                    onMouseEnter={() => handleTooltipHover(data[0])}>
                                    <i className="fas fa-info-circle"></i>
                                  </span>
                                </Tooltip>
                              </dt>
                              <dd>{data[1]}</dd>
                            </dl>
                          )}
                          {console.log(dataset[0].term_node_tid)}
                          {
                            dataset[0].term_node_tid && (
                              <li style={{ flexGrow: 1, flexBasis: '50%'}}>
                                <dt>
                                  <b>Category:</b>
                                  <Tooltip className="muitoolkit" title={tooltip} arrow placement="top-start">
                                  <span
                                    className="d-inline-block ps-3 metadatatool"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    // title={tooltip}
                                    onMouseEnter={() => handleTooltipHover("field_indicator_class")}>
                                    <i className="fas fa-info-circle"></i>
                                  </span>
                                </Tooltip>
                                </dt> 
                                <dd>
                                  {dataset[0].term_node_tid}
                                </dd>
                              </li>

                            )
                          }
                          {dataset[0].field_doi_api && (
                              <li style={{ flexGrow: 1, flexBasis: '50%'}}>
                                <dt>
                                  <b>Doi api:</b>
                                </dt> 
                                <dd >
                                    <a href={dataset[0].field_doi_api} target="_blank" rel="noreferrer" >
                                        {dataset[0].field_doi_api}
                                    </a>
                                </dd>
                            </li>
                            )
                          }
                          {dataset[0].field_doi?(
                            <li style={{ flexGrow: 1, flexBasis: '50%'}}>
                              <dt>
                                <b>DOI:</b>
                              </dt> 
                              <dd>
                                <a href={"https://doi.org/"+dataset[0].field_doi.replace("/", "%2F")} target="_blank" rel="noreferrer">{dataset[0].field_doi}</a>
                              </dd>
                            </li>
                          ):(
                            <p></p>
                          )}
                          {dataset[0].field_url?(
                            <li style={{ flexGrow: 1, flexBasis: '50%'}}>
                              <dt>
                                <b>Url:</b>
                              </dt> 
                              <dd >
                                  <a href={dataset[0].field_url} 
                                    target="_blank" rel="noreferrer" 
                                    onMouseOver={handleMouseOver} 
                                    onMouseOut={handleMouseOut}>
                                      {dataset[0].field_url.substring(0, 40)}...
                                  </a>
                              </dd>
                              {/* {isHovering && (
                                <div>
                                  Click to visit:
                                  <p style={{position:"center"}}>{dataset[0].field_url}</p>
                                </div>
                              )} */}
                            </li>
                          ):(
                            <p></p>
                          )}
                        </ul>   
                      </div> 
                      <div className="text-center p-3" style={{backgroundImage :`url("/assets/fonto_download.jpg")`}}>
                        <div className="d-flex flex-column align-items-center py-5" style={{background: 'white', opacity: 0.9 }}>
                          <h4 style={{ width: '100%' }}>{t("DnldData")} metadata</h4>
                          <a className="mb-3"><CsvDownloadButton data={dataset}  className="btn-twentyOne fw-500 tran3s">{t("Dnld")}</CsvDownloadButton></a>
                        </div>
                      </div> 
                    </div> 
                  </div>
                  <div className="d-flex flex-column justify-content-start details-sidebar col-12 col-lg-4 col-xl-4">
                    <div className="blog-sidebar md-mt-70">
                      <OVSearchbar/>
                      <div className="d-flex flex-column justify-content-center align-items-center dataset-sugestion-container p-2">
                          <p className="content1 text-wrap">For dataset suggestions click</p>
                          <button onClick={openContactus} className="clickable-text align-self-end mb-2">HERE</button>
                          <DatasetSuggestionPopup isOpen={modalIsOpen} closeModal={closeContactus} />
                      </div>
                      <div className="sidebar-recent-news mb-60 md-mb-50 mt-3">
                        <h4 className="sidebar-title">{t("SmlrData")}</h4>
                        {similar ? (
                        similar.map(data => (
                          <>
                            <SimilarData 
                            image={`/assets/${data.term_node_tid}.jpg`} 
                            date={data.field_ploaded_date} 
                            title = {data.title} 
                            description={data.field_description}
                            id={data.nid}
                            author={data.author}
                            categoryIcon={data.selected_icon}
                            categoryName={data.term_node_tid}
                            fieldIndicatorClass={data.field_indicator_class}
                            color={data.color}/>
                            <div className="border-bottom"></div>
                          </>
                        ))
                        ):(
                          <p>No similar datasets</p>
                        )}
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

export default Details