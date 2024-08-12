import React from "react";

const Cackcard = (props) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 px-md-4 px-1">
        <div className="card h-100">
          <div className="image_box">
            <img src={props.img} alt="cake" className="img-fluid" />
          </div>
          <div className="detail_box p-4">
            <h5 className="name_font">{props.name}</h5>
            <p>
              <span>Category : </span>
              {props.cate}
            </p>
            <h5 className="price_font mt-1">
              ${props.price}
              <span className="ms-3 stock_font">{props.stock} Stock</span>
            </h5>
            <div>
              <button className="add_button mt-2 rounded-pill">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cackcard;
