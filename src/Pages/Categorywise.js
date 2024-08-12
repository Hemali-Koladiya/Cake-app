import React, { useEffect, useMemo, useState } from "react";
import Cackcard from "../Component/Cackcard";

const Categorywise = () => {
  // const [card, setcards] = useState([]);

  const [cakelist, setcakelist] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {

    const apikey = process.env.REACT_APP_CAKE_API_KEY;
    // console.log(apikey);

    fetch(apikey, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcakelist(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // Change category value
  const formatCategory = (category) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Category Filter
  function getFilteredList() {
    if (!selectedCategory) {
      return cakelist;
    }
    return cakelist.filter((item) => item.category === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, cakelist]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Price Filter
  const handelselectoptions = (event) => {
    const setLowToHigh = () => {
      const sortedProducts = cakelist.sort((a, b) => a.price - b.price);
      setcakelist([...sortedProducts]);
    };
    const setHighToLow = () => {
      const reverseSortedProducts = cakelist.sort((a, b) => b.price - a.price);
      setcakelist([...reverseSortedProducts]);
    };
    const restList = () => {
      const resetList = cakelist;
      setcakelist([...resetList]);
    };
    if (event.target.value === "asc") {
      // console.log("you select Ascending Order");
      return setLowToHigh();
    } else if (event.target.value === "desc") {
      // console.log("you select Descending Order");
      return setHighToLow();
    } else {
      console.log("you select nothing");
      return restList;
    }
  };

  return (
    <div>
      <div className="cakes_page">
        <div className="container py-5">
          <div className="row h-100">
            <div className="heading">
              <h2 className="text-center heading_font">Cakes</h2>
            </div>
            <div className="select_box d-flex justify-content-center gap-5 my-5">
              <select
                name="category-lis"
                id="category-list"
                className="form-select w-25"
                aria-label="Default select example"
                style={{ boxShadow: "none" }}
                onChange={handleCategoryChange}
              >
                <option value="">All</option>
                <option value="cack">{formatCategory("cack")}</option>
                <option value="regular_cake">
                  {formatCategory("regular_cake")}
                </option>
                <option value="cup_cake">{formatCategory("cup_cake")}</option>
                <option value="photo_cake">
                  {formatCategory("photo_cake")}
                </option>
                <option value="theme_cake">
                  {formatCategory("theme_cake")}
                </option>
                <option value="pastries">{formatCategory("pastries")}</option>
              </select>

              <select
                className="form-select w-25 "
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
                  {filteredList.map((item) => (
                    <Cackcard
                      {...item}
                      key={item._id}
                      name={item.name}
                      img={item.image}
                      price={item.price}
                      stock={item.stock}
                      cate={formatCategory(item.category)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorywise;
