import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [ram, setRam] = state.productsAPI.ram
    const [screenSize, setScreenSize] = state.productsAPI.screenSize
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [memory, setMemory] = state.productsAPI.memory
    const [camera, setCamera] = state.productsAPI.camera
    const [status, setStatus] = state.productsAPI.status
    const [color, setColor] = state.productsAPI.color

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }
    const handleRam = e =>{
        setRam(e.target.value)
        setSearch('')
    }
    const handleScreenSize = e =>{
        setScreenSize(e.target.value)
        setSearch('')
    }
    const handleMemory = e =>{
        setMemory(e.target.value)
        setSearch('')
    }
    const handleCamera = e =>{
        setCamera(e.target.value)
        setSearch('')
    }
    const handleColor = e =>{
        setColor(e.target.value)
        setSearch('')
    }
    const handleStatus = e =>{
        setStatus(e.target.value)
        setSearch('')
    }
    const r = [{"id":1,"value":2}, 
               {"id":2,"value":3},
               {"id":3,"value":4},
               {"id":4,"value":6},
               {"id":5,"value":8},
               {"id":6,"value":12},
               {"id":7,"value":16}]
    const screensizes = [
               {"id":1,"value":"6.1"}, 
               {"id":2,"value":"6.2"},
               {"id":3,"value":"6.3"},
               {"id":4,"value":"6.4"},
               {"id":5,"value":"6.5"},
               {"id":6,"value":"6.6"},
               {"id":7,"value":"6.7"},
               {"id":8,"value":"6.8"},
               {"id":9,"value":"6.9"},
               {"id":10,"value":"7.6"},]
    const memories =[
                  {"id":1,"value":8},
                  {"id":2,"value":16},
                  {"id":3,"value":32},
                  {"id":4,"value":64},
                  {"id":5,"value":128},
                  {"id":6,"value":256},
                  {"id":7,"value":512},
                  {"id":8,"value":1024},
    ]
    const cameras = [{"id":1,"name":'Close-up (Macro)'}, 
                    {"id":2,"name":'Wide angle shooting'},
                    {"id":3,"name":'Shoot to remove fonts'},
                    {"id":4,"name":'Shoot far zoom'}]

    const statuses = [{'id':1, 'value':'New'},
                    {'id':2, 'value':'99'}]

    const colors =[{'id':1, 'value':'Gold'},
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
    return (
        <>
        <div className ='search'>
            <span>Search: </span>
                
            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best Sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            
        </div>
        
        <div className="filter_menu">
            <div className="row">
                <span >Filter: </span>
                <select name="category" value={category} onChange={handleCategory} className="filters" >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id} className="filter">
                                {category.name} 
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="container p-5">
                <select value={ram} onChange={handleRam} className="custom-select" >
                    <option value =''>Ram</option>
                        {
                            r.map(ra =>(
                                <option value ={ra.value} key={ra.id}>{ra.value} GB</option>
                            ))
                        }
                </select>
            </div>
             
            <div className="row_2">
                <select value={screenSize} onChange={handleScreenSize} >
                    <option value =''>Screen Size</option>
                        {
                            screensizes.map(screensize =>(
                                <option value ={screensize.value} key={screensize.id}>
                                    {screensize.value} Inches
                                </option>
                            ))
                        }
                </select>
            </div>

            <div className="row_3">
                <select value={memory} onChange={handleMemory} >
                    <option value =''>Memory</option>
                        {
                            memories.map(memo =>(
                                <option value ={memo.value} key={memo.id}>{memo.value} GB</option>
                            ))
                        }
                </select>
            </div>

            <div className="row_4">
                <select value={status} onChange={handleStatus} >
                    <option value =''>Status</option>
                        {
                            statuses.map(st =>(
                                <option value ={st.value} key={st.id}>{st.value}</option>
                            ))
                        }
                </select>
            </div>
            <div className="row_4">
                <select value={color} onChange={handleColor} >
                    <option value =''>Color</option>
                        {
                            colors.map(co =>(
                                <option value ={co.value} key={co.id}>{co.value}</option>
                            ))
                        }
                </select>
            </div>
            
            <div className="row_4">
                <select value={camera} onChange={handleCamera} >
                    <option value =''>Camera</option>
                        {
                            cameras.map(cam =>(
                                <option value ={cam.name} key={cam.id}>{cam.name}</option>
                            ))
                        }
                </select>
            </div>

        </div>
    </>
    )
}

export default Filters