import React, { useContext, useEffect, useCallback } from "react";
 import { IconContext } from "react-icons";
 import { ItemContext } from "./Home";
 import "../styles.css";
 import RenderCard from "./RenderCard";
 import CartDetails from "./CartDetails";
 import axios from "axios";
 
 function FoodItems() {
   const itemsDetails = useContext(ItemContext);
   console.log("context", itemsDetails);
 
   const fetchData = useCallback(() => {
     axios
       .get("he-public-data/smartQFood8bef5a2.json")
       .then((response) => {
         itemsDetails.dispatchItems({
           type: "FETCH_SUCCESS",
           payload: response.data,
         });
         console.log(response, "response");
       })
       .catch((err) => {
         itemsDetails.dispatchItems({ type: "FETCH_ERROR" });
         console.log(err);
       });
   }, []);
  
 
   useEffect(() => {
     fetchData();
   }, [fetchData]);
 
   return (
     <IconContext.Provider value={{ size: "1.5em" }}>
       <div className="container">
         <div className="row text-style">
           <h6 className="text-warning">LUNCH</h6>
         </div>
         <div className="container align-padding">
           <div className="d-flex">
             <h3>Lunch</h3>
           </div>
           <div className="row card-align">
             {itemsDetails.itemsState.loading
               ? "Loading"
               : itemsDetails.itemsState.items.map((item, index) => (
                   <RenderCard key={index} card={item} index={index} />
                 ))}
             {itemsDetails.itemsState.error ? itemsDetails.itemsState.error : ""}
             {/* {items.map(renderCard)} */}
           </div>
         </div>
       </div>
       <CartDetails></CartDetails>
     </IconContext.Provider>
   );
 }
 
 export default FoodItems;
