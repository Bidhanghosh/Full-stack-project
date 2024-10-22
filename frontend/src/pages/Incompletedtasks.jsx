import React,{useState,useEffect} from"react";
import Cards from "../Components/Cards";
import axios from "axios";

const Incompletedtask=() =>{
    const[Data,setData]=useState()
    const headers={
        id:localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      };
     useEffect(()=>{
        const fetch=async()=>{
          const response = await axios.get (
            "http://localhost:1000/api/v2/get-complete-tasks",
            {headers}
        );
        setData(response.data.data);
      };
      fetch();
      
      });


    return (
    <div>
       <Cards home ={"false"} data={Data} />
       </div>
    );
};
export default Incompletedtask;