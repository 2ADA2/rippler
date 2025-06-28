"use client"
import {Box, Container} from "@mui/system";
import {positions, tips} from "@/utils/stock_exchange_text";
import {useEffect, useState} from "react";
import {Filter} from "@/components/forCharts/filter";
import "./stock_exchange.scss"
import {SECard, SECardInterface} from "@/components/forCharts/secard";
import {SwiperSlide} from "swiper/react";
import 'swiper/css'
import {Swiper} from "swiper/react";

export default function Page() {
    const [randTip, setRandTip] = useState(tips[Math.floor(Math.random() * tips.length)]);
    const [filter, setFilter] = useState<Set<string>>(new Set());
    const [sortedPositions, setSortedPositions] = useState<SECardInterface[]>(positions);

    const updateFilter = (filterName: string) => {
        let newFilter = new Set(filter);
        filter.has(filterName) ? newFilter.delete(filterName) : newFilter.add(filterName)
        setFilter(newFilter)

        if (!newFilter.size) {
            setSortedPositions(positions)
            return
        }
        setSortedPositions(positions.filter(position => {
            for (let i of newFilter) {
                if (!position.categories.includes(i)) {
                    return false;
                }
            }
            return true
        }))
    }

    return (
        <>
            <Container sx={{display: "flex", justifyContent: "center"}}>
                <Box component="section" sx={{p: 2, border: '1px dashed grey', textAlign: "center", maxWidth: 600}}>
                    {randTip}
                </Box>
            </Container>
            <Container sx={{display: "flex", flexDirection: "column", gap: 1}}>
                <h3 style={{fontSize: "24px"}}>Filter</h3>
                <Box className={"filter-select"}>
                    <Filter value={"for beginners"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                    <Filter value={"huge corporations"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                    <Filter value={"popular"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                </Box>
                <Box className={"filter-select"}>
                    <Filter value={"stability"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                    <Filter value={"hardcore"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                    <Filter value={"low-price"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                    <Filter value={"high-price"} filter={filter} callback={(val: string) => updateFilter(val)}/>
                </Box>
            </Container>
            <Container maxWidth={"xl"}>
                {
                    sortedPositions.length === 0 && <div>no such positions</div>
                }
                {sortedPositions.length > 0 &&
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto"
                        className={"catalogue-container"}
                    >
                        {sortedPositions.slice(0, 5).map((position, id) => (
                            <SwiperSlide key={id} style={{width: "500px"}}>
                                <SECard
                                    name={position.name}
                                    description={position.description}
                                    categories={position.categories}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
                {sortedPositions.length > 5 &&
                    <Swiper
                        spaceBetween={20}
                        slidesPerView="auto"
                        className={"catalogue-container"
                        }
                    >
                        {sortedPositions.slice(5, 9).map((position, id) => (
                            <SwiperSlide key={id} style={{width: "500px"}}>
                                <SECard
                                    name={position.name}
                                    description={position.description}
                                    categories={position.categories}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
            </Container>
        </>
    );
}
;
