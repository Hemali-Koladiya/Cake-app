import React, { useEffect, useState } from "react";
import Cackcard from "../Component/Cackcard";

const Itemsinorder = () => {
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
  const handelselectoptions = (event) => {
    const setLowToHigh = () => {
      const sortedProducts = cards.sort((a, b) => a.price - b.price);
      setcards([...sortedProducts]);
    };
    const setHighToLow = () => {
      const reverseSortedProducts = cards.sort((a, b) => b.price - a.price);
      setcards([...reverseSortedProducts]);
    };
    const restList = () => {
      const resetList = cards;
      setcards([...resetList]);
    };
    if (event.target.value === "asc") {
      console.log("you select Ascending Order");
      return setLowToHigh();
    } else if (event.target.value === "desc") {
      console.log("you select Descending Order");
      return setHighToLow();
    } else {
      console.log("you select nothing");
      return restList;
    }
  };
  return (
    <>
      <div className="cakes_page">
        <div className="container py-5">
          <div className="row h-100">
            <div className="heading">
              <h2 className="text-center heading_font">Cakes</h2>
            </div>
            <div className="select_box">
              <select
                className="form-select w-25 m-auto my-5"
                aria-label="Default select example"
                style={{ boxShadow: "none" }}
                onChange={handelselectoptions}
              >
                <option value="nothing">Select Option</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
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

export default Itemsinorder;
