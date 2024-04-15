import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardType, ErrorType } from "../@types/types";
import { getCardById } from "../services/cards";
import "./Card.scss";
import { FaEnvelope, FaGlobe, FaHeart, FaPhone } from "react-icons/fa";

const Card = () => {

  // dynamic route: /cards/:id
  const { id } = useParams();
  const [card, setCard] = useState<CardType>();
  const [error, setError] = useState<ErrorType>();

  useEffect(() => {
    getCardById(id ?? "")
      .then((res) => {
        setCard(res.data);
      })
      .catch((e) => {
        const status = e.response.status;
        const message = e.message;
        const details = e.response.data;

        setError({ status, message, details });
      });
  }, []);
  return error ? (
    <div>
      <h2>{error.message}</h2>
    </div>
  ) : (
      <div className="card-container bg-white dark:bg-gray-500 text-black dark:text-white">
      <h2 className="card-title">{card?.title}</h2>
      <p className="card-subtitle">{card?.subtitle}</p>
      <p>
          <FaPhone className="text-black dark:text-white" /> Phone: <a href={`tel:${card?.phone}`}>{card?.phone}</a>
      </p>
      <p>
          <FaEnvelope className="text-black dark:text-white" /> Email: <a href={`mailto:${card?.email}`}>{card?.email}</a>
      </p>
      {card?.web && (
        <p>
            <FaGlobe className="text-black dark:text-white" /> Website: <a href={card?.web} target="_blank" rel="noopener noreferrer">{card?.web}</a>
        </p>
      )}
      <p>
          <FaHeart className="text-black dark:text-white" /> Likes: {card?.likes?.length}
      </p>
      <p className="card-address">Address: {`${card?.address?.street} ${card?.address?.houseNumber}, ${card?.address?.city}, ${card?.address?.zip}, ${card?.address?.state}, ${card?.address?.country}`.replace(/,\s*,/g, ', ').trim()}</p>
      <img src={card?.image.url} alt={card?.image.alt} className="card-image" />
    </div>
  );
}
export default Card;
