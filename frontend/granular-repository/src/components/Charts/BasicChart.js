import React,{useState} from 'react'
import ReactECharts from 'echarts-for-react';
import { useMediaQuery } from 'react-responsive';
import MetadataModal from './MetadataModal';
import { createMyMetadataViewFeature, createMyDownloadCSVFeature } from './toolboxFeatures.js';


function BasicChart(props) {
    const [showPopup, setShowPopup] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 400px)` });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const myMetadataViewFeature = createMyMetadataViewFeature(setShowPopup);
    const myDownloadCSVFeature = createMyDownloadCSVFeature((props.chartData !== undefined) ? props.chartData.name : 'chart');

    const option = {
        xAxis: {
            type: 'category',
            data: props.chartData.values.map(item=>item.name),
            axisLabel: { interval: 0, rotate: 30 }
        },
        yAxis: {
            type: 'value'
        },
        title: {
            text: (props.chartData!==undefined) ? props.chartData.name : "",
            textStyle: {
                fontSize : isTablet ? 14 : 18
            }
        },
        toolbox: {
            show: true,
            itemsize:'40',
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
            formatter: '{b} : {c}% '
            },
        series: [
            {
            data: (props.chartData!==undefined) ? props.chartData.values : [],
            type: 'bar'
            }
        ]
        };
  return    <div>
      {(props.chartData!==undefined) && (
            <div>
                <ReactECharts option={option} className="visuals"/>
                <MetadataModal name={props.chartData.name} values = {props.chartData.values} showPopup={showPopup} setShowPopup={setShowPopup} type="Bar"/>
            </div>
            )}
        </div>
}

export default BasicChart