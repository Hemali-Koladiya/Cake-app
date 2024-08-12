import React, { useEffect, useState } from "react";
import "../Style/Style.css";
import Cackcard from "../Component/Cackcard";

const Cakeitems = () => {
  const [cards, setcards] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_CAKE_API_KEY, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcards(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className="cakes_page">
        <div className="container py-5">
          <div className="row h-100">
            <div className="heading">
              <h2 className="text-center heading_font">Cakes</h2>
            </div>
            <div className="cake_cards mt-4">
              <div className="container">
                <div className="row gy-5 d-flex">
                  {cards.map((item) => {
                    return (
                      <Cackcard
                        key={item._id}
                        name={item.name}
                        img={item.image}
                        price={item.price}
                        stock={item.stock}
                        cate={item.category}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cakeitems;
