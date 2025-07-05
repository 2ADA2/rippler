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

const initialData: CandlestickData[] = [
    { time: '2018-12-22', open: 32.5, high: 33.0, low: 31.5, close: 32.0 },
    { time: '2018-12-23', open: 32.0, high: 32.5, low: 30.5, close: 31.0 },
    { time: '2018-12-24', open: 31.0, high: 31.2, low: 26.0, close: 27.0 },
    { time: '2018-12-25', open: 27.0, high: 27.5, low: 26.5, close: 27.3 },
    { time: '2018-12-26', open: 27.3, high: 28.0, low: 24.5, close: 25.1 },
    { time: '2018-12-27', open: 25.1, high: 29.0, low: 25.0, close: 28.9 },
    { time: '2018-12-28', open: 28.9, high: 29.5, low: 25.2, close: 25.4 },
    { time: '2018-12-29', open: 25.4, high: 26.0, low: 23.5, close: 23.9 },
    { time: '2018-12-30', open: 23.9, high: 24.0, low: 22.5, close: 22.6 },
    { time: '2018-12-31', open: 22.6, high: 23.0, low: 22.0, close: 22.7 },
];

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
    const {stockCurrentData, stockData} = useAppSelector(state => state.stockReducer)
    const [history, setHistory] = useState<StockHistoryInterface | null>(null);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const lastCloseRef = useRef<number>(initialData[initialData.length - 1].close);

    useEffect(() => {
        if(!history){
            setHistory(stockData)
        }
    }, [stockData]);

    useEffect(() => {
        if (!chartContainerRef.current || !stockData) return;
        if(!stockData["Rippler"]) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor },
                textColor: colors.textColor,
            },
            localization:{
                locale:"en-US",
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

        candleSeries.setData(stockData["Rippler"]);
        seriesRef.current = candleSeries;

        chart.timeScale().fitContent();

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    crosshair:{
                        mode:0, 
                    }
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
            const rawCandle = stockCurrentData["Rippler"];
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

    return <div ref={chartContainerRef} style={{ width: '99.9%', height: 300, margin:"auto" }} />;
};
