import React,{useState} from 'react'
import ReactECharts from 'echarts-for-react';
import { useMediaQuery } from 'react-responsive';
import MetadataModal from './MetadataModal';
import { createMyMetadataViewFeature, createMyDownloadCSVFeature } from './toolboxFeatures.js';

    
function NightingaleChart(props) {
    const [showPopup, setShowPopup] = useState(false);

    const isMobile = useMediaQuery({ query: `(max-width: 400px)` });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' })

    const myMetadataViewFeature = createMyMetadataViewFeature(setShowPopup);
    const myDownloadCSVFeature = createMyDownloadCSVFeature((props.chartData !== undefined) ? props.chartData.name : 'chart');

    const option = {
        legend: {
            top: 'bottom',
            type: (props.chartData!==undefined && props.chartData.values.length > 11) ? 'scroll' : 'plain',
        },
        toolbox: {
            show: true,
            itemGap: 10,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
                myMetadataView: myMetadataViewFeature,
                myDownloadCSV: myDownloadCSVFeature,
            },
            top: "5%",
            left: "0"
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
            },
        title: {
            text: (props.chartData!==undefined) ? props.chartData.name : "",
            textStyle: {
                fontSize : isTablet ? 18 : 18,
                ellipsis : "..."
            }, 
        },
        series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [30, isTablet ? 130 : 170],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
            borderRadius: 8
            },
            data: (props.chartData!==undefined) ? props.chartData.values : [],
        }
        ]
    };

        return  <div>
                {(props.chartData!==undefined) && (
                    <div>
                        <ReactECharts option={option} className="" style={{width: isTablet ? "360px":"500px" , height:isTablet ? "500px":"600px"}} />
                        <MetadataModal name={props.chartData.name} values = {props.chartData.values} showPopup={showPopup} setShowPopup={setShowPopup} type="Nightingale"/>
                    </div>
                )}
            </div>
};
    
export default NightingaleChart