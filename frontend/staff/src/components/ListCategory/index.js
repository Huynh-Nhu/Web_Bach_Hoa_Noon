import Card from "react-bootstrap/Card";
import "../ListCategory/listcate.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
function CardCategory(props) {
  const [currentPage, setCurrentPage] = useState(0);

  const cardPerPage = 6;
  const lengthCategory = props.category && props.category.length;
  const totalPages = Math.ceil(lengthCategory / cardPerPage);

  useEffect(() => {
    setCurrentPage(0); // thiet lap trang hien tai khi dl bi thay doi
  }, [props.category]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const indexOfLasCard = (currentPage + 1) * cardPerPage;
  const indexOfFisrtCard = indexOfLasCard - cardPerPage;
  const currentCards = props.category.slice(indexOfFisrtCard, indexOfLasCard);
  return (
    <div>
      <div className="card-category-container">
        {currentCards.map((cate, index) => (
          <Link to={`/${cate._id}/product`}>
            <Card
              className="custom-card"
              key={index}
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Img
                  className="custom-image"
                  variant="top"
                  src={cate.imgCategory}
                />
                <Card.Title className="text-center">{cate.nameCategory}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>

      <div className="pagination-container">
        {props.category.length > cardPerPage && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    </div>
  );
}

export default CardCategory;
