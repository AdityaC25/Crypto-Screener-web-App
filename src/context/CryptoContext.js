import { createContext, useLayoutEffect, useState } from "react";


//step1:create context object
export const CryptoContext = createContext({});

//step2:create the provider component

export const CryptoProvider = ({children}) =>{
   
    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();

 const getCryptoData = async () =>{
    try {
        const data = await fetch( `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`).then(res => res.json()).then(json => json);

        setCryptoData(data);
        console.log(data);
        

    } catch (error) {
        console.log(error);
    }
 }

 const getSearchResult = async (query) =>{
    try {
        const data = await fetch( `https://api.coingecko.com/api/v3/search?query=${query}`).then(res => res.json()).then(json => json);

        setSearchData(data);
        console.log(data);
        

    } catch (error) {
        console.log(error);
    }
 }

 useLayoutEffect(() => {
   getCryptoData();
 }, [])
  
    return (
        <CryptoContext.Provider value={{ cryptoData ,searchData,getSearchResult }}>
              {children}
        </CryptoContext.Provider>
    )
}
