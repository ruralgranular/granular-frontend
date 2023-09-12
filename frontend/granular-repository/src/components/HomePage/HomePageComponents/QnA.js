import React from 'react'
import { Translation } from 'react-i18next'

function QnA(props) {
    const dbt = "#collapse"+props.id
    const ac = "collapse"+props.id
    
    return (
        <Translation>
        {(t, { i18n }) => (
            <div>
                <div className="accordion-header" id={props.id}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={dbt} aria-expanded="false" aria-controls={ac}>
                        {t(props.question)}
                    </button>
                </div>
                <div id={ac} className="accordion-collapse collapse" aria-labelledby={props.id} data-bs-parent="#accordionOne">
                    <div className="accordion-body" dangerouslySetInnerHTML={{__html:props.answer}}>
                    </div>
                </div>
            </div>
        )}
        </Translation>
    )
}

export default QnA