import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
function Dashboard() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [products, setProducts] = useState([]);
  //const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  //const [categories, setCategories] = state.categoriesAPI.categories
  const [token] = state.token;
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (token && isAdmin) {
      const getHistory = async () => {
        try{
            const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } catch (err){
          alert(err.response.data.msg)
        }
      };
      getHistory();
      const getUser = async () =>{
        try {
            const res = await axios.get('/user/get_user',{
                headers: {Authorization: token}
            })
            setUsers(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
      }
      getUser()

      const getAllProducts = async () =>{
        try {
          const res = await axios.get('/api/all_products',{
            headers: {Authorization: token}
          })
        setProducts(res.data)
        } catch (err) {
          alert(err.response.data.msg)
        }
      }
      getAllProducts()
      // const getCategory = async () =>{
      //   try {
      //     const res = await axios.get('/api/category',{
      //       headers: {Authorization: token}
      //   })
      //   setCategories(res.data)
      //   } catch (err) {
      //     alert(err.response.data.msg)
      //   }
      // }
      // getCategory()

    }
  }, [token, isAdmin, setHistory, setUsers, setProducts]);



  let totalAmount = 0;
  history &&
    history.forEach((item) => {
      item.cart.forEach((i)=>{
        totalAmount += i.price * i.quantity;
      })
  });
  const lineState = {
    labels: ["Starting point", "Total"],
    datasets: [
      {
        label: "Total",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  //const category = categories.map(item =>item._id )
  //console.log(history)
  //console.log(categories)
  let apple = 0;
  let xiaomi = 0;
  let oppo = 0;
  let samsung = 0;
  history.forEach((item)=>{
    item.cart.forEach((i)=>{
      if(i.category === '61947f8e613ccbeacb59e5bd'){
        oppo += i.quantity;
      }
      if(i.category === '61947f86613ccbeacb59e5b8'){
        apple += i.quantity;
      }
      if(i.category === '6194877b0327b0eef3a53fe9'){
        xiaomi += i.quantity;
      }
      if(i.category === '619487730327b0eef3a53fe4'){
        samsung += i.quantity;
      }
    })
  })
  const doughnutState = {
    labels: ["Apple","Oppo","Xiaomi","SamSung"],
    datasets: [
      {
        label: '# of Votes',
        backgroundColor: ["#00A6B4","#F5B16D","#83C75D","#FEF889",],
        hoverBackgroundColor: ["#009298","#EC870E", "#5BBD2B","#FCF54C"],
        data: [apple, oppo, xiaomi, samsung],
      },
    ],
  };
  // const vertical = {
  //   labels: ["Apple","Oppo","Xiaomi","SamSung"],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       backgroundColor: ["#00A6B4","#F5B16D","#83C75D","#FEF889",],
  //       hoverBackgroundColor: ["#009298","#EC870E", "#5BBD2B","#FCF54C"],
  //       data: [apple, oppo, xiaomi, samsung],
  //     },
  //   ],
  // };
  //console.log(totalAmount)

  return (
    <div className="dashboard">
      <div className="containerDashboard">
        <div className="dashboardSummary">
          <div>
            <p>
              Total <br />${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/">
              <p>Product</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/history">
              <p>Orders</p>
              <p>{history && history.length}</p>
            </Link>
            <Link to="/all_user">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>  
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        
         {/* <div className="vertical">
          <Bar data ={vertical} />
        </div>  */}
      </div>
    </div>
  );
}

export default Dashboard;
