function ProductSkeleton() {
  return (
    <div className="card h-100">
      <div className="placeholder-glow">
        <div
          className="placeholder col-12"
          style={{ height: "180px" }}
        />
      </div>

      <div className="card-body">
        <h5 className="placeholder-glow">
          <span className="placeholder col-8" />
        </h5>

        <p className="placeholder-glow">
          <span className="placeholder col-6" />
        </p>

        <p className="placeholder-glow">
          <span className="placeholder col-4" />
        </p>

        <div className="placeholder-glow">
          <span className="placeholder col-12 btn btn-primary disabled" />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;