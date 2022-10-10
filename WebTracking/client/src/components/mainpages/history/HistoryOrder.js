import React,{useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
function HistoryOrder() {

    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    useEffect(() => {
        if(token){
            const getHistory = async () =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment',{
                        headers:{Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history',{
                        headers:{Authorization: token}
                    })
                    setHistory(res.data)
                }
                
            }
            getHistory()
        }

    },[token, isAdmin, setHistory])
    return (
        <div className="history-page">
            <h2 style={{textAlign: "center", margin: "20px",textTransform: "capitalize", color:"#ee4d2d"}}>Order History</h2>

            <h4 style={{marginTop: "20px",marginBottom: "18px", fontSize: "20px",textTransform: "capitalize"}}>You have {history.length} order</h4>
            <div>
                <table>
                    <thead>
                      <tr>
                        <th>Payment code</th>
                        <th>Purchase date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items =>(
                                <tr key ={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to ={`/history/${items._id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryOrder
