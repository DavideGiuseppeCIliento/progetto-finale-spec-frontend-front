import { memo } from "react";

function CardGame({ title, category }) {
  return (
    <div className="card h-100 " style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <strong>{title.toUpperCase()}</strong>
        </h5>
        <p className="card-text">{category}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default memo(CardGame);
