import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderPage.css";

function OrderPage() {
  const navigate = useNavigate();
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
  const [totalPrice, setTotalPrice] = useState(0);

  const pizza = {
    name: "Position Absolute Acı Pizza",
    price: 85.5,
    description:
      "Frontend developer olarak hala position: absolute kullanıyorsan, bu çok acı pizza tam sana göre. Acı sosları ve baharatlarıyla seni zorlu günlerinde rahatlatacak, ama aynı zamanda front-end dünyasında yaşadığın zorlukları hatırlatacak.",
    rating: 4.9,
    reviews: 200,
  };

  const toppingsList = [
    "Pepperoni", "Sosis", "Mısır", "Sarımsak", "Ananas", 
    "Tavuk Izgara", "Soğan", "Sucuk", "Biber", "Kabak", 
    "Kanada Jambonu", "Domates", "Jalapeno"
  ];

  useEffect(() => {
    const toppingsPrice = formData.toppings.length * 5;
    setTotalPrice((pizza.price + toppingsPrice) * formData.quantity);
  }, [formData.toppings, formData.quantity]);

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 3) newErrors.name = "İsim en az 3 karakter olmalıdır.";
    if (!formData.size) newErrors.size = "Pizza boyutunu seçmelisiniz.";
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
      await axios.post("https://reqres.in/api/pizza", formData);
      navigate("/success");
    } catch {
      navigate("/success");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        toppings: checked
          ? [...prev.toppings, value]
          : prev.toppings.filter((t) => t !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <nav>
  <Link to="/" className="link">ANASAYFA -</Link>
  <Link to="/order" className="link">SİPARİŞLER</Link>
</nav>
      </header>

      <section className="pizza-info">
        <h2>{pizza.name}</h2>
        <div className="pizza-details">
          <p>{pizza.price}₺</p>
          <p>
            <span>{pizza.rating}</span> ({pizza.reviews})
          </p>
        </div>
        <p className="pizza-description">{pizza.description}</p>
      </section>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="fieldset-container">
          <fieldset className="size">
            <legend>Boyut Seç</legend>
            {["Küçük", "Orta", "Büyük"].map((size) => (
              <label key={size}>
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

          <label className="labelsize">
            Hamur Seç
            <select
              id="crust"
              className="select-box"
              name="crust"
              value={formData.crust}
              onChange={handleChange}
            >
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Orta">Orta</option>
              <option value="Kalın">Kalın</option>
            </select>
          </label>
        </div>

        <fieldset className="malzeme">
          <legend>Ek Malzemeler (5 TL)</legend>
          <div className="malzemeler-bilgi">En fazla 10 malzeme seçebilirsiniz. 5₺</div>
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
          <div className="quantity-buttons">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })
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

          <div className="toplambuton">
            <h2>Sipariş Toplamı</h2>
            <p className="selected-toppings-total">
              Seçimler: {formData.toppings.length * 5}₺
            </p>
            <p className="toplamprag">Toplam: {totalPrice.toFixed(2)}₺</p>
            <button type="submit" className="orderpage-button" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderPage;
