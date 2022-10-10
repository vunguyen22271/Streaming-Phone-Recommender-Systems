import {useState, useEffect} from 'react'
import axios from 'axios'
function ProductsAPI() {

    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [screenSize, setScreenSize] = useState('')
    const [ram, setRam] = useState("")
    const [camera, setCamera] = useState('')
    const [memory, setMemory] = useState('')
    const [sort, setSort] = useState('')
    const [status, setStatus] = useState('')
    const [color, setColor] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    useEffect(() =>{
        const getProducts = async () =>{
            // title
            if(ram === '' && screenSize === '' && memory ==='' && camera ==='' && status==='' && color===''){
                const t = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&title[regex]=${search}`)
                setProducts(t.data.products)
                setResult(t.data.result)
            }
            // Ram
            else if(ram !== '' && screenSize ==="" && memory ==='' && camera ==='' && status==='' && color===''){
                const r = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}`)
                setProducts(r.data.products)
                setResult(r.data.result)
            }
            // screenSize
            else if(ram === '' && screenSize !=="" && memory ==='' && camera ===''&& status==='' && color===''){
                const s = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}`)
                setProducts(s.data.products)
                setResult(s.data.result)
            }
            // camera
            else if(ram === '' && screenSize ==="" && memory ==='' && camera !==''&& status==='' && color===''){
                const c = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&camera=${camera}`)
                setProducts(c.data.products)
                setResult(c.data.result)
            }
            // memory
            else if(ram === ''&& screenSize ==="" && memory !=='' && camera ===''&& status==='' && color===''){
                const m = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}`)
                setProducts(m.data.products)
                setResult(m.data.result)
            }
            // status
            else if(ram === ''&& screenSize ==="" && memory ==='' && camera ===''&& status!=='' && color===''){
                const m = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&status=${status}`)
                setProducts(m.data.products)
                setResult(m.data.result)
            }
            // color
            else if(ram === ''&& screenSize ==="" && memory ==='' && camera ===''&& status==='' && color!==''){
                const m = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&color=${color}`)
                setProducts(m.data.products)
                setResult(m.data.result)
            }
            // ram and screenSize
            else if(ram !== '' && screenSize !=="" && memory ==='' && camera ===''&& status==='' && color==='') {
                const rc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}`)
                setProducts(rc.data.products)
                setResult(rc.data.result)
            }
            // ram and memory
            else if(ram !== ''&& screenSize ==="" && memory !=='' && camera ===''&& status==='' && color===''){
                const rm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&memory=${memory}`)
                setProducts(rm.data.products)
                setResult(rm.data.result)
            }
            // ram and camera
            else if(ram !== ''&& screenSize ==="" && memory ==='' && camera !==''&& status==='' && color===''){
                const rc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&camera=${camera}`)
                setProducts(rc.data.products)
                setResult(rc.data.result)
            }
            // ram and status
            else if(ram !== ''&& screenSize ==="" && memory ==='' && camera ===''&& status!=='' && color===''){
                const rc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&status=${status}`)
                setProducts(rc.data.products)
                setResult(rc.data.result)
            }
            // ram and color
            else if(ram !== ''&& screenSize ==="" && memory ==='' && camera ===''&& status==='' && color!==''){
                const rc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&color=${color}`)
                setProducts(rc.data.products)
                setResult(rc.data.result)
            }
            // screenSize and memory
            else if(ram === ''&& screenSize !=="" && memory !=='' && camera ===''&& status==='' && color===''){
                const sm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&memory=${memory}`)
                setProducts(sm.data.products)
                setResult(sm.data.result)
            }
            // screenSize and camera
            else if(ram === '' && screenSize !=="" && memory ==='' && camera !==''&& status==='' && color===''){
                const sc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&camera=${camera}`)
                setProducts(sc.data.products)
                setResult(sc.data.result)
            }
            // screenSize and status
            else if(ram === '' && screenSize !=="" && memory ==='' && camera ===''&& status !=='' && color===''){
                const sc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&status=${status}`)
                setProducts(sc.data.products)
                setResult(sc.data.result)
            }
            // screenSize and color
            else if(ram === '' && screenSize !=="" && memory ==='' && camera ===''&& status ==='' && color!==''){
                const sc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&color=${color}`)
                setProducts(sc.data.products)
                setResult(sc.data.result)
            }
            // memory and camera
            else if(ram === '' && screenSize ==="" && memory !=='' && camera !==''&& status==='' && color===''){
                const cm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}&camera=${camera}`)
                setProducts(cm.data.products)
                setResult(cm.data.result)
            }
            // memory and status
             else if(ram === '' && screenSize ==="" && memory !=='' && camera ===''&& status !=='' && color===''){
                const cm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}&status=${status}`)
                setProducts(cm.data.products)
                setResult(cm.data.result)
            }
            // memory and color
             else if(ram === '' && screenSize ==="" && memory !=='' && camera ===''&& status==='' && color!==''){
                const cm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}&color=${color}`)
                setProducts(cm.data.products)
                setResult(cm.data.result)
            }
            // camera and status
            else if(ram === '' && screenSize ==="" && memory ==='' && camera !==''&& status!=='' && color!==''){
                const cm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&camera=${camera}&status=${status}`)
                setProducts(cm.data.products)
                setResult(cm.data.result)
            }
            // camera and color
            else if(ram === '' && screenSize ==="" && memory ==='' && camera !==''&& status==='' && color!==''){
                const cm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&camera=${camera}&color=${color}`)
                setProducts(cm.data.products)
                setResult(cm.data.result)
            }
            // status and color
            else if(ram === '' && screenSize ==="" && memory ==='' && camera ===''&& status!=='' && color!==''){
                const cm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&status=${status}&color=${color}`)
                setProducts(cm.data.products)
                setResult(cm.data.result)
            }
            // ram and screenSize and memory
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera ===''&& status==='' && color===''){
                const rsm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}`)
                setProducts(rsm.data.products)
                setResult(rsm.data.result)
            }
            // ram and screenSize and camera
            else if(ram !== '' && screenSize !=="" && memory ==='' && camera !==''&& status==='' && color===''){
                const rsm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&camera=${camera}`)
                setProducts(rsm.data.products)
                setResult(rsm.data.result)
            }
            // ram and screenSize and status
            else if(ram !== '' && screenSize !=="" && memory ==='' && camera ===''&& status!=='' && color===''){
                const rsm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&status=${status}`)
                setProducts(rsm.data.products)
                setResult(rsm.data.result)
            }
            // ram and screenSize and color
            else if(ram !== '' && screenSize !=="" && memory ==='' && camera ===''&& status==='' && color!==''){
                const rsm = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&color=${color}`)
                setProducts(rsm.data.products)
                setResult(rsm.data.result)
            }
            // screenSize and memory and camera
            else if(ram === ''&& screenSize !=="" && memory !=='' && camera !==''&& status==='' && color===''){
                const smc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&memory=${memory}&camera=${camera}`)
                setProducts(smc.data.products)
                setResult(smc.data.result)
            }
            // screenSize and memory and status
            else if(ram === ''&& screenSize !=="" && memory !=='' && camera ===''&& status!=='' && color===''){
                const smc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&memory=${memory}&status=${status}`)
                setProducts(smc.data.products)
                setResult(smc.data.result)
            }
            // screenSize and memory and color
            else if(ram === ''&& screenSize !=="" && memory !=='' && camera ===''&& status==='' && color!==''){
                const smc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&memory=${memory}&color=${color}`)
                setProducts(smc.data.products)
                setResult(smc.data.result)
            }
            // memory and camera and status
            else if(ram === ''&& screenSize ==="" && memory !=='' && camera !==''&& status!=='' && color===''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}&camera=${camera}&status=${status}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            } 
             // memory and camera and color
             else if(ram === ''&& screenSize ==="" && memory !=='' && camera !==''&& status==='' && color!==''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}&camera=${camera}&color=${color}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            } 
            // camera and status and color
            else if(ram === ''&& screenSize ==="" && memory ==='' && camera !==''&& status!=='' && color!==''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&camera=${camera}&status=${status}&color=${color}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            } 
            // ram and memory and camera
            else if(ram !== ''&& screenSize ==="" && memory !=='' && camera !==''&& status==='' && color===''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&memory=${memory}&camera=${camera}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            } 
            // ram and memory and status
            else if(ram !== ''&& screenSize ==="" && memory !=='' && camera ===''&& status!=='' && color===''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&memory=${memory}&status=${status}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            }
            // ram and memory and color
            else if(ram !== ''&& screenSize ==="" && memory !=='' && camera ===''&& status==='' && color!==''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&memory=${memory}&color=${color}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            }
            // ram and camera and status
            else if(ram !== ''&& screenSize ==="" && memory ==='' && camera !==''&& status!=='' && color===''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&camera=${camera}&status=${status}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            }
            // ram and camera and color
            else if(ram !== ''&& screenSize ==="" && memory ==='' && camera !==''&& status==='' && color!==''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&camera=${camera}&color=${color}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            }
            // ram and status and color
            else if(ram !== ''&& screenSize ==="" && memory ==='' && camera ===''&& status!=='' && color!==''){
                const rmc = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&status=${status}&color=${color}`)
                setProducts(rmc.data.products)
                setResult(rmc.data.result)
            }
            // ram and screenSize and memory and camera
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera !==''&& status==='' && color===''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}&camera=${camera}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            } 
            // ram and screenSize and memory and status
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera ===''&& status!=='' && color===''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}&status=${status}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // ram and screenSize and memory and color
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera ===''&& status==='' && color!==''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}&color=${color}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // screenSize and memory and camera and status
            else if(ram === '' && screenSize !=="" && memory !=='' && camera !==''&& status!=='' && color===''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&memory=${memory}&camera=${camera}&status=${status}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // screenSize and memory and camera and color
            else if(ram === '' && screenSize !=="" && memory !=='' && camera !==''&& status==='' && color!==''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&screenSize=${screenSize}&memory=${memory}&camera=${camera}&color=${color}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // memory and camera and status and color
            else if(ram === '' && screenSize ==="" && memory !=='' && camera !==''&& status!=='' && color!==''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&memory=${memory}&camera=${camera}&status=${status}&color=${color}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // ram and screenSize and memory and camera and status
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera !==''&& status!=='' && color===''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}&camera=${camera}&status=${status}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // ram and screenSize and memory and camera and color
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera !==''&& status==='' && color!==''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}&camera=${camera}&color=${color}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // ram and screenSize and memory and camera and status and color
            else if(ram !== '' && screenSize !=="" && memory !=='' && camera !==''&& status!=='' && color!==''){
                const cam = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&ram=${ram}&screenSize=${screenSize}&memory=${memory}&camera=${camera}&status=${status}&color=${color}`)
                setProducts(cam.data.products)
                setResult(cam.data.result)
            }
            // const res = await axios.get(`/api/products?limit=${page*12}&${category}&${sort}&title[regex]=${search}`)
            
        }  
        getProducts()
      },[callback, category, sort, search,ram, page,memory,camera,screenSize, status, color])
      //console.log(ram)
    return {
        products:[products,setProducts],
        callback:[callback, setCallback],
        category: [category, setCategory],
        ram: [ram,setRam],
        memory: [memory, setMemory], 
        sort: [sort, setSort],
        screenSize: [screenSize, setScreenSize],
        camera: [camera, setCamera],
        search: [search, setSearch],
        color: [color, setColor],
        status: [status, setStatus],
        page: [page, setPage],
        result: [result, setResult] 
    }
}

export default ProductsAPI
