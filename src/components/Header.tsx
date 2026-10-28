type HeaderProps = {
  cartCount: number;
  page: "shop" | "cart";
  onNavigate: (page: "shop" | "cart") => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function Header({ cartCount,
  page,
  onNavigate,
  isDarkMode,
  onToggleTheme, }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand-button" onClick={() => onNavigate("shop")} aria-label="Go to shop">
          <span className="brand-mark">e</span>
          <span>everyday<span className="brand-dot">.</span></span>
        </button>
        <nav className="header-nav" aria-label="Main navigation">
          <button className={page === "shop" ? "nav-link active" : "nav-link"} onClick={() => onNavigate("shop")}>
            Home
          </button>
          <button className={page === "cart" ? "cart-nav active" : "cart-nav"} onClick={() => onNavigate("cart")}>
            <span aria-hidden="true">Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
          <button
  type="button"
  className="nav-link theme-toggle"
  onClick={onToggleTheme}
  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
>
  {isDarkMode ? "☀ Light" : "☾ Dark"}
</button>
        </nav>
      </div>
    </header>
  );
}