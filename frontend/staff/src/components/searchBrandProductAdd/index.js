import Select from "react-select";
import { useEffect, useState } from "react";
import { getBrandOfProduct } from "../../Redux/apiProduct";

function SearchBrand(props) {
  const { brand, handleSearch } = props;
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedBrand(selectedOption);
    handleSearch(selectedOption);
  };
  return (
    <div>
      {brand.map((brandOption, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            // name="brand"
            value={brandOption.nameBrand}
            checked={selectedBrand === brandOption.id}
            onChange={handleChange}
            style={{ backgroundColor: selectedBrand === brandOption.nameBrand ? "black" : "white" }}
          />
          <label className="form-check-label">
            {brandOption.nameBrand}
          </label>
        </div>
      ))}
    </div>
  
  );
}

export default SearchBrand;
