'use client';

import {
    createChart,
    ColorType,
    CandlestickData,
    IChartApi,
    ISeriesApi,
    CandlestickSeries,
} from 'lightweight-charts';
import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "@/lib/hooks";
import {StockHistoryInterface} from "@/lib/globalInterfaces";
import {useParams} from "next/navigation";
import {NAMES} from "@/utils/names";

const colors = {
    backgroundColor: '#181a20',
    textColor: 'white',
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
};

export const MainChart: React.FC = () => {
    const params: { type: string } = useParams()
    const name: string = NAMES[params.type];
    const {stockCurrentData, stockData} = useAppSelector(state => state.stockReducer)
    const [history, setHistory] = useState<StockHistoryInterface | null>(null);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {
        if(!history){
            setHistory(stockData)
        }
    }, [stockData]);

    useEffect(() => {
        if (!chartContainerRef.current || !stockData) return;
        if(!stockData[name]) return;

        const currentLocale = window.navigator.languages[0];
        const myPriceFormatter = Intl.NumberFormat(currentLocale, {
            style: 'currency',
            currency: 'EUR', // Currency for data points
        }).format;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor },
                textColor: colors.textColor,
            },
            localization:{
                locale:"en-US",
                priceFormatter:myPriceFormatter,
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            grid:{
                vertLines: {
                    visible:false,

                },
                horzLines: {
                    color:'#252931',
                }
            },
            crosshair:{
                mode:0
            }
        });

        chartRef.current = chart;

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: colors.upColor,
            downColor: colors.downColor,
            wickUpColor: colors.wickUpColor,
            wickDownColor: colors.wickDownColor,
            borderVisible: false,
        });

        candleSeries.setData(stockData[name]);
        seriesRef.current = candleSeries;

        chart.timeScale().fitContent();

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,

                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [history]);

    useEffect(() => {
        if (stockCurrentData && seriesRef.current) {
            const rawCandle = stockCurrentData[name];
            if (rawCandle) {
                const candle = { ...rawCandle }; // Создаём копию

                // Убедись, что time — в правильном формате:
                if (typeof candle.time === "string") {
                    candle.time = candle.time as string; // "YYYY-MM-DD"
                }
                seriesRef.current.update(candle);
            }
        }
    }, [stockCurrentData]);

    return <div ref={chartContainerRef} style={{height: "100%", margin:"auto", width:"100%" }} />;
};
