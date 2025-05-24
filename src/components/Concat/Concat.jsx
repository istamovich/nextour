import React, { useState } from "react";
import "./Concat.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarker } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Concat = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    guests: "",
    date: "",
    destination: "",
    visa: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToTelegram = async () => {
    const { name, number, guests, date, destination, visa } = formData;

    if (!name || !number || !guests || !date || !destination || !visa) {
      setModalMessage(t("Iltimos, barcha maydonlarni to'ldiring!"));
      setShowModal(true);
      return;
    }

    const message = `
    ${t("Ismingiz")}: ${name}
    ${t("Telefon")}: ${number}
    ${t("Necha kishisiz")}: ${guests}
    ${t("Uchish sanasi")}: ${date}
    ${t("Manzil")}: ${destination}
    ${t("Visa turi")}: ${visa}
    `;

    const botToken = "7980189074:AAFPDw0pHR747UkzZOCcrLLAdh9f4x6kVEY";
    const chatId = 5445767761;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`;

    try {
      await fetch(url);
      setModalMessage(t("Xabar yuborildi!"));
      setShowModal(true);
      setFormData({
        name: "",
        number: "",
        guests: "",
        date: "",
        destination: "",
        visa: "",
      });
    } catch (error) {
      setModalMessage(t("Xabar yuborishda xatolik yuz berdi."));
      setShowModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToTelegram();
  };

  return (
    <div className="Concat" id="concat">
      <div className="concat-main">
        <div className="concat-text">
          <p>{t("O'zingiz yoqtirganingizni tanlang")}</p>
          <hr />
          <h1>{t("O'z joyingizni band qiling")}</h1>
          <button>{t("Ko'proq bilish...")}</button>
        </div>
      </div>

      <div className="concat-box">
        <div className="box">
          <div className="icon">
            <FaPhoneAlt />
          </div>
          <h3>{t("Telefon raqam")}</h3>
          <p>+998 99 299 99 96</p>
        </div>
        <div className="box">
          <div className="icon">
            <MdEmail />
          </div>
          <h3>{t("Bizga email orqali bog'laning")}</h3>
          <p>zamonbiznestour@mail.ru</p>
        </div>
        <div className="box">
          <div className="icon">
            <FaMapMarker />
          </div>
          <h3>{t("Ofisimizga tashrif buyuring")}</h3>
          <p>15/25, Chilanzar - 9, Tashkent city</p>
        </div>
      </div>

      <div className="container">
        <div className="maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11960.483246752573!2d69.2350!3d41.3195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef3b4c7085e85%3A0xdeb7632ec6801b88!2sQo'qon%20City!5e0!3m2!1sen!2s!4v1699700000000"
            allowFullScreen=""
            className="map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="form-container">
          <h4>
            {t("O'z")}
            <em>{t("joyingizni")}</em> {t("band")}
            <em>{t("qiling")}</em>
          </h4>

          <form onSubmit={handleSubmit} className="form-parent">
            <div className="form">
              <label htmlFor="name">{t("Ismingiz")}</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("Ex. John Smithee")}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form">
              <label htmlFor="number">{t("Telefon raqamingiz")}</label>
              <input
                id="number"
                type="text"
                name="number"
                placeholder={t("+998 99 999 99 99")}
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form">
              <label htmlFor="chooseGuests">{t("Necha kishisiz")}</label>
              <select
                id="chooseGuests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                <option value="" hidden style={{ color: "gray" }}>
                  {t("Tanlang")}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            <div className="form">
              <label htmlFor="nameData">{t("Uchish sanasi")}</label>
              <input
                id="nameData"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form">
              <label htmlFor="chooseCategory">
                {t("Manzilingizni tanlang")}
              </label>
              <select
                id="chooseCategory"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              >
                <option value="" hidden style={{ color: "gray" }}>
                  {t("Tanlang")}
                </option>
                <option value="Antalya">{t("Antalya")}</option>
                <option value="Istanbul">{t("Istanbul")}</option>
                <option value="Dubai">{t("Dubai")}</option>
                <option value="Sharm El-Sheikh">{t("Sharm El-Sheikh")}</option>
                <option value="Kuala Lumpur">{t("Kuala Lumpur")}</option>
                <option value="Kanada">{t("Kanada")}</option>
                <option value="England">{t("Angliya")}</option>
                <option value="USA">{t("AQSh")}</option>
              </select>
            </div>

            <div className="form">
              <label htmlFor="visa">{t("Visa turini tanlang")}</label>
              <select
                name="visa"
                id="visa"
                value={formData.visa}
                onChange={handleChange}
                required
              >
                <option value="" hidden style={{ color: "gray" }}>
                  {t("Tanlang")}
                </option>
                <option value="Europe">{t("Europe")}</option>
                <option value="England">{t("England")}</option>
                <option value="Japan">{t("Japan")}</option>
                <option value="Oman">{t("Oman")}</option>
                <option value="USA">{t("USA")}</option>
                <option value="Saudiya Arabistoni">{t("Saudi Arabia")}</option>
                <option value="India">{t("India")}</option>
                <option value="China">{t("China")}</option>
                <option value="HongKong">{t("Hong Kong")}</option>
              </select>
            </div>

            <div className="form-btn">
              <button type="submit">{t("Band qilish")}</button>
            </div>
          </form>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <p>{modalMessage}</p>
                <button onClick={() => setShowModal(false)}>{t("OK")}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Concat;
