import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import HeroSec from './HeroSec'
import DataProp from './DataProp'
import OVSearchbar from './OVSearchbar'
import { Translation } from "react-i18next"
import PopularDataSets from './PopularDataSets'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { FetchPopular} from '../../Functions'
import { useParams } from "react-router-dom"
import LoadingTransition from '../LoadingTransition/LoadingTransition'
import axios, { all } from "axios"
import { useNavigate } from "react-router-dom";
import Filter from './Filter'
import ReactModal from 'react-modal';
import DatasetSuggestionPopup from './DatasetSuggestionPopup'
import Tooltip from '@mui/material/Tooltip';

function Overview() {

  var urls = `${process.env.REACT_APP_API_URL}`
  const keyw = useParams();
  const [loading, setLoading] = useState(true);
  const [datas, setData] = useState();
  const [defaultdatas, setDefData] = useState();
  const [pages, setPages] = useState(1);
  const [defaultpages, setDefpages] = useState();
  const [allcategories, setAllcategories] = useState();
  const [clear, setClear] = useState(false);
  const [populardata,setPopular] = useState();
  const [filteredOptions,setFilteredOptions] = useState({
    spatialextend:[],
    updates:[],
    datatype:[],
    licence:[]
  })
  const [filteredSEOptions, setFilteredSEOptions] = useState([]);
  const [filteredUPOptions, setFilteredUPOptions] = useState([]);
  const [filteredDTOptions, setFilteredDTOptions] = useState([]);
  const [filteredLIOptions, setFilteredLIOptions] = useState([]);
  const [filteredCTOptions, setFilteredCTOptions] = useState([]);
 
  const spatialextend = ["Global" ,"NUTS 1","NUTS 2","LAU","EU","Country specific","All Granular"]
  const updates = ["Annual","Every 3 years","Project-Based"]
  const datatype = ["Survey","Statistics","Webscraping","RS / GIS","Raster","Aerial Photos","Satellite","Vector","Tabular",	"Points","Matrixes"]
  const licence = ["Full Open Access","Data Commons Open Database Licence"]
  const [onstart, setOnstart] = useState(keyw.filters);
  const [resolutionThreshold, setResolutionThreshold] = useState(window.innerWidth);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function fetchPopular() {
      try {
        const response = await FetchPopular();
        setPopular(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchdatasets(){ 
      var url1 = urls+"/datasets/results/"+keyw.terms.replace("amp;","")+"/"+keyw.page+"/none"
      setClear(true)
      setOnstart(keyw.filters)
      if (keyw.filters!==undefined){
        url1 = urls+"/datasets/results/"+keyw.terms+"/"+keyw.page+"/"
        var fil = keyw.filters.split("+"); 
        var se = []
        var up = []
        var dt = []
        var lc = []
        var ct = []
        for (var i of fil){
          if (spatialextend.includes(i)){
            se.push(i)
          }else if(updates.includes(i)){
            up.push(i)
          }else if(datatype.includes(i)){
            dt.push(i)
          }else if(licence.includes(i)){
            lc.push(i)
          }else{
            ct.push(i)
          }
        }
        var url2 = ""
        if (se.length !== 0){
          url2 = "spatial_extent:"+se.join(",")
        }
        if (up.length !== 0){
          if (url2.length>0){
            url2 = url2+"+updates:"+up.join(",")
          }else{
            url2 = "updates:"+up.join(",")
          }
        }
        if (dt.length !== 0){
          if (url2.length>0){
            url2 = url2+"+data_type:"+dt.join(",")
          }else{
            url2 = "data_type:"+dt.join(",")
          }
        }
        if (lc.length !== 0){
          if (url2.length>0){
            url2 = url2+"+licence:"+lc.join(",")
          }else{
            url2 = "licence:"+lc.join(",")
          }
        }
        if (ct.length !== 0){
          if (url2.length>0){
            url2 = url2+"+category:"+ct.join(",")
          }else{
            url2 = "category:"+ct.join(",")
          }
        }
        url1 = url1+url2
      }

      try {
        setLoading(true);
        await axios.get(url1)
        .then(res => {
          if (res.data[0]!==undefined){
            setPages(res.data[0].pages)
            setDefpages(res.data[0].pages)
            setData(res.data[0].data);
            setDefData(res.data[0].data)
          }else{
            setData(res.data)
            setPages(1)
          }
        })
        .catch(err =>{
            console.log(err)
            
        })
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    async function fetchcategories(){
      
      try {
        await axios.get(urls+"/categories")
        .then(res => {
          var data = res.data
          var i = 0 
          while (i<data.length){
            if (data[i].field_indicator_class === "0"){
              data.splice(i,1)
            }else{
              i++
            }
          }
          setAllcategories(data)
        })
        .catch(err =>{
            console.log(err)
            
        })
      } catch (error) {
        console.error(error);
      } finally {
        
      }
    }
    fetchdatasets();
    fetchcategories();
    fetchPopular();
  }, [keyw]);

  useEffect(() => {
    if(keyw.filters!==undefined && allcategories!==undefined){
      let newfilters = [];
      var filters = keyw.filters.split("+");
      for (let i of filters){
          if (allcategories.find(e => e.name === i)) {
            newfilters.push(i)
          }
      }
      setFilteredCTOptions(newfilters)
    }else{
      setFilteredCTOptions([])
    }
  }, [allcategories]);

  useEffect(() => {
    function handleResize() {
      setResolutionThreshold(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  useEffect(()=>{
    localStorage.setItem('backUrl', window.location.href);
  }, [window.location.href]);

  function handleButtonClick() {
    setShowPopup(true);
  }

  function closeModal() {
    setShowPopup(false);
  }
  
  var categ = "All"
  if (keyw.terms !== undefined){
    categ = keyw.terms
  }
  
  while (loading  === true) {
    return (<LoadingTransition></LoadingTransition>)
  }

  async function handleDataChange(){
    var arr = ""
    var se = []
    var up = []
    var dt = []
    var lc = []
    var ct = []
    filteredDTOptions.map(option=>(
      dt.push(option.replace("/",""))
    ))
    filteredSEOptions.map(option=>(
      se.push(option.replace("/",""))
    ))
    filteredUPOptions.map(option=>(
      up.push(option.replace("/",""))
    ))
    filteredLIOptions.map(option=>(
      lc.push(option.replace("/",""))
    ))
    filteredCTOptions.map(option=>(
      ct.push(option.replace("/",""))
    ))
    var url = urls+"/datasets/results/"+keyw.terms+"/1/"
    if (se.length !== 0){
      url = url+"spatial_extent:"+se.join(",")
    }
    if (up.length !== 0){
      url = url+"+updates:"+up.join(",")
    }
    if (dt.length !== 0){
      url = url+"+data_type:"+dt.join(",")
    }
    if (lc.length !== 0){
      url = url+"+licence:"+lc.join(",")
    }
    if (ct.length !== 0){
      url = url+"+category:"+ct.join(",")
    }
    if (se.length===0 && up.length===0 && dt.length===0 && lc.length===0 && ct.length===0){
      url = urls+"/datasets/results/"+keyw.terms+"/"+keyw.page+"/none"
    }

    const response = await axios.get(url);
    if(response.data[0]!==undefined){
      setData(response.data[0].data);
      setPages(response.data[0].pages);
    }else{
      setData(response.data)
      setPages(1)
    }
    if (se.length > 0){
      if(arr.length===0){
        arr = se.join("+")
      }else{
        arr = arr +"+"+ se.join("+")
      }
    }
    if (dt.length > 0){
      if(arr.length===0){
        arr = dt.join("+")
      }else{
        arr = arr +"+"+ dt.join("+")
      }
    }
    if (up.length > 0){
      if(arr.length===0){
        arr = up.join("+")
      }else{
        arr = arr +"+"+ up.join("+")
      }
    }
    if (lc.length > 0){
      if(arr.length===0){
        arr = lc.join("+")
      }else{
        arr = arr +"+"+ lc.join("+")
      }
    }
    if (ct.length > 0){
      if(arr.length===0){
        arr = ct.join("+")
      }else{
        arr = arr +"+"+ ct.join("+")
      }
    }
    setOnstart(arr)
    setShowPopup(false)
    navigate("/collection/"+keyw.terms.replace("amp;","")+"/1/"+arr);
  };
  
  const handleFilterSEChange = (selFilters) => {
    setFilteredSEOptions(selFilters);
  }
  const handleFilterUPChange = (selFilters) => {
    setFilteredUPOptions(selFilters);
  }
  const handleFilterDTChange = (selFilters) => {
    setFilteredDTOptions(selFilters);
  }
  const handleFilterLIChange = (selFilters) => {
    setFilteredLIOptions(selFilters);
  }
 
  const handleAddCategory = async (param) => {
    let arr = []
    filteredDTOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredSEOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredUPOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredLIOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredCTOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    arr.push(param)
    arr = [...new Set(arr)];
    arr = arr.join("+");   
    navigate("/collection/"+keyw.terms.replace("amp;","")+"/1/"+arr)
  };

  const handleRemoveCategory = async (param) => {
    let arr = []
    filteredDTOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredSEOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredUPOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredLIOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))
    filteredCTOptions.map(option=>(
      arr.push(option.replace("/",""))
    ))

    arr = arr.filter(e => e !== param);
    arr = [...new Set(arr)];
    arr = arr.join("+");
    navigate("/collection/"+keyw.terms.replace("amp;","")+"/1/"+arr)
  };

  // const handleReset = () => {
  //   setFilteredCTOptions([])    
  // }
 
  async function handleClearFilters(){
    setClear(true)
    setShowPopup(false)
    navigate("/collection/"+keyw.terms.replace("amp;","")+"/1")                                                            
  };

  const openContactus = () => {
    setModalIsOpen(true);
  };

  const closeContactus = () => {
    setModalIsOpen(false);
  };

  return (
    <Translation>
      {(t, { i18n }) => ( 
        <div style={{ overflowX: 'hidden' }}>
        <Header/>
        <HeroSec/>
          <div className="blog-section-five">
            <div className="container">
              <div className="d-flex flex-wrap justify-content-center mb-40" style={{ gap: '2px' }}>
                {(allcategories) &&  ( allcategories.map(data =>(  
                  ( (filteredCTOptions && filteredCTOptions.includes(data.name.replace("amp;","") ) ) )?(
                          <button className={"categorybuttonoutlined clicked d-flex flex-row justify-items-center align-items-center"} onClick={() => handleRemoveCategory(data.name.replace("amp;",""))} style={{backgroundColor : data.color, borderColor : data.color}}>
                            <span ><img className="categoryicon" src={process.env.PUBLIC_URL + `/assets/${data.selected_icon}`} alt="Icon" /></span>
                            <span >{data.name.replace("amp;","")} </span>
                              <Tooltip className="tooltip d-inline-block ps-3 muitoolkit" title={data.description__value} arrow placement="top-start">
                                <i className="fas fa-info-circle"></i>
                              </Tooltip>
                          </button>
                  ):(
                      <button className={"categorybuttonoutlined d-flex flex-row justify-items-center align-items-center"} onClick={() => handleAddCategory(data.name.replace("amp;",""))} style={{borderColor : data.color}}> 
                        <span ><img className="categoryicon" src={process.env.PUBLIC_URL + `/assets/${data.icon}`} alt="Icon" /></span>
                        <span >{data.name.replace("amp;","")} 
                          <Tooltip className="tooltip d-inline-block ps-3 muitoolkit" title={data.description__value} arrow placement="top-start">
                            <i className="fas fa-info-circle"></i>
                          </Tooltip>
                        </span>
                      </button>
                  )   
                )))}
              </div>
              <div className="border-bottom pb-130 lg-pb-60">
                <div className="row gx-xl-5">
                  <div className="page-bigrid">
                    <div className="col-lg-8 component-container">
                      {showPopup && (
                        <ReactModal 
                          className="Modal"
                          overlayClassName="Overlay"
                          isOpen={showPopup}
                          onRequestClose={closeModal}
                          contentLabel="Example Modal"
                          ariaHideApp={false}
                        > 
                        <div className="modal-content" style={{ height: "550px"}}>
                          <div className="scrollable-content p-2">
                            <OVSearchbar placeholder={keyw.terms}/>
                            <div className="d-flex flex-column align-items-center mt-3 mb-60 md-mb-50">
                              <h4 className="sidebar-title">Filters</h4>
                              <div className="w-50">
                                <h6 className="mt-3"> <b> Spatial Extent </b> </h6>
                                <Filter options={spatialextend} onFilterChange={handleFilterSEChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                                <h6 className="mt-3"> <b> Updates </b> </h6>
                                <Filter options={updates} onFilterChange={handleFilterUPChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                                <h6 className="mt-3"> <b> Data Type </b> </h6>
                                <Filter options={datatype} onFilterChange={handleFilterDTChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                                <h6 className="mt-3"> <b> Licence </b> </h6>
                                <Filter options={licence} onFilterChange={handleFilterLIChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                                
                              </div>  
                                                    
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <button className="filterbutton" onClick = {handleDataChange} >Apply Filters</button>
                            {(filteredSEOptions.length > 0 || filteredUPOptions.length > 0 || filteredDTOptions.length > 0 || filteredLIOptions.length > 0 || keyw.filters!==undefined) && (
                              <button className="filterbutton" onClick={handleClearFilters} >Remove filters</button>
                            )} 
                            <button  className="filterbutton"  onClick={closeModal}>Close Filters</button> 
                          </div>
                        </div> 
                        </ReactModal>
                      )}
                        {resolutionThreshold < 1200 &&(
                          <div className='page-grid'>
                            <div style={{ width: '330px' }}>
                              <button className="filterbuttonpopup" onClick={handleButtonClick}>Filters</button>
                            </div>
                          </div>
                        )
                        }
                        <div className="page-grid">
                          {(datas && datas.length!==0) ? (    
                          datas.map(data => (
                            <div key={data.nid} className="component-container dataset-card" style={{ flexGrow: 1, flexBasis: '50%' }}>
                              <DataProp image={`/assets/${data.category_icon}`} date = {data.field_uploaded_date} id = {data.nid} title = {data.title} category = {data.term_node_tid} desc = {data.field_description} color={data.category_color} />
                            </div>
                          ))):(
                            <h2>No datasets found </h2>
                          )}
                        </div>
                      <div className="page-pagination-one page-grid pt-30">
                        <ul className="d-flex align-items-center style-none">
                          {(pages>1 && pages) && (
                          Array.apply(null, { length: pages }).map((e, i) => <span  key={i}>
                            {(i+1===parseInt(keyw.page))?(
                              (keyw.filters===undefined)?(
                                <li className="active"><Link to={`/collection/${categ}/${i+1}`}>{i+1}</Link></li>
                              ):(
                                <li className="active"><Link to={`/collection/${categ}/${i+1}/${keyw.filters}`}>{i+1}</Link></li>
                              )
                            ):(
                              (keyw.filters===undefined)?(
                                <li><Link to={`/collection/${categ}/${i+1}`}>{i+1}</Link></li>
                              ):(
                                <li><Link to={`/collection/${categ}/${i+1}/${keyw.filters}`}>{i+1}</Link></li>
                              )
                            )} 
                          </span>)
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 component-container">
                      <div className="blog-sidebar md-mt-70">
                      {resolutionThreshold >= 1200 &&(
                        <>
                        <OVSearchbar placeholder={keyw.terms}/>
                        <div className="d-flex flex-column justify-content-center align-items-center dataset-sugestion-container p-2">
                          <p className="content1 text-wrap">For dataset suggestions click</p>
                          <button onClick={openContactus} className="clickable-text align-self-end mb-2">HERE</button>
                          <DatasetSuggestionPopup isOpen={modalIsOpen} closeModal={closeContactus} />
                        </div>
                        <div className="blog-sidebar-category mt-3 mb-60 md-mb-50">
                          <h4 className="sidebar-title">Filters</h4>
                          <div>
                            <h6><b>Spatial Extent</b></h6>
                            <Filter options={spatialextend} onFilterChange={handleFilterSEChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                            <h6><b>Updates</b></h6>
                            <Filter options={updates} onFilterChange={handleFilterUPChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                            <h6><b>Data Type</b></h6>
                            <Filter options={datatype} onFilterChange={handleFilterDTChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                            <h6><b>Licence</b></h6>
                            <Filter options={licence} onFilterChange={handleFilterLIChange} clear={clear} setClear={setClear} onstart={onstart} setOnstart={setOnstart}/>
                            <button className="filterbutton" onClick = {handleDataChange} >Apply Filters</button>
                            {(filteredSEOptions.length > 0 || filteredUPOptions.length > 0 || filteredDTOptions.length > 0 || filteredLIOptions.length > 0 || keyw.filters!==undefined) && (
                              <button className="filterbutton" onClick={handleClearFilters} >Remove filters</button>
                            )}                          
                          </div>
                        </div> 
                        </>
                      )}
                        <div className="sidebar-recent-news mb-60 md-mb-50">
                          <h4 className="sidebar-title">{t("PplrData")}</h4>
                          {populardata ? (
                            populardata.map(data => (
                              <PopularDataSets image={`/assets/${data.field_imageurl}`} title={data.title} id={data.nid}  date={data.field_uploaded_date}/>
                            ))
                          ):(
                            <p>No popular Datasets</p>
                          )}
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

export default Overview