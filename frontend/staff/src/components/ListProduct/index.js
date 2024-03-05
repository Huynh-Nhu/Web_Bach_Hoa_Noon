import { Link } from "react-router-dom";
import "../ListProduct/listProduct.css";
function ListProductLayout(props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Edit</th>
            <th> Tên sản phẩm</th>
            <th>Thương hiệu</th>
            <th>Chi tiết</th>
            <th>Thông tin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.product?.map((product) => (
            <tr
              key={product._id}
              // className={product.state ? "" : "opacity-50 "}
            >
              <td className="align-middle">
                {product.state ? (
                  <Link
                    to={{
                      pathname: "/updateProduct",
                      search: `?id=${product._id}`,
                    }}
                  >
                    <i
                     
                      className="fa-solid fa-pen-to-square"
                    ></i>
                  </Link>
                ) : (
                  <i  onClick={() => props.handleClickReset(product._id)} className="fa-solid fa-arrows-rotate"></i>
                )}
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
                    <th>Công cụ</th>
                  </thead>
                  <tbody>
                    {product.idProductDetails?.sizeProducts.map((size) => (
                      <tr key={size._id} >
                        <td>{size.size}</td>
                        <td>
                          <div className="image-container">
                            <img style={{ width: 100 }} src={size.img} />
                          </div>
                        </td>
                        <td>{size.price}</td>
                        <td>{size.quantity}</td>
                        <p>{size.state}</p>
                        <td>
                          {size.state ? (

                            <i onClick={() => props.handlDeleteDetail(product.idProductDetails?._id, size._id)} className="fa-solid fa-delete-left"></i>
                          ): (
                            <i onClick={() => props.handlResetDetail(product.idProductDetails?._id, size._id)}  className="fa-solid fa-arrows-rotate"></i>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td style={{ width: "500px" }} className="align-top">
                {product.idProductDetails.descriptionProducts}
              </td>
              <td>
                <i
                  onClick={() => props.handleClickDelete(product._id)}
                  className="fa-solid fa-trash-can"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProductLayout;
