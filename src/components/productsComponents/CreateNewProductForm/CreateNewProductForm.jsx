import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import './NewProductForm.css'

const CreateNewProductForm = () => {
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

  const navigate = useNavigate()
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault()
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then((res) => {
        if (res.ok) {
            alert('Product added successfuly')
            navigate('/products')
        } else {
            throw new Error ('Failed to add product')
        }
        })
        .catch((error) => console.log ({ 'error': error }))
  }

  const numberFields = ["id", "rating", "thumbnail", "price", "discountPercentage"];

  return (
    <div className="wrapper">
      <h1>Add New Product</h1>
      <form onSubmit={onSubmit} id="create">
        {Object.keys(formData).map((key) => {
          return (
            <div className="input-wrapper" key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type={numberFields.includes(key) ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={onChange}
              />
            </div>
          );
        })}
      </form>
        <button type="submit" form="create">Create Product</button>
    </div>
  );
};

export default CreateNewProductForm;
