import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { money } from "../utils/pricing";

type ProductCardProps = {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, quantityInCart, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-card-link" to={`/products/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.thumbnail} alt={product.title} loading="lazy" className="product-image" />
          <span className="product-category">{product.category.replaceAll("-", " ")}</span>
        </div>
      </Link>
      <div className="product-info">
        <div className="product-rating"><span aria-hidden="true">★</span> {product.rating.toFixed(1)} <span className="rating-label">rating</span></div>
        <h3 className="product-title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="product-card-bottom">
          <span className="product-price">{money(product.price)}</span>
          <button className="add-button" onClick={() => onAdd(product)} disabled={quantityInCart >= 5}>
            {quantityInCart >= 5 ? "Max added" : quantityInCart > 0 ? `Add more (${quantityInCart}) +` : "Add to cart +"}
          </button>
        </div>
      </div>
    </article>
  );
}