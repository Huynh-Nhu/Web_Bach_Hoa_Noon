import "../Home/home.css";
import { useEffect, useState } from "react";
import { getProduct } from "../../service/apiCustomer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
function HomePage() {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation()
  const productHome = useSelector(
    (state) => state.product?.allProduct?.productData
  );
  const category = useSelector(
    (state) => state.category?.allCategory?.categoryData
  );
  const handleShowMore = () => {
    setShowMore(true);
  };
  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);
  return (
    <div className="">
      <div className="cate-home ">
        {category.map((categoryData, index) => (
          <div key={index}>
            
            <div className="name-cate-content ">
              
              <h3 className="name-category">{categoryData?.nameCategory}</h3>
            </div>
            {!showMore && (
              <Link
                to={{
                  pathname: "/product",
                  search: `?id=${categoryData._id}&category=${categoryData.nameCategory}`
                }}
              >
                <div className="btn-container">
                  <button className="btn" onClick={handleShowMore}>
                    Xem thêm
                  </button>
                </div>
              </Link>
            )}
            <div className="d-flex justify-content-between card-container ">
              {productHome
                .filter(
                  (product) => product.idCategory?._id === categoryData?._id
                )
                .slice(0, showMore ? productHome.length : 4)
                .map((prt, i) => (
                  <Card key={i} className="product-card">
                    <Card.Img
                      variant="top"
                      src={prt?.idImageProduct?.nameImageProduct}
                      className="card-img-top"
                    />
                    <Card.Body>
                      <Card.Text className="card-title">
                        {prt.nameProduct}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              
            </div>
            <hr />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
