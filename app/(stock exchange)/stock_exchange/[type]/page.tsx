"use client"

interface Trader{
    params: {type:string}
}

export default function Page({params}:Trader){
    return<>{params.type}</>
}