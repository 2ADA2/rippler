import {FPEInterface} from "@/components/forHome/fpElement";
import ETH from "../public/images/etherium.png"
import BTC from "../public/images/bitcoin.png"
import LTC from "../public/images/litecoin.png"
import {CandlestickData} from "lightweight-charts";
import {CurrencyInterface} from "@/lib/globalInterfaces";

export const traderData = {
    name: "Rippler",
    shortName: "RPL",
    price: 20.53,
    lastDay: 21.41,
    lastMax: 22.58,
    lastMin: 20.15,
    salesVol: 20485,
}

export const popularPositions: FPEInterface[] = [
    {
        imgUrl: BTC,
        short: "BTC",
        name: "Bitcoin",
        price: "€82478.82",
        activity: "-2.54%"
    },
    {
        imgUrl: LTC,
        short: "LTC",
        name: "Litecoin",
        price: "€224.92",
        activity: "-2.59%"
    },
    {
        imgUrl: ETH,
        short: "ETH",
        name: "Ethereum",
        price: "€1459.40",
        activity: "6.12%"
    },
]
export const recommendedPositions: FPEInterface[] = []


export const testChartData: CandlestickData[] = [
    {time: '2024-06-01', open: 1844.53, high: 1980.27, low: 1802.92, close: 1923.71},
    {time: '2024-06-02', open: 1923.71, high: 2091.32, low: 1894.15, close: 2005.42},
    {time: '2024-06-03', open: 2005.42, high: 2132.84, low: 1942.85, close: 2101.93},
    {time: '2024-06-04', open: 2101.93, high: 2195.77, low: 2031.58, close: 2057.13},
    {time: '2024-06-05', open: 2057.13, high: 2153.24, low: 2003.77, close: 2108.36},
    {time: '2024-06-06', open: 2108.36, high: 2281.97, low: 2083.55, close: 2242.66},
    {time: '2024-06-07', open: 2242.66, high: 2345.80, low: 2144.97, close: 2160.31},
    {time: '2024-06-08', open: 2160.31, high: 2291.01, low: 2152.46, close: 2260.85},
    {time: '2024-06-09', open: 2260.85, high: 2350.38, low: 2189.72, close: 2217.06},
    {time: '2024-06-10', open: 2217.06, high: 2381.59, low: 2173.45, close: 2332.74},
    {time: '2024-06-11', open: 2332.74, high: 2424.80, low: 2212.13, close: 2256.44},
    {time: '2024-06-12', open: 2256.44, high: 2370.17, low: 2233.04, close: 2305.71},
    {time: '2024-06-13', open: 2305.71, high: 2481.96, low: 2272.53, close: 2433.59},
    {time: '2024-06-14', open: 2433.59, high: 2582.03, low: 2321.99, close: 2542.86},
    {time: '2024-06-15', open: 2542.86, high: 2640.19, low: 2422.63, close: 2495.38},
    {time: '2024-06-16', open: 2495.38, high: 2612.71, low: 2481.50, close: 2601.34},
    {time: '2024-06-17', open: 2601.34, high: 2793.82, low: 2588.04, close: 2770.61},
    {time: '2024-06-18', open: 2770.61, high: 2879.44, low: 2722.79, close: 2802.19},
    {time: '2024-06-19', open: 2802.19, high: 2931.67, low: 2711.10, close: 2733.88},
    {time: '2024-06-20', open: 2733.88, high: 2864.80, low: 2635.77, close: 2655.42},
    {time: '2024-06-21', open: 2655.42, high: 2763.24, low: 2587.56, close: 2697.11},
    {time: '2024-06-22', open: 2697.11, high: 2835.12, low: 2672.29, close: 2820.99},
    {time: '2024-06-23', open: 2820.99, high: 2920.37, low: 2764.84, close: 2891.67},
    {time: '2024-06-24', open: 2891.67, high: 2971.23, low: 2834.71, close: 2934.01},
    {time: '2024-06-25', open: 2934.01, high: 2995.28, low: 2809.63, close: 2844.10},
    {time: '2024-06-26', open: 2844.10, high: 2880.66, low: 2715.20, close: 2758.94},
    {time: '2024-06-27', open: 2758.94, high: 2871.36, low: 2724.01, close: 2849.37},
    {time: '2024-06-28', open: 2849.37, high: 2988.79, low: 2830.44, close: 2936.13},
    {time: '2024-06-29', open: 2936.13, high: 3000.00, low: 2815.38, close: 2866.54},
    {time: '2024-06-30', open: 2866.54, high: 2948.91, low: 2795.06, close: 2887.43},
    {time: '2024-07-01', open: 2887.43, high: 2956.34, low: 2838.17, close: 2850.72},
    {time: '2024-07-02', open: 2850.72, high: 2901.78, low: 2715.82, close: 2770.14},
    {time: '2024-07-03', open: 2770.14, high: 2817.37, low: 2663.14, close: 2670.92},
    {time: '2024-07-04', open: 2670.92, high: 2708.45, low: 2591.33, close: 2643.57},
    {time: '2024-07-05', open: 2643.57, high: 2713.87, low: 2604.04, close: 2705.44},
    {time: '2024-07-06', open: 2705.44, high: 2797.01, low: 2691.15, close: 2782.46},
    {time: '2024-07-07', open: 2782.46, high: 2834.30, low: 2722.78, close: 2784.50},
    {time: '2024-07-08', open: 2784.50, high: 2882.13, low: 2755.43, close: 2812.97},
    {time: '2024-07-09', open: 2812.97, high: 2895.27, low: 2768.02, close: 2871.66},
    {time: '2024-07-10', open: 2871.66, high: 2940.21, low: 2839.88, close: 2914.12},
    {time: '2024-07-11', open: 2914.12, high: 2980.44, low: 2861.07, close: 2875.09},
    {time: '2024-07-12', open: 2875.09, high: 2920.50, low: 2764.22, close: 2789.84},
    {time: '2024-07-13', open: 2789.84, high: 2804.79, low: 2645.38, close: 2659.11},
    {time: '2024-07-14', open: 2659.11, high: 2722.41, low: 2610.43, close: 2631.95},
    {time: '2024-07-15', open: 2631.95, high: 2757.14, low: 2620.22, close: 2730.43},
    {time: '2024-07-16', open: 2730.43, high: 2801.99, low: 2674.58, close: 2680.18},
    {time: '2024-07-17', open: 2680.18, high: 2699.70, low: 2590.84, close: 2608.33},
    {time: '2024-07-18', open: 2608.33, high: 2632.52, low: 2510.42, close: 2561.74},
    {time: '2024-07-19', open: 2561.74, high: 2617.53, low: 2505.55, close: 2572.40},
    {time: '2024-07-20', open: 2572.40, high: 2650.21, low: 2533.66, close: 2641.12},
    {time: '2024-07-21', open: 2641.12, high: 2750.82, low: 2604.48, close: 2701.57},
    {time: '2024-07-22', open: 2701.57, high: 2794.04, low: 2675.63, close: 2752.91},
    {time: '2024-07-23', open: 2752.91, high: 2843.88, low: 2704.70, close: 2719.53},
    {time: '2024-07-24', open: 2719.53, high: 2790.62, low: 2670.01, close: 2695.17},
    {time: '2024-07-25', open: 2695.17, high: 2785.50, low: 2661.87, close: 2760.38},
    {time: '2024-07-26', open: 2760.38, high: 2864.90, low: 2700.10, close: 2837.42},
    {time: '2024-07-27', open: 2837.42, high: 2908.17, low: 2811.12, close: 2874.99},
    {time: '2024-07-28', open: 2874.99, high: 2964.01, low: 2832.11, close: 2907.50},
    {time: '2024-07-29', open: 2907.50, high: 3000.00, low: 2844.84, close: 2972.21},
    {time: '2024-07-30', open: 2972.21, high: 2990.33, low: 2818.22, close: 2833.44},
    {time: '2024-07-31', open: 2833.44, high: 2855.17, low: 2754.50, close: 2766.93},
    {time: '2024-08-01', open: 2766.93, high: 2799.22, low: 2668.48, close: 2697.14},
    {time: '2024-08-02', open: 2697.14, high: 2755.67, low: 2602.31, close: 2635.88},
    {time: '2024-08-03', open: 2635.88, high: 2672.93, low: 2550.11, close: 2579.41},
    {time: '2024-08-04', open: 2579.41, high: 2607.33, low: 2477.38, close: 2513.92},
    {time: '2024-08-05', open: 2513.92, high: 2571.23, low: 2453.40, close: 2465.76},
    {time: '2024-08-06', open: 2465.76, high: 2499.61, low: 2401.19, close: 2439.84},
    {time: '2024-08-07', open: 2439.84, high: 2543.33, low: 2414.93, close: 2527.55},
    {time: '2024-08-08', open: 2527.55, high: 2631.50, low: 2517.12, close: 2617.79},
    {time: '2024-08-09', open: 2617.79, high: 2684.73, low: 2584.28, close: 2602.49},
    {time: '2024-08-10', open: 2602.49, high: 2653.18, low: 2560.99, close: 2597.71},
    {time: '2024-08-11', open: 2597.71, high: 2679.91, low: 2551.34, close: 2670.28},
    {time: '2024-08-12', open: 2670.28, high: 2763.20, low: 2624.87, close: 2699.54},
    {time: '2024-08-13', open: 2699.54, high: 2781.40, low: 2659.41, close: 2770.03},
    {time: '2024-08-14', open: 2770.03, high: 2825.60, low: 2733.66, close: 2754.38}
]