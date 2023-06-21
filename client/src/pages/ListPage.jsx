import axios from 'axios';
import {React, useEffect, useState} from 'react'

function ListPage() {
    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch("/api/catalog_system/pub/products/search/").then((response) => response.json()).then((data)=>setData(data))
    }, [])
    
    console.log(data)
  return (
    <div>
    </div>
  )
}

export default ListPage