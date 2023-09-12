import React from 'react'
import { Translation } from "react-i18next"
import QnA from './QnA'
import { useEffect, useState } from 'react'
import { FetchQnA } from '../../../Functions'
import LoadingTransition from '../../LoadingTransition/LoadingTransition'

function QuestionsAndAnswers() {

    const [qna, setQna] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchQnaData () {
        try {
          setLoading(true);
          const response = await FetchQnA();
          setQna(response.data);
        } catch (error) {
          console.error(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }

      fetchQnaData();
    }, []);

    while (loading === true) {
      return (<LoadingTransition></LoadingTransition>)
    }
    
    return (
        <Translation>
        {(t, { i18n }) => (
        <div className="fancy-feature-fifty position-relative mt-200 lg-mt-100">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 wow fadeInLeft">
                        <div className="title-style-five">
                            <h2 className="main-title fw-500 tx-dark">{t("QnA")}</h2>
                        </div> 
                    </div>
                    <div className="col-xl-7 col-lg-6 ms-auto wow fadeInRight">
                        <div className="accordion accordion-style-seven md-mt-60" id="accordionOne">
                            {qna.length > 0 && qna.map((qna)=>
                                <div className="accordion-item" key={qna.id}>
                                    <QnA question = {qna.question} answer={qna.answer} id={qna.id} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div> 
            <img src="/assets/shape163" alt="" className="lazy-img shapes shape-one"/>
        </div> 
        )}
        </Translation>
    )
}

export default QuestionsAndAnswers