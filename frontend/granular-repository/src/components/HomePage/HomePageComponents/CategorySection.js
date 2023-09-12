import React,{useState,useEffect} from 'react'
import { Translation } from "react-i18next"
import { FetchCategories , FetchSortedCategories} from '../../../Functions';
import LoadingTransition from '../../LoadingTransition/LoadingTransition';
import CategoryCard from './CategoryCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function CategorySection() {
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState()
    const [currentSlide, setCurrentSlide] = useState(0);
    const [categtoshow,setCategoriestoshow] = useState();
    const handleClickPrev = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const handleClickNext = () => {
        setCurrentSlide(currentSlide + 1);
    };
    
    useEffect(() => {
        async function fetchcategories() {
            
            try {
                setLoading(true);
                const response = await FetchCategories();
                setCategories(response.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchcategories();
    },[]);

    useEffect(()=>{
        async function fetchsorted(){
            try {
                setLoading(true);
                const response = await FetchSortedCategories();
                setCategoriestoshow(response.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        if(categories!==undefined){
            fetchsorted()
        }
    },[categories])

    while (loading  === true) {
        return (<LoadingTransition></LoadingTransition>)
    }

    return (
        <Translation>
            {(t, { i18n }) => (
                <div className="fancy-feature-fortySix position-relative">
                    <div className="container">
                        <div className="line-bg-wrapper position-relative pt-200 pb-180 lg-pt-120 md-pb-130">
                            <div className="row align-items-center">
                                <div className="col-lg-6 wow fadeInLeft">
                                    <div className="title-style-eleven md-mb-20">
                                        <h2 className="main-title tx-dark">{t("GranDigPlat")}</h2>
                                    </div>
                                </div>
                                <div className="col-lg-5 ms-auto wow fadeInRight">
                                    <p className="text-lg m0">{t("GranDigPlatDesc")}</p>
                                </div>
                            </div>
                            <div className="row gx-xxl-5 pt-90 lg-pt-40 md-pt-20"> 
                                {categtoshow ?(
                                    <div style={{display:"flex"}}>
                                        {currentSlide!==0 ? (<button className="leftbutton" onClick={handleClickPrev}><ArrowBackIosNewIcon/></button>):(<button className="leftbutton"><ArrowBackIosNewIcon/></button>)}
                                        <CategoryCard title = {categtoshow[currentSlide].name} picture = {`/assets/${categtoshow[currentSlide].name}.jpg`} desc={categtoshow[currentSlide].description__value} />
                                        <CategoryCard title = {categtoshow[currentSlide+1].name} picture = {`/assets/${categtoshow[currentSlide+1].name}.jpg`} desc={categtoshow[currentSlide+1].description__value} />
                                        <CategoryCard title = {categtoshow[currentSlide+2].name} picture = {`/assets/${categtoshow[currentSlide+2].name}.jpg`} desc={categtoshow[currentSlide+2].description__value} />
                                        {currentSlide!==categtoshow.length-3 ? (<button className="rightbutton" onClick={handleClickNext}><ArrowForwardIosIcon /></button>):(<button className="rightbutton inactive" >Next</button>)}
                                    </div>
                                ):(
                                    <p>No categories found</p> 
                                )}
                            </div>
                            <div className="quote-wrapper text-center mt-120 lg-mt-80 wow fadeInUp">
                                <div className="row">
                                    <div className="col-md-10 m-auto">
                                        <p className="tx-dark mt-25 mb-30 fw-500">{t("GranSuppDig")}</p>
                                    </div>
                                </div>
                            </div> 
                            <div className="shapes shape-two">
                                <img src="/assets/Hexagon5.png" alt="" className="lazy-img " />
                            </div>
                                <img src="/assets/shape_162.svg"alt="" className="lazy-img shapes shape-three"/>
                            <div className="shapes shape-five">
                                <img src="/assets/Hexagon5.png" alt="" className="lazy-img " />
                            </div>
                            <div className="shapes shape-six">
                                <img src="/assets/Hexagon2.png" alt="" className="lazy-img " />
                            </div>
                        </div> 
                    </div> 
                </div>
            )}
        </Translation>
    )
}

export default CategorySection