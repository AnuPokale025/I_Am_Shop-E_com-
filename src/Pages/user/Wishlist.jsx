import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart, Trash2, Clock, ShoppingBag, ArrowRight,
  Zap, X, ShoppingCart, Search, Home, User, Package
} from "lucide-react";
import wishlistAPI from "../../api/wishlist.api";
import apiClient from "../../api/axios";

/* ═══════════════════════════════════════════
   BLINKIT-STYLE DESIGN SYSTEM
   Yellow #F8D63D · Black #0D0D0D · White #FFF
═══════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --yellow:      #F8D63D;
    --yellow-dk:   #E5C22A;
    --yellow-pale: #FFFDE8;
    --black:       #0D0D0D;
    --dark:        #1A1A1A;
    --g1:          #2D2D2D;
    --g2:          #5A5A5A;
    --g3:          #9A9A9A;
    --g4:          #E2E2E2;
    --g5:          #F5F5F5;
    --g6:          #FAFAFA;
    --white:       #FFFFFF;
    --green:       #0C831F;
    --red:         #E53935;
    --red-lt:      #FFF1F1;
    --shadow-sm:   0 2px 8px rgba(0,0,0,0.06);
    --shadow-md:   0 6px 24px rgba(0,0,0,0.1);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .wl-app {
    min-height: 100vh; background: var(--g5);
    font-family: 'Plus Jakarta Sans', sans-serif; color: var(--black);
  }

  /* ─── TOP NAV ─── */
  .wl-nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--black); height: 62px;
    display: flex; align-items: center; padding: 0 24px; gap: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.35);
  }
  .wl-nav-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; flex-shrink: 0; }
  .wl-nav-zap {
    width: 34px; height: 34px; background: var(--yellow);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
  }
  .wl-nav-zap svg { width: 18px; height: 18px; color: var(--black); }
  .wl-nav-name { font-size: 19px; font-weight: 800; color: var(--white); letter-spacing: -0.02em; }
  .wl-nav-name span { color: var(--yellow); }
  .wl-nav-search { flex: 1; max-width: 500px; position: relative; }
  .wl-nav-input {
    width: 100%; padding: 9px 14px 9px 38px;
    background: rgba(255,255,255,0.09); border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px; color: var(--white); outline: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .wl-nav-input::placeholder { color: rgba(255,255,255,0.38); }
  .wl-nav-input:focus { background: rgba(255,255,255,0.14); border-color: rgba(248,214,61,0.45); }
  .wl-nav-ico { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: rgba(255,255,255,0.38); }
  .wl-nav-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
  .wl-nav-btn {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px; padding: 7px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600;
    color: var(--white); cursor: pointer; text-decoration: none; transition: background 0.15s;
  }
  .wl-nav-btn:hover { background: rgba(255,255,255,0.14); }
  .wl-nav-btn svg { width: 15px; height: 15px; }
  .wl-nav-btn-y { background: var(--yellow); border-color: var(--yellow); color: var(--black); }
  .wl-nav-btn-y:hover { background: var(--yellow-dk); }

  /* ─── PAGE BODY ─── */
  .wl-body { display: flex; max-width: 1360px; margin: 0 auto; padding: 28px 20px 110px; gap: 24px; align-items: flex-start; }

  /* ─── SIDEBAR ─── */
  .wl-sidebar { width: 256px; flex-shrink: 0; display: none; flex-direction: column; gap: 16px; position: sticky; top: 90px; }
  @media (min-width: 900px) { .wl-sidebar { display: flex; } }

  .wl-sb-card { background: var(--white); border-radius: 16px; box-shadow: var(--shadow-sm); overflow: hidden; }
  .wl-sb-head { padding: 14px 18px 12px; border-bottom: 1px solid var(--g4); }
  .wl-sb-head-ttl { font-size: 11px; font-weight: 700; color: var(--g3); letter-spacing: 0.1em; text-transform: uppercase; }

  .wl-sb-link {
    display: flex; align-items: center; gap: 12px; padding: 12px 18px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500;
    color: var(--g1); text-decoration: none; transition: background 0.15s;
    border-bottom: 1px solid var(--g5);
  }
  .wl-sb-link:last-child { border-bottom: none; }
  .wl-sb-link:hover { background: var(--g5); }
  .wl-sb-link.active { background: var(--yellow-pale); font-weight: 700; color: var(--black); border-left: 3px solid var(--yellow-dk); }
  .wl-sb-ico { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .wl-sb-ico svg { width: 16px; height: 16px; }
  .wl-sb-badge { margin-left: auto; background: var(--yellow); color: var(--black); font-size: 11px; font-weight: 800; border-radius: 100px; padding: 2px 8px; }

  .wl-summary { background: var(--black); border-radius: 16px; padding: 20px 18px; box-shadow: var(--shadow-md); }
  .wl-sum-ttl { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--g3); margin-bottom: 14px; }
  .wl-sum-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .wl-sum-row:last-of-type { border-bottom: none; }
  .wl-sum-lbl { font-size: 13px; color: var(--g3); }
  .wl-sum-val { font-size: 14px; font-weight: 700; color: var(--white); }
  .wl-sum-val.yl { color: var(--yellow); }
  .wl-sum-btn {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    width: 100%; margin-top: 16px; padding: 12px;
    background: var(--yellow); color: var(--black); border: none; border-radius: 11px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 700;
    cursor: pointer; text-decoration: none; transition: background 0.15s, transform 0.15s;
    box-shadow: 0 4px 16px rgba(248,214,61,0.4);
  }
  .wl-sum-btn:hover { background: var(--yellow-dk); transform: translateY(-1px); }
  .wl-sum-btn svg { width: 15px; height: 15px; }

  /* ─── MAIN ─── */
  .wl-main { flex: 1; min-width: 0; }
  .wl-ph { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
  .wl-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--g3); margin-bottom: 4px; }
  .wl-title { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; color: var(--black); display: flex; align-items: center; gap: 10px; }
  .wl-chip { font-size: 13px; font-weight: 800; background: var(--yellow); color: var(--black); border-radius: 8px; padding: 2px 10px; }
  .wl-clear-btn {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); border: 1.5px solid var(--g4); border-radius: 10px; padding: 9px 16px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--g2); cursor: pointer; transition: all 0.15s;
  }
  .wl-clear-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-lt); }
  .wl-clear-btn svg { width: 14px; height: 14px; }
  .wl-err {
    background: var(--red-lt); border: 1.5px solid #FECACA; border-radius: 12px;
    padding: 12px 16px; font-size: 13px; font-weight: 500; color: var(--red);
    margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
  }
  .wl-err-dot { width: 18px; height: 18px; min-width: 18px; background: var(--red); color: #fff; border-radius: 50%; font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; }

  /* ─── Grid ─── */
  .wl-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  @media (min-width: 560px)  { .wl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 900px)  { .wl-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1080px) { .wl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1280px) { .wl-grid { grid-template-columns: repeat(4, 1fr); } }

  /* ─── Card ─── */
  .wl-card {
    background: var(--white); border-radius: 16px; overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
    animation: fadeUp 0.35s both ease-out;
  }
  .wl-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  .wl-card-img-area {
    position: relative; background: var(--g6); padding: 20px 16px 14px;
    display: flex; justify-content: center; align-items: center;
    min-height: 144px; border-bottom: 1px solid var(--g5);
  }
  .wl-card-img { height: 100px; object-fit: contain; transition: transform 0.25s ease; }
  .wl-card:hover .wl-card-img { transform: scale(1.07); }

  .wl-fast-badge {
    position: absolute; top: 9px; left: 9px;
    display: flex; align-items: center; gap: 3px;
    background: var(--green); color: #fff; font-size: 9.5px; font-weight: 700;
    border-radius: 6px; padding: 3px 7px;
  }
  .wl-fast-badge svg { width: 9px; height: 9px; }

  .wl-rm-btn {
    position: absolute; top: 9px; right: 9px; width: 28px; height: 28px;
    background: var(--white); border: 1px solid var(--g4); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s; box-shadow: var(--shadow-sm);
  }
  .wl-rm-btn:hover { background: var(--red-lt); border-color: var(--red); transform: scale(1.12); }
  .wl-rm-btn svg { width: 12px; height: 12px; color: var(--red); }

  .wl-card-body { padding: 12px 13px 13px; }
  .wl-card-name {
    font-size: 13px; font-weight: 600; color: var(--black); line-height: 1.35;
    min-height: 36px; display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 10px;
  }
  .wl-card-foot { display: flex; align-items: center; justify-content: space-between; }
  .wl-price { font-size: 16px; font-weight: 800; letter-spacing: -0.02em; }
  .wl-price sup { font-size: 10px; font-weight: 600; color: var(--g2); vertical-align: super; margin-right: 1px; }
  .wl-add-btn {
    background: var(--white); border: 2px solid var(--green); color: var(--green);
    border-radius: 9px; padding: 6px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 800;
    cursor: pointer; letter-spacing: 0.02em; transition: all 0.15s;
  }
  .wl-add-btn:hover { background: var(--green); color: var(--white); transform: scale(1.05); }

  /* ─── Skeleton ─── */
  .wl-skel-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  @media (min-width: 560px)  { .wl-skel-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1080px) { .wl-skel-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1280px) { .wl-skel-grid { grid-template-columns: repeat(4, 1fr); } }
  .wl-skel-card { background: var(--white); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); }
  .wl-skel-img { height: 144px; }
  .wl-skel-body { padding: 12px 13px 13px; }
  .wl-skel-line { height: 12px; border-radius: 6px; margin-bottom: 8px; }
  .wl-skel-img, .wl-skel-line {
    background: linear-gradient(90deg, var(--g5) 25%, var(--g4) 50%, var(--g5) 75%);
    background-size: 200% 100%; animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
  .s60 { width: 60%; } .s35 { width: 35%; }

  /* ─── Empty ─── */
  .wl-empty { background: var(--white); border-radius: 20px; box-shadow: var(--shadow-sm); padding: 72px 36px; text-align: center; animation: fadeUp 0.4s both ease-out; }
  .wl-empty-ring {
    width: 88px; height: 88px; background: var(--yellow-pale); border: 3px solid var(--yellow);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; box-shadow: 0 6px 24px rgba(248,214,61,0.35);
    animation: popIn 0.45s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes popIn { from { opacity:0; transform:scale(0.55); } to { opacity:1; transform:scale(1); } }
  .wl-empty-ring svg { width: 38px; height: 38px; color: var(--yellow-dk); }
  .wl-empty-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
  .wl-empty-sub { font-size: 14px; color: var(--g2); line-height: 1.6; margin-bottom: 28px; }
  .wl-empty-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--black); color: var(--white); text-decoration: none;
    padding: 13px 28px; border-radius: 12px; font-size: 14px; font-weight: 700;
    transition: all 0.2s; box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
  .wl-empty-btn:hover { background: var(--dark); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.28); }
  .wl-empty-btn svg { width: 15px; height: 15px; }

  /* ─── Footer (mobile only) ─── */
  .wl-footer { position: fixed; bottom:0; left:0; right:0; z-index:200; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-top: 1px solid var(--g4); padding: 12px 16px 18px; }
  @media (min-width: 900px) { .wl-footer { display: none; } }
  .wl-footer-in { display: flex; gap: 10px; max-width: 600px; margin: 0 auto; }
  .wl-foot-clear {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
    background: none; border: 1.5px solid var(--g4); border-radius: 12px; padding: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 600;
    color: var(--g2); cursor: pointer; transition: all 0.15s;
  }
  .wl-foot-clear:hover { border-color: var(--red); color: var(--red); background: var(--red-lt); }
  .wl-foot-clear svg { width: 14px; height: 14px; }
  .wl-foot-shop {
    flex: 2; display: flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--black); color: var(--white); border: none; border-radius: 12px; padding: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 700;
    cursor: pointer; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  }
  .wl-foot-shop:hover { background: var(--dark); transform: translateY(-1px); }
  .wl-foot-shop svg { width: 15px; height: 15px; }
  .wl-arrow-chip { width: 20px; height: 20px; background: var(--yellow); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .wl-arrow-chip svg { width: 11px; height: 11px; color: var(--black); }
`;

/* ═══════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════ */
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchWishlist(); 
    window.scrollTo({ top: 0, behavior: "instant" });
  },
   []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");
      const res   = await wishlistAPI.getWishlist();
      const items = res?.items || [];

      const productsWithImages = await Promise.all(
        items.map(async (item) => {
          try {
            const productRes = await apiClient.get(`/products/${item.productId}`);
            const product    = productRes.data;
            let imageUrl     = "/placeholder.png";
            if (product?.images?.length > 0) {
              const imageName = product.images[0]?.imageUrl;
              imageUrl = imageName?.startsWith("http")
                ? imageName
                : `https://iamashop-production.up.railway.app/api/products/image/${imageName}`;
            }
            return {
              productId: item.productId,
              name:      product?.name    || item.productName,
              price:     Number(product?.price || item.price || 0),
              image:     imageUrl,
              vendorId:  item.vendorId,
            };
          } catch (err) {
            console.error("Product fetch failed:", err);
            return {
              productId: item.productId,
              name:      item.productName,
              price:     Number(item.price || 0),
              image:     "/placeholder.png",
              vendorId:  item.vendorId,
            };
          }
        })
      );
      setWishlistItems(productsWithImages);
    } catch (err) {
      console.error("❌ Fetch wishlist failed", err);
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setWishlistItems((prev) => prev.filter((i) => i.productId !== productId));
    } catch { setError("Failed to remove item"); }
  };

  const handleClearAll = async () => {
    // if (!window.confirm("Clear entire wishlist?")) return;
    try {
      await wishlistAPI.clearWishlist();
      setWishlistItems([]);
    } catch { setError("Failed to clear wishlist"); }
  };

  const totalValue = wishlistItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="wl-app">

        {/* ── TOP NAV ── */}
        {/* <nav className="wl-nav">
          <Link to="/" className="wl-nav-brand">
            <div className="wl-nav-zap"><Zap /></div>
            <span className="wl-nav-name">iama<span>shop</span></span>
          </Link>
          <div className="wl-nav-search">
            <Search className="wl-nav-ico" />
            <input type="text" className="wl-nav-input" placeholder="Search for groceries, snacks & more…" />
          </div>
          <div className="wl-nav-right">
            <Link to="/cart" className="wl-nav-btn"><ShoppingCart /> Cart</Link>
            <Link to="/products" className="wl-nav-btn wl-nav-btn-y"><ShoppingBag /> Shop Now</Link>
          </div>
        </nav> */}

        {/* ── PAGE BODY ── */}
        <div className="wl-body">

          {/* SIDEBAR */}
          {/* <aside className="wl-sidebar">
            <div className="wl-sb-card">
              <div className="wl-sb-head">
                <div className="wl-sb-head-ttl">My Account</div>
              </div>
              <Link to="/orders" className="wl-sb-link">
                <div className="wl-sb-ico" style={{ background: "#FEF0E0" }}>
                  <Package style={{ color: "#D4853A" }} />
                </div>
                My Orders
              </Link>
              <Link to="/wishlist" className="wl-sb-link active">
                <div className="wl-sb-ico" style={{ background: "#FEE8E8" }}>
                  <Heart style={{ color: "#E53935" }} />
                </div>
                Wishlist
                {wishlistItems.length > 0 && (
                  <span className="wl-sb-badge">{wishlistItems.length}</span>
                )}
              </Link>
              <Link to="/profile" className="wl-sb-link">
                <div className="wl-sb-ico" style={{ background: "#E8F7EE" }}>
                  <User style={{ color: "#0C831F" }} />
                </div>
                Profile
              </Link>
              <Link to="/" className="wl-sb-link">
                <div className="wl-sb-ico" style={{ background: "#F5F5F5" }}>
                  <Home style={{ color: "#5A5A5A" }} />
                </div>
                Home
              </Link>
            </div>

            {!loading && wishlistItems.length > 0 && (
              <div className="wl-summary">
                <div className="wl-sum-ttl">Summary</div>
                <div className="wl-sum-row">
                  <span className="wl-sum-lbl">Total items</span>
                  <span className="wl-sum-val">{wishlistItems.length}</span>
                </div>
                <div className="wl-sum-row">
                  <span className="wl-sum-lbl">Total value</span>
                  <span className="wl-sum-val yl">₹{totalValue.toLocaleString("en-IN")}</span>
                </div>
                <Link to="/products" className="wl-sum-btn">
                  <ShoppingBag size={15} /> Shop Now <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </aside> */}

          {/* MAIN */}
          <main className="wl-main">

            {/* Header */}
            <div className="wl-ph">
              <div>
                {/* <div className="wl-eyebrow">Your saved items</div> */}
                <div className="wl-title">
                  My Wishlist
                  {!loading && wishlistItems.length > 0 && (
                    <span className="wl-chip">{wishlistItems.length}</span>
                  )}
                </div>
              </div>
              {!loading && wishlistItems.length > 0 && (
                <button className="wl-clear-btn" onClick={handleClearAll}>
                  <X /> Clear All
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="wl-err">
                <div className="wl-err-dot">!</div>{error}
              </div>
            )}

            {/* Skeleton */}
            {loading && (
              <div className="wl-skel-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="wl-skel-card">
                    <div className="wl-skel-img" />
                    <div className="wl-skel-body">
                      <div className="wl-skel-line" />
                      <div className="wl-skel-line s60" />
                      <div className="wl-skel-line s35" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && wishlistItems.length === 0 && (
              <div className="wl-empty">
                <div className="wl-empty-ring"><Heart /></div>
                <div className="wl-empty-title">Your wishlist is empty</div>
                <div className="wl-empty-sub">
                  Save items you love and come back to them anytime.<br />
                  Tap the ♡ on any product to add it here.
                </div>
                <Link to="/products" className="wl-empty-btn">
                  <ShoppingBag size={15} /> Browse Products <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* Product grid */}
            {!loading && wishlistItems.length > 0 && (
              <div className="wl-grid">
                {wishlistItems.map((item, i) => (
                  <div
                    key={item.productId}
                    className="wl-card"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="wl-card-img-area">
                      <div className="wl-fast-badge"><Clock /> 10 mins</div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="wl-card-img"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                      <button
                        className="wl-rm-btn"
                        onClick={() => handleRemoveItem(item.productId)}
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 />
                      </button>
                    </div>
                    <div className="wl-card-body">
                      <p className="wl-card-name">{item.name}</p>
                      <div className="wl-card-foot">
                        <div className="wl-price">
                          <sup>₹</sup>{item.price.toLocaleString("en-IN")}
                        </div>
                        <button
                          className="wl-add-btn"
                          onClick={() => navigate(`/product/${item.productId}`)}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* ── FOOTER BAR (mobile) ── */}
        {!loading && wishlistItems.length > 0 && (
          <div className="wl-footer">
            <div className="wl-footer-in">
              <button className="wl-foot-clear" onClick={handleClearAll}>
                <X /> Clear All
              </button>
              <Link to="/products" className="wl-foot-shop">
                <ShoppingBag size={15} />
                Shop Now
                <div className="wl-arrow-chip"><ArrowRight /></div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;