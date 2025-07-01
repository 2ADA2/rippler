'use client';

import React, {useEffect, useRef, useState} from 'react';
import {createChart, CandlestickSeries, CandlestickData} from 'lightweight-charts';
import {testChartData} from "@/utils/testData";
import {ChartData} from "@/utils/models";
import {useAppSelector} from "@/lib/hooks";
import {StockHistoryInterface, StockInterface} from "@/lib/globalInterfaces";

export const MainChart: React.FC<ChartData> = React.memo(({data}:ChartData) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {stockCurrentData} = useAppSelector(state => state.stockReducer)
    const [lastData, setLastData] = useState();

    useEffect(() => {
        if("Rippler" in stockCurrentData){
            console.log(stockCurrentData["Rippler"])
        }

    }, [stockCurrentData]);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
            layout: {
                background: {color: 'rgba(255, 0, 0, 0)'},
                textColor: 'white',
            },
            grid: {
                vertLines: {
                    color: 'rgba(255,255,255,0.2)',
                },
                horzLines: {
                    color: 'rgba(255,255,255,0.2)',
                }
            }
        });

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        candlestickSeries.setData(data);



        const currentLocale = window.navigator.languages[0];
        const myPriceFormatter = Intl.NumberFormat(currentLocale, {
            style: 'currency',
            currency: 'EUR', // Currency for data points
        }).format;


        chart.applyOptions({
            timeScale: {
                timeVisible: false,
                secondsVisible: false,
            },
            localization: {
                locale: "en-US",
                priceFormatter:myPriceFormatter
            },
            layout:{
                fontFamily:"Inter"
            },
            crosshair:{
                mode:0,
            }
        })

        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current) {
                chart.resize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };

    }, [data]);

    return <div ref={containerRef} className={"chart"}/>;
});
