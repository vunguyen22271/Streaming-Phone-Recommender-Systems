import React, {useState, useContext,useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import {useHistory,useParams} from 'react-router-dom'
const initialState ={
    product_id:'',
    title:'',
    price:0,
    screenSize:0,
    ram:0,
    camera:'',
    memory:0,
    pin:0,
    status:'',
    color:'',
    description:'',
    content: '',
    category:'',
    _id:''
}

function CreateProducts() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading,setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const params = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(params.id){
            setOnEdit(true)
            products.forEach(product =>{
                if(product._id === params.id) 
                {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }
        else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[params.id, products])
    const solveUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert('You are not an admin')
            const file = e.target.files[0]
            if(!file) return alert('File does not exist')

            if(file.size > 1024*1024*5) return alert('File size too big')

            if( file.type !== "image/jpeg" && file.type !== "image/png") return alert('The file format is not correct')

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload',formData,{
                headers: {'content-type':'multipart/form-data',Authorization: token}
            })
            setLoading(false)
            setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const solveDelete = async () =>{
        try {
            if(!isAdmin) return alert('You are not an admin')
            setLoading(true)
            await axios.post('/api/destroy',{public_id: images.public_id},{
                headers: {Authorization:token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const solveInput = e =>{
        const {name, value} = e.target
        setProduct({...product,[name]:value})
    }
    const solveSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert('You are not an admin')
            if(!images) return alert('Please add a photo of the product')
            if(onEdit){
                await axios.put(`/api/products/${product._id}`,{...product, images},{
                    headers: {Authorization:token}
                })
            }
            else {
                await axios.post('/api/products',{...product, images},{
                    headers: {Authorization:token}
                })
            }
            setCallback(!callback)
            history.push('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const status = [{'id':1, 'value':'New'},
                    {'id':2, 'value':'99'}]

    const color =[{'id':1, 'value':'Gold'},
                  {'id':2, 'value':'Silver'},
                  {'id':3, 'value':'Green'},
                  {'id':4, 'value':'Blue'},
                  {'id':5, 'value':'White'},
                  {'id':6, 'value':'Black'},
                  {'id':7, 'value':'Red'},
                  {'id':8, 'value':'Purple'},
                  {'id':9, 'value':'Pink'},
                  {'id':10, 'value':'Shiny Black'},
                  {'id':11, 'value':'Mint Green'},
                  {'id':12, 'value':'Turquoise'}]

    const camera = [{"id":1,"name":'Close-up (Macro)'}, 
                    {"id":2,"name":'Wide angle shooting'},
                    {"id":3,"name":'Shoot to remove fonts'},
                    {"id":4,"name":'Shoot far zoom'}]
    const upload ={
        display:images ? "block" : "none"
    }
    return (
        <div className='create_product'>
            <div className="upload" >
                <input type="file" name ='file' id='file_up' onChange ={solveUpload}/>
                {
                    loading ? <div id ='file_img'><Loading/></div>
                    :<div id="file_img"style={upload}>
                    <img src ={images?images.url :''} alt =''/>
                    <span onClick ={solveDelete}>X</span>
                </div> 
                }
                
            </div>
            <form onSubmit={solveSubmit}>
                <div className="row">
                    <label htmlFor ="product_id">Product code</label>
                    <input type="text" name='product_id' id = 'product_id' required value={product.product_id} onChange={solveInput} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlFor ="title">Title</label>
                    <input type="text" name='title' id = 'title' required value={product.title} onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="price">Price</label>
                    <input type="number" min = "0" name='price' id = 'price' required value={product.price} onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="screenSize">Screen Size</label>
                    <input type="text" min = "0" name='screenSize' id = 'screenSize' required value={product.screenSize}  onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="ram">Ram</label>
                    <input type="number" min = "0" name='ram' id = 'ram' required value={product.ram} onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="camera">Camera</label>
                    <select name ='camera'value={product.camera} onChange={solveInput}>
                        <option value =''>Select Camera</option>
                        {
                            camera.map(cam =>(
                                <option value ={cam.name} key={cam.id}>{cam.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <label htmlFor ="memory">Memory</label>
                    <input type="number" min = "0" name='memory' id = 'memory' required value={product.memory} onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="pin">Pin</label>
                    <input type="number" min ="0" name='pin' id = 'pin' required value={product.pin} onChange={solveInput}/>
                </div>
                
                <div className="row">
                    <label htmlFor ="status">Status</label>
                    <select name ='status'value={product.status} onChange={solveInput}>
                        <option value =''>Select Status</option>
                        {
                            status.map(st =>(
                                <option value ={st.value} key={st.id}>{st.value}</option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="row">
                    <label htmlFor ="color">Color</label>
                    <select name ='color'value={product.color} onChange={solveInput}>
                        <option value =''>Select Color</option>
                        {
                            color.map(co =>(
                                <option value ={co.value} key={co.id}>{co.value}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <label htmlFor ="description">Description</label>
                    <textarea type="text" name='description' id = 'description' required value={product.description} rows = "5" onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="content">Content</label>
                    <textarea type="text" name='content' id = 'content' required value={product.content} rows="7" onChange={solveInput}/>
                </div>

                <div className="row">
                    <label htmlFor ="category">Category</label>
                    <select name ='category' value ={product.category} onChange={solveInput}>
                        <option value =''>Select category</option>
                        {
                            categories.map(category =>(
                                <option value ={category._id} key ={category._id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit'>{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProducts
