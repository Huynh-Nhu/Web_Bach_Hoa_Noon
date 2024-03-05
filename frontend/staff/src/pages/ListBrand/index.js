import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBrand } from "../../Redux/apiProduct";

function ListBrand() {
    const Brand = useSelector((state) => state.brands.getAllBrand?.allBrand);
    const [brand, setBrand] = useState(Brand)
    const filter = Brand?.filter((item) => item !== null)
    const dispatch = useDispatch()
    useEffect(()=> {
        setBrand(Brand)
    }, [Brand])
    useEffect(() => {
        getAllBrand(dispatch)
    }, [dispatch])
    return ( <div >
        <Link to="/brand" >
        <i className="fa-solid fa-square-plus"></i>
        </Link>
        <table className="table">
                <thead  className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>STT</th>
                        <th>Code Brand</th>
                        <th>Name Brand</th>
                        <th>Image Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {filter && filter.map((brand, index) => (
                        <tr key={brand.codeBrand}>
                            <td>
                            <Link to={{
                                pathname: "/updateBrand",
                                search:`?id=${brand._id}`
                            }}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                            <td>{index}</td>
                            <td>{brand.codeBrand}</td>
                            <td>{brand.nameBrand}</td>
                            <td>
                                <img style={{ width: "50px", height: "50px" }}  src={brand.imgBrand} alt={brand.nameBrand} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div> );
}

export default ListBrand;