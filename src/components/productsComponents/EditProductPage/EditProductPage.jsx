import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import './EditPage.css'

const EditProductPage = () => {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    category: "",
    rating: "",
    thumbnail: "",
    images: []
  });
  const navigate = useNavigate();
  const params = useParams()


  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFormData(data);
      });
  }, [params.productId]);

  const excludeFields = ["id", "rating", "thumbnail", "images"];

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, rating, thumbnail, images, ...updatedData } = formData;
    fetch(`https://dummyjson.com/products/${params.productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    })
      .then((res) => {
        if (res.ok) {
          alert("Product updated successfully!");
          navigate(`/products/${params.productId}`);
          setProduct(updatedData)
        } else {
          throw new Error("Failed to update product");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="edit-wrapper">
      <h1>Edit</h1>
      {product &&
        Object.entries(product).map((entry) => {
          if (!excludeFields.includes(entry[0])) {
            return (
              <div className="input-wrapper" key={entry[0]}>
                <label htmlFor={entry[0]}>{entry[0]}</label>
                <input
                  type={typeof entry[1] === "number" ? "number" : "text"}
                  name={entry[0]}
                  value={formData[entry[0]]}
                  onChange={onChange}
                />
              </div>
            );
          }
          return null;
        })}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EditProductPage;