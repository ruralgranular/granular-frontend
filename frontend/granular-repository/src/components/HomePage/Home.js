import React ,{ lazy ,Suspense } from 'react'
// import Footer from '../Footer/Footer'
// import Header from '../Header/Header'
// import HeroSection from './HomePageComponents/HeroSection'
// import CategorySection from './HomePageComponents/CategorySection'
// import Aboutus from './HomePageComponents/Aboutus'
// import Support from './HomePageComponents/Support'
// import QuestionsAndAnswers from './HomePageComponents/QuestionsAndAnswers'
// import ContactUs from './HomePageComponents/ContactUs'
// import AvailableDataSets from './HomePageComponents/AvailableDataSets'
// import ProjectInfoSection from './HomePageComponents/ProjectInfoSection'


function Home() {
  const Header = lazy(() => import('../Header/Header'));
  const HeroSection = lazy(() => import('./HomePageComponents/HeroSection'));
  const ProjectInfoSection = lazy(() => import('./HomePageComponents/ProjectInfoSection'));
  const AvailableDataSets = lazy(() => import('./HomePageComponents/AvailableDataSets'));
  const Support = lazy(() => import('./HomePageComponents/Support'));
  const QuestionsAndAnswers = lazy(() => import('./HomePageComponents/QuestionsAndAnswers'));
  const ContactUs = lazy(() => import('./HomePageComponents/ContactUs'));
  const Footer = lazy(() => import('../Footer/Footer'));
  return (
    <div>  
        <div>
          <Suspense>
            <Header />
            <HeroSection/>
            <ProjectInfoSection/>
            <AvailableDataSets/>
            {/* <Aboutus image = {"/assets/digital.jpg"} /> */}
            <Support/>
            <QuestionsAndAnswers/>
            <ContactUs/>
            <Footer />
          </Suspense>
        </div>
    </div>
  )
}

export default Home