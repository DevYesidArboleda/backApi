import axios from 'axios';
import {React, useEffect, useState} from 'react'

function ListPage() {
    const [data, setData] = useState(null);

    /*useEffect(()=>{
        fetch("https://offcorss.myvtex.com/api/catalog_system/pub/products/search/").then((response) => response.json()).then((data)=>setData(data))
    }, [])*/

    const fetchData = () => {
        return axios.get("http://offcorss.myvtex.com/api/catalog_system/pub/products/search/",{headers:{"Access-Control-Allow-Origin":"*"}}).then((response) => response.json()).then((data)=>setData(data))
    }

    useEffect(()=>{
        fetchData()
    }, [])

    console.log(data)
  return (
    <div>ListPage</div>
  )
}

export default ListPage