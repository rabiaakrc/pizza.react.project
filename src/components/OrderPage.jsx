import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./OrderPage.css";

function OrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    crust: "",
    toppings: [],
    notes: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pizza = {
    id: 1,
    name: "Position Absolute Acı Pizza",
    price: 85.50,
    description:
      "Frontend developer olarak hala position: absolute kullanıyorsan, bu çok acı pizza tam sana göre. Her şeyin doğru yerde olması gerektiğini biliyorsun, ama bazen CSS'te işler karmaşıklaşır. Bu pizza, tam olarak o durumları anlatan bir lezzet. Acı sosları ve baharatlarıyla seni zorlu günlerinde rahatlatacak, ama aynı zamanda front-end dünyasında yaşadığın zorlukları hatırlatacak. Denemek ister misin?",
    rating: 4.9,  // Puan
    reviews: 200,  
  };

  const toppingsList = [
    "Pepperoni",
    "Sosis",
    "Mısır",
    "Sarımsak",
    "Ananas",

    
    "Tavuk Izgara",
    "Soğan",
    "Sucuk",
    "Biber",
     "Kabak",

    "Kanada Jambonu",
    "Domates",
    "Jalapeno",
    "Sucuk",

  
  ];

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 3) {
      newErrors.name = "İsim en az 3 karakter olmalıdır.";
    }
    if (!formData.size) {
      newErrors.size = "Pizza boyutunu seçmelisiniz.";
    }
    if (formData.toppings.length < 4 || formData.toppings.length > 10) {
      newErrors.toppings = "En az 4 ve en fazla 10 malzeme seçmelisiniz.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await axios.post("https://reqres.in/api/pizza", formData);
      console.log("Sipariş Özeti:", response.data);
      alert("Siparişiniz başarıyla oluşturuldu!");
    } catch (error) {
      console.error("Sipariş gönderiminde bir hata oluştu:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const newToppings = checked
        ? [...formData.toppings, value]
        : formData.toppings.filter((topping) => topping !== value);
      setFormData({ ...formData, toppings: newToppings });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <h1 className="header-title">Teknolojik Yemekler</h1>
        <nav className="order-nav">
          <Link to="/" className="nav-link">ANASAYFA -</Link>
          <Link to="/order" className="nav-link">SİPARİŞLER</Link>
        </nav>
      </div>

      <div className="form-section">
        <div className="pizza-info">
          <h2 className="pizza-title">Position Absolute Acı Pizza</h2>
          <p className="pizza-description">
            Frontend developer olarak hala position: absolute kullanıyorsan, bu çok acı pizza tam sana göre. Her şeyin doğru
            yerde olması gerektiğini biliyorsun, ama bazen CSS'te işler karmaşıklaşır. Bu pizza, tam olarak o durumları anlatan
            bir lezzet. Acı sosları ve baharatlarıyla seni zorlu günlerinde rahatlatacak, ama aynı zamanda front-end dünyasında
            yaşadığın zorlukları hatırlatacak. Denemek ister misin?
          </p>
          <div className="pizza-details">
            <p className="pizza-price">85.50₺</p>
            <div className="pizza-rating">
              <span className="rating">4.9</span> <span className="reviews">(200)</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="order-form">
        <div className="selection-group">
        <fieldset className="oran">
  <legend>Boyut Seç</legend>
  {["Küçük", "Orta", "Büyük"].map((size) => (
    <label className="oranlabel" key={size}>
      <input
        type="radio"
        name="size"
        value={size}
        checked={formData.size === size}
        onChange={handleChange}
      />
      {size}
    </label>
  ))}
  {errors.size && <p className="error">{errors.size}</p>}
</fieldset>


  <label className="kalın">
    Hamur Seç:
    <select className="kalınselect" name="crust" value={formData.crust} onChange={handleChange}>
      <option value="">Hamur Kalınlığı</option>
      <option value="İnce">İnce</option>
      <option value="Orta">Orta</option>
      <option value="Kalın">Kalın</option>
    </select>
    {errors.crust && <p className="error">{errors.crust}</p>}
  </label>
</div>

<fieldset className="malzemeler">
  <legend className="ekmalzeme">Ek Malzemeler <p className="malzeme-bilgi yazikucuk">
  En fazla 10 malzeme seçebilirsiniz. 5 TL.
</p>

  </legend>
  
 
  
  {toppingsList.map((topping) => (
    <label key={topping}>
      <input
        type="checkbox"
        value={topping}
        checked={formData.toppings.includes(topping)}
        onChange={handleChange}
      />
      {topping}
    </label>
  ))}
  {errors.toppings && <p className="error">{errors.toppings}</p>}
</fieldset>


          <label>
            İsim:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label>
            Sipariş Notu:
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </label>

          <div className="quantity-control">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  quantity: Math.max(1, formData.quantity - 1),
                })
              }
            >
              -
            </button>
            <span>{formData.quantity}</span>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, quantity: formData.quantity + 1 })
              }
            >
              +
            </button>
          </div>

          <div className="orderpage-button-container">
            <button
              className="orderpage-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
