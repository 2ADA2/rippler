"use client"
import {FormControl, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import React, {ReactNode} from "react";
import {Theme, ThemeProvider} from "@mui/system";
import {useParams} from "next/navigation";
import {StaticImageData} from "next/image";
import {IMAGES} from "@/utils/images";

interface Props {
    data: any;
    theme: Theme;
    currency: string | ReactNode,
    value: number,
    label : string,
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

export function InputForm({data, theme, currency, value, label}: Props) {
    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth sx={{m: 1}} variant="outlined">
                <InputLabel
                    htmlFor="outlined-adornment-amount"
                    sx={{
                        color: '#f5f5f5',
                        backgroundColor: '#121212',
                        paddingRight: '4px',
                        '&.Mui-focused': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {label}
                </InputLabel>
                <OutlinedInput
                    value={value}
                    sx={sxBase}
                    startAdornment={
                        <InputAdornment position="start" sx={{color: 'white'}}>
                            <Typography sx={{ color: 'white', width:30, textAlign:"center"}}>{currency}</Typography>
                        </InputAdornment>}
                    label={"Sell " + data.shortName}
                />
            </FormControl>
        </ThemeProvider>
    )
}