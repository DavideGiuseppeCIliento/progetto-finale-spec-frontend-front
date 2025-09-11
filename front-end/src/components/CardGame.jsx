import { memo } from "react";
import { Link } from "react-router-dom";

function CardGame({ title, category, id }) {
  return (
    <div
      className="card h-100 shadow-sm border-light"
      style={{ width: "18rem" }}
    >
      <div className="card-body ">
        <h5 className="card-title">
          <strong>{title.toUpperCase()}</strong>
        </h5>
        <p className="card-text">{category}</p>
        <Link to={`${id}`} className="btn btn-dark bg-gradient rounded-4">
          Scopri di più
        </Link>
      </div>
    </div>
  );
}

export default memo(CardGame);
