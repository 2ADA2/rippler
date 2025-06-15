'use client';

import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

export const SChart = (props:any) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            width: containerRef.current.clientWidth,
            height: 300,
            layout: {
                background: { color: '#1c1c1c' },
                textColor: 'white',
            }
        });

        // ⬅️ Важно: используем addSeries с типом
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        candlestickSeries.setData([
            { time: '2024-06-10', open: 100, high: 110, low: 90, close: 105 },
            { time: '2024-06-11', open: 105, high: 115, low: 95, close: 100 },
            { time: '2024-06-12', open: 100, high: 120, low: 85, close: 110 },
            { time: '2024-06-13', open: 110, high: 125, low: 105, close: 120 },
            { time: '2024-06-14', open: 120, high: 130, low: 115, close: 125 },
            { time: '2024-06-15', open: 125, high: 135, low: 120, close: 130 },
            { time: '2024-06-16', open: 130, high: 138, low: 128, close: 134 },
            { time: '2024-06-17', open: 134, high: 140, low: 130, close: 136 },
            { time: '2024-06-18', open: 136, high: 142, low: 132, close: 135 },
            { time: '2024-06-19', open: 135, high: 145, low: 133, close: 143 },
            { time: '2024-06-20', open: 143, high: 150, low: 140, close: 148 },
            { time: '2024-06-21', open: 148, high: 155, low: 145, close: 150 },
            { time: '2024-06-22', open: 150, high: 158, low: 149, close: 156 },
            { time: '2024-06-23', open: 156, high: 160, low: 152, close: 157 },
            { time: '2024-06-24', open: 157, high: 162, low: 154, close: 160 },
            { time: '2024-06-25', open: 160, high: 165, low: 155, close: 158 },
            { time: '2024-06-26', open: 158, high: 163, low: 150, close: 151 },
            { time: '2024-06-27', open: 151, high: 155, low: 145, close: 149 },
        ]);
        chart.timeScale().fitContent();

        const handleResize = () => {
            chart.applyOptions({ width: containerRef.current!.clientWidth });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%' }} />;
}
