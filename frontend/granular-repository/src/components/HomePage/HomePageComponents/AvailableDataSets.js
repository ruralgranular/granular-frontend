import React ,{ useState ,useEffect} from 'react'
import { Translation } from "react-i18next"
import PreviewDataset from './PreviewDataset'
import {  FetchPopular, FetchRecent } from '../../../Functions'
import LoadingTransition from '../../LoadingTransition/LoadingTransition'
import axios from "axios";
import { CategoryTile } from './CategoryTile'

function AvailableDataSets() {

    const urls = `${process.env.REACT_APP_API_URL}`;
    const [categories, setCategories] = useState();
    const [latestdatas,setLatestDatas] = useState();
    const [populardatas,setPopularDatas] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(() => {

        async function fetchLatestData() {
            
            try {
                setLoading(true);
                const response = await FetchRecent();
                setLatestDatas(response.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        async function fetchPopularData() {
            
            try {
                setLoading(true);
                const response = await FetchPopular();
                setPopularDatas(response.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        async function fetchCategories(){
      
          try {
            await axios.get(urls+"/categories")
            .then(res => {
              const data = res.data
              // let i = 0; 
              // while (i < data.length){
              //   if (data[i].field_indicator_class === "0"){
              //     data.splice(i,1)
              //   }else{
              //     i++
              //   }
              // }
              setCategories(data)
            })
            .catch(err =>{
                console.log(err)
                
            })
          } catch (error) {
            console.error(error);
          } finally {
            
          }
        }
        fetchCategories();
        fetchLatestData();
        fetchPopularData();
    },[]);
    
    while (loading  === true) {
        return (<LoadingTransition></LoadingTransition>)
    }

    return (
        <Translation>
        {(t, { i18n }) => (
            <div className="fancy-feature-fortySeven zn2 position-relative pt-130 pb-160 lg-pt-100 lg-pb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-5 wow fadeInLeft">
                            <div className="title-style-eleven text-center text-md-start sm-mb-30">
                                <h2 className="main-title tx-green">{t("AvlbleDataSts")}</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-7 wow fadeInRight">
                            <ul className="nav nav-tabs border-0 justify-content-center justify-content-md-end" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#sp1" type="button" role="tab">{t("ByCat")}</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#sp2" type="button" role="tab">{t("Ltst")}</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#sp3" type="button" role="tab">{t("MstPoplr")}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content mt-50 lg-mt-20">
                        <div className="tab-pane active show fade col-lg-9 col-12 m-auto" id="sp1">
                            <div className="d-flex flex-wrap justify-content-lg-center justify-content-center align-items-center my-3">{/*By Category*/}
                                {categories ? (
                                    categories.map(category => (
                                        <CategoryTile 
                                          categoryName={category.name}
                                          categoryColor={category.color} 
                                          categoryDescription={category.description__value}
                                          categoryIcon={category.icon}/>
                                        ))):(
                                            <p>No categories found</p>
                                        )
                                    }
                            </div>
                        </div> 
                        <div className="tab-pane show fade" id="sp2">
                            <div className="d-flex flex-wrap justify-content-center align-items-center mx-3 my-3">{/*Latest*/}
                                {latestdatas && categories ? (
                                    latestdatas.map(data => (
                                        <PreviewDataset 
                                          key={data.uuid+'recent'}
                                          title={data.title} 
                                          description={data.field_description} 
                                          id={data.nid}
                                          author={data.author}
                                          category={categories.filter((cat)=>(cat.name === data.term_node_tid))[0]}/>
                                    ))):(
                                        <p>No latest datasets found</p>
                                    )
                                }
                            </div>
                        </div> 
                        <div className="tab-pane fade" id="sp3">
                            <div className="d-flex flex-wrap justify-content-center align-items-center mx-3 my-3">{/*Most Popular*/}
                                {populardatas && categories ?(
                                    populardatas.map(data => (
                                        <PreviewDataset 
                                          key={data.uuid+'popular'}
                                          title={data.title} 
                                          description={data.field_description} 
                                          id={data.nid}
                                          author={data.author}
                                          category={categories.filter((cat)=>(cat.name === data.term_node_tid))[0]}/>
                                    ))):(
                                        <p>No popular datasets found</p>
                                    )
                                }               
                            </div>
                        </div> 
                    </div> 
                </div> 
                <img src="assets/shape_163.svg" alt="" className="lazy-img shapes shape-one"/>
            </div> 
        )}
        </Translation>
    )
}

export default AvailableDataSets