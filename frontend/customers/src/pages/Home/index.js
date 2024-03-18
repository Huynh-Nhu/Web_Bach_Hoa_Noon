import "../Home/home.css";
import { useEffect, useState } from "react";
import { getProductCart } from "../../service/apiCustomer";

import { getProduct } from "../../service/apiCustomer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Carousel from "../../components/Carousel";
function HomePage() {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const productHome = useSelector(
    (state) => state.product?.allProduct?.productData
  );
  console.log(productHome);
  const category = useSelector(
    (state) => state.category?.allCategory?.categoryData
  );
  const customer = useSelector(
    (state) => state.loginCustom?.login?.currentCustomer
  );
  const handleShowMore = () => {
    setShowMore(true);
  };
  useEffect(() => {
    getProductCart(customer?.customer?._id, dispatch);
    getProduct(dispatch);
  }, [dispatch]);

  return (
    <div className="">
      <div className="row">
        <div className="col-7 ">
          <Carousel />
        </div>
        <div className="col-5">
          <div className="row right-home-top">
            <div className="row">
              <div className="col-12">
                <img
                  style={{ width: "100%" }}
                  src="/assets/carousel/tu-van.png"
                  alt="Image 1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cate-home mt-4">
        {category?.map((categoryData, index) => (
          <div key={index}>
            <div className="name-cate-content ">
              <h3 className="name-category">{categoryData?.nameCategory}</h3>
            </div>
            {!showMore && (
              <Link
                to={{
                  pathname: "/product",
                  search: `?id=${categoryData._id}&category=${categoryData.nameCategory}`,
                }}
              >
                <div className="btn-container">
                  <button className="btn" onClick={handleShowMore}>
                    Xem thêm
                  </button>
                </div>
              </Link>
            )}
            <div className="d-flex card-container ">
              {productHome
                .filter(
                  (product) => product.idCategory?._id === categoryData?._id
                )
                .slice(0, showMore ? productHome.length : 5)
                .map((prt, i) =>
                  prt.idProductDetails?.sizeProducts
                    .slice(0, 1)

                    .map((item, index) => (
                      <Link
                        to={{
                          pathname: "/productDetail",
                          search: `?id=${prt._id}&idDetail=${item._id}`,
                        }}
                      >
                        <Card className="mx-3" key={index}>
                          <Card.Img
                            variant="top"
                            src={item.img}
                            className="card-img-top"
                          />
                          <Card.Body>
                            <Card.Text className="card-title">
                              {prt.nameProduct} <span> {item.size} </span>
                            </Card.Text>
                          </Card.Body>
                          {/* <p>Size:</p>
                          <p>Price: {item.price}</p> */}
                        </Card>
                      </Link>
                    ))
                )}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
