import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from 'axios';
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import SimilarityAPI from "./api/SimilarityAPI";
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

  const [token, setToken] = useState(false);

  
  useEffect(()=>{
    const username = localStorage.getItem('username')
    if(username){
      const refreshToken = async () =>{

        const token = await axios.get('/user/refresh_token')
        setToken(token.data.accessToken)
  
        setTimeout(()=>{
          refreshToken();
        },10*60*1000)
      }
      refreshToken()
  }
},[])
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(), 
    similaritiesAPI: SimilarityAPI(),
  };
  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
