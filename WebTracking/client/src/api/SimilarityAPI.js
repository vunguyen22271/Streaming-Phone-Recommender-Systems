import {useEffect, useState} from 'react'
import axios from 'axios'
function SimilarityAPI() {
    const [similarities, setSimilarities] = useState([])
    const [list, setList] = useState([])
    useEffect(() =>{

        const getAllSimilarities = async() =>{
            const res = await axios.get('/api/details')
            setSimilarities(res.data)
        }
        getAllSimilarities()

    },[similarities])

    const getListProducts = async(id) =>{
        function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
        }
        await sleep(2000)
        const res = await axios.get(`/api/detail/${id}`)
        //console.log(res)
        if(res.data !== null){
            setList(res.data.listId)
        }
    }
    return {
        similarities: [similarities, setSimilarities],
        getListProducts: getListProducts,
        //callback: [callback, setCallback],
        list: [list, setList]
    }
}
export default SimilarityAPI
