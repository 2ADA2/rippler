"use client"
import {FormControl, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import React, {ReactNode, useEffect, useState} from "react";
import {Theme, ThemeProvider} from "@mui/system";
import {useParams} from "next/navigation";
import {StaticImageData} from "next/image";
import {IMAGES} from "@/utils/images";

interface Props {
    data: any;
    theme: Theme;
    currency: string | ReactNode,
    value: number,
    label: string,
    change: (val: number) => void,
}

const sxBase = {
    color: 'white',
    height: '50px',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#cfd8dc',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
    },
}

export function InputForm({data, theme, currency, value, label, change}: Props) {
    const [count, setCount] = useState<number | string>(value);
    useEffect(() => {
        setCount(value)
    }, [value]);

    const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (e.key === 'Enter') {
            if (isNaN(Number(value))) {
                setCount(0);
                change(0);
                e.currentTarget.blur()
            } else {
                setCount(Number(value));
                change(Number(value));
                e.currentTarget.blur()
            }
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (isNaN(Number(value))) {
            setCount(0);
            change(0);
        } else {
            setCount(Number(value));
            change(Number(value));
        }
    }

    const handle = (val: string) => {
        let m: string[] = val.split("")

        let l = m.map(e => {
            if (e === ",") {
                return "."
            }
            return e
        })
        if (l[0] === "0" && l[1] !== "." && l.length > 1) {
            l = l.slice(1, l.length);
        }
        if(!l.length){
            l = ["0"]
        }

        console.log(l.join(""))
        setCount(l.join(""))
    }


    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                <InputLabel
                    htmlFor="outlined-adornment-amount"
                    sx={{
                        color: '#f5f5f5',
                        backgroundColor: '#181a20',
                        paddingRight: '4px',
                        '&.Mui-focused': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {label}
                </InputLabel>
                <OutlinedInput
                    type={"text"}
                    value={count}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleChange(e)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
                    onChange={(e) => handle(e.target.value)}
                    sx={sxBase}
                    startAdornment={
                        <InputAdornment position="start" sx={{color: 'white'}}>
                            <Typography sx={{color: 'white', width: 30, textAlign: "center"}}>{currency}</Typography>
                        </InputAdornment>}
                    label={"Sell " + data.shortName}
                />
            </FormControl>
        </ThemeProvider>
    )
}