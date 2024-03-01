import { Link } from "react-router-dom";
import "../ListProduct/listProduct.css"
function ListProductLayout(props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Công cụ</th>
            <th>Product Name</th>
            <th>Thương hiệu</th>
            <th>Chi tiết</th>
            <th>Thông tin</th>
          </tr>
        </thead>
        <tbody>
          {props.product.map((product) => (
            <tr key={product._id}>
              <td className="align-middle">
              <Link to={{
                pathname: "/updateProduct",
                search: `?id=${product._id}`
              }}><i className="fa-solid fa-pen-to-square " ></i></Link>
              </td>
              <td className="align-middle">{product.nameProduct}</td>
              <td className="align-middle">{product.brandChonse}</td>
              <td>
                <table className="table align-top">
                  <thead>
                    <th>Dung tích</th>
                    <th>Ảnh sản phẩm </th>
                    <th>Giá tiền</th>
                    <th>Số lượng</th>
                  </thead>
                  <tbody>
                    {product.idProductDetails.sizeProducts.map((size) => (
                      <tr key={size._id}>
                        <td>{size.size}</td>
                        <td>
                          <div className="image-container" ><img style={{ width: 100 }} src={size.img} /></div>
                        </td>
                        <td>{size.price}</td>
                        <td>{size.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td style={{ width: "600px" }} className="align-top">{product.idProductDetails.descriptionProducts}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProductLayout;
