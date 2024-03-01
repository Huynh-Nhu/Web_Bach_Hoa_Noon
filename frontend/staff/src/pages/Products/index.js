import { useEffect, useState } from "react";
import { Card, CardImg, CardTitle } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../Products/products.css";
function ProductPage() {
  const categoryDetails = useSelector(
    (state) => state.category?.getAllCategory.allCate
  );

  const location = useLocation();
  const [id, setId] = useState("");
  useEffect(() => {
    const path = location.pathname;
    const id = path.split("/")[1];
    setId(id);
  }, [location]);
  const [details, setDetail] = useState(categoryDetails);

  useEffect(() => {
    setDetail(categoryDetails);
  }, [categoryDetails]);
  const [currentPage, setCurrentPage] = useState(0);

  const cardPerPage = 6;
  const totalPages = Math.ceil(details.length / cardPerPage);

  useEffect(() => {
    setCurrentPage(0); // thiet lap trang hien tai khi dl bi thay doi
  }, [details]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const indexOfLasCard = (currentPage + 1) * cardPerPage;
  const indexOfFisrtCard = indexOfLasCard - cardPerPage;
  const currentCards = details.slice(indexOfFisrtCard, indexOfLasCard);
 return (
  <div >
   <div className="row row-cols-1 row-cols-md-3 g-4">
      {currentCards.map((category, index) => {
        if (category._id === id) {
          return category.categoryDetails.map((detail, idx) => (
            <div className="col" key={idx}>
              <Card className="custom-card-detail l">
                <Link to={{
                    pathname: "/productList",
                    search: `?id=${id}&detailName=${encodeURIComponent(detail.name)}`
                  }} >
                <Card.Title>{detail.name}</Card.Title>
                <CardImg
                  className="custom-image-detail"
                  src={detail.img}
                ></CardImg>
                  
                </Link>
                <Link
                  to={{
                    pathname: "/productAdd",
                    search: `?id=${id}&detailName=${encodeURIComponent(detail.name)}`
                  }}
                >
                  <i className="fa-solid fa-circle-plus add-products"></i>
                </Link>
              </Card>
            </div>
          ));
        }
        return null;
      })}
   </div>

    <div  className="pagination-container">
      {/* Hiển thị phân trang */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        breakClassName={"break-me"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  </div>
);
}

export default ProductPage;
