import { useEffect, useState } from "react";
import ListProductLayout from "../../components/ListProduct";
import { getAllProducts } from "../../Redux/apiProduct";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
function ListProductPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const product = useSelector(
    (state) => state.products.getAllProducts?.allProduct
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const detailName = searchParams.get("detailName");
    setDetail(detailName);
    getAllProducts(id, dispatch);
  }, []);
  const filteredProducts = product.filter(
    (product) => product.categoryDetailChosen === detail
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  return (
    <div>
      <ListProductLayout product={currentProducts} />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default ListProductPage;
