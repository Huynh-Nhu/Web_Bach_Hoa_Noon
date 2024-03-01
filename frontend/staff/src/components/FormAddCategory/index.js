import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../FormAddCategory/formAddCate.css";
function FormCategory(props) {
  const [imgCate, setImgCate] = useState(
    "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
  );
  const onchangeNameCate = (e) => {
    const name = e.target.value;
    props.onchangeNameCategory(name);
  };
  const onChangeImgCate = (e) => {
    const img = Array.from(e.target.files);
    props.onchangeImageCategory(img);
    if (img.length > 0) {
      setImgCate(URL.createObjectURL(img[0]));
    }
  };

  return (
    <Form onSubmit={props.handleAddcategory}>
      <Form.Group className="mb-3" controlId="nameCategory">
        <Form.Label>Tên loại sản phẩm</Form.Label>
        <Form.Control
          onChange={onchangeNameCate}
          type="text"
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group controlId="imgCate" className="mb-3">
        <Form.Label>Ảnh Loại</Form.Label>
        <div className="input-group  rounded-pill  d-block">
          <input
            id="upload"
            name="imageProduct"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={onChangeImgCate}
            className="form-control d-none"
          />
          <div className="input-group-append">
            <label
              htmlFor="upload"
              className="btn btn-light m-0 rounded-pill px-4"
            >
              <i className="fa fa-cloud-upload mr-2 text-muted"></i>
              <small className="text-uppercase font-weight-bold text-muted">
                Update Image
              </small>
            </label>
          </div>
        </div>
        <img className="img-cate     " src={imgCate} alt="Avatar" />
      </Form.Group>

      <div className="text-center">
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default FormCategory;
