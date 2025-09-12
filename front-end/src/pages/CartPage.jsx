// # IMPORT DIPENDENCES
import { useContext } from "react";

// # IMPORT CONTEXT
import { CartContext } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, setCart } = useContext;

  const hasItems = Array.isArray(cart) && cart.length > 0;

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <h1 className="mb-0">Carrello</h1>
          <span className="badge text-bg-warning">{cart?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
