"use client";
import { useState, useEffect, useRef } from "react";

const menuData = {
  Drinks: [
    { name: "Dalgona Latte", kr: "달고나 라떼", desc: "Whipped coffee cream over oat milk", price: "₩6,500", tag: "Best Seller" },
    { name: "Hojicha Latte", kr: "호지차 라떼", desc: "Roasted green tea, house oat milk", price: "₩6,000", tag: null },
    { name: "Omija Ade", kr: "오미자 에이드", desc: "Five-flavor berry, sparkling water", price: "₩6,500", tag: "Seasonal" },
    { name: "Sikhye Float", kr: "식혜 플로트", desc: "Traditional sweet rice punch, vanilla", price: "₩7,000", tag: null },
    { name: "Cold Brew Soju Tonic", kr: "콜드브루 토닉", desc: "Coffee, tonic, whisper of citrus", price: "₩8,000", tag: "New" },
    { name: "Ssanghwa Americano", kr: "쌍화 아메리카노", desc: "Herbal tonic espresso blend", price: "₩5,500", tag: null },
  ],
  Food: [
    { name: "Hotteok Waffle", kr: "호떡 와플", desc: "Brown sugar syrup, cinnamon cream", price: "₩8,500", tag: "Best Seller" },
    { name: "Tteok Toast", kr: "떡 토스트", desc: "Chewy rice cake, black sesame butter", price: "₩9,000", tag: null },
    { name: "Gyeran Toast", kr: "계란 토스트", desc: "Korean egg sandwich, sweet cabbage", price: "₩8,000", tag: null },
    { name: "Injeolmi Croissant", kr: "인절미 크루아상", desc: "Bean powder, honey, flaky pastry", price: "₩7,500", tag: "New" },
    { name: "Doenjang Scone", kr: "된장 스콘", desc: "Soybean paste, aged cheddar", price: "₩6,500", tag: null },
    { name: "Yakgwa Financier", kr: "약과 피낭시에", desc: "Honey ginger, sesame caramel", price: "₩5,500", tag: null },
  ],
  Desserts: [
    { name: "Matcha Bingsu", kr: "말차 빙수", desc: "Shaved milk ice, red bean, mochi", price: "₩12,000", tag: "Best Seller" },
    { name: "Patbingsu Classic", kr: "팥빙수", desc: "Red bean, tteok, condensed milk", price: "₩11,000", tag: null },
    { name: "Strawberry Ddeok", kr: "딸기 떡", desc: "Fresh strawberry rice cake", price: "₩4,500", tag: "Seasonal" },
    { name: "Chestnut Mont-Bong", kr: "밤 몽블랑", desc: "Chestnut cream, mont blanc style", price: "₩9,500", tag: null },
    { name: "Honey Yakshik", kr: "약식", desc: "Sticky sweet rice, jujube, pine nut", price: "₩7,000", tag: null },
    { name: "Black Sesame Panna Cotta", kr: "흑임자 판나코타", desc: "Silken sesame, yuzu jelly", price: "₩8,000", tag: "New" },
  ],
};

export default function Menu() {
  const [active, setActive] = useState("Drinks");
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const switchTab = (cat) => {
    if (cat === active || animating) return;
    setAnimating(true);
    setPrev(active);
    setTimeout(() => { setActive(cat); setPrev(null); setAnimating(false); }, 350);
  };

  const items = menuData[active];
  const cats = Object.keys(menuData);

  return (
    <>
      <style>{`
        .mn{background:#0a0502;padding:140px 56px;position:relative;overflow:hidden;}
        .mn-bg-motif{
          position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
          font-family:'Noto Serif KR',Georgia,serif;font-size:40rem;font-weight:700;
          color:rgba(255,250,245,.012);pointer-events:none;user-select:none;line-height:1;
          letter-spacing:-.05em;
        }
        .mn-inner{max-width:1280px;margin:0 auto;position:relative;}
        .mn-header{text-align:center;margin-bottom:72px;
          opacity:0;transform:translateY(30px);transition:opacity .9s ease,transform .9s ease;
        }
        .mn-header.vis{opacity:1;transform:translateY(0);}
        .mn-eye{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:20px;}
        .mn-eye-line{width:36px;height:1px;background:linear-gradient(90deg,transparent,#c97b4b);}
        .mn-eye-line2{width:36px;height:1px;background:linear-gradient(90deg,#c97b4b,transparent);}
        .mn-eye-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:#c97b4b;}
        .mn-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.8rem,5vw,4.5rem);font-weight:300;color:#fffaf5;margin:0;letter-spacing:-.01em;}
        .mn-title em{font-style:italic;color:#c97b4b;}

        .mn-tabs{display:flex;justify-content:center;gap:0;margin-bottom:64px;position:relative;}
        .mn-tab-bg{
          position:absolute;bottom:0;height:1px;
          background:rgba(255,250,245,.08);left:0;right:0;
        }
        .mn-tab{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.75rem;
          letter-spacing:.15em;text-transform:uppercase;
          color:rgba(255,250,245,.3);background:none;border:none;cursor:pointer;
          padding:14px 36px;position:relative;transition:color .3s;
          display:flex;flex-direction:column;align-items:center;gap:4px;
        }
        .mn-tab.active{color:#fffaf5;}
        .mn-tab-kr{font-family:'Noto Serif KR',Georgia,serif;font-size:.5rem;letter-spacing:.1em;color:rgba(201,123,75,0);transition:color .3s;}
        .mn-tab.active .mn-tab-kr{color:rgba(201,123,75,.6);}
        .mn-tab::after{
          content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,#c97b4b,transparent);
          transform:scaleX(0);transition:transform .35s ease;
        }
        .mn-tab.active::after{transform:scaleX(1);}
        .mn-tab:hover{color:rgba(255,250,245,.7);}

        .mn-grid-wrap{min-height:360px;position:relative;}
        .mn-grid{
          display:grid;grid-template-columns:1fr 1fr;gap:0;
          transition:opacity .35s ease,transform .35s ease;
        }
        .mn-grid.fade-out{opacity:0;transform:translateY(8px);}
        .mn-grid.fade-in{opacity:1;transform:translateY(0);}

        .mn-item{
          padding:24px 20px;border-bottom:1px solid rgba(255,250,245,.05);
          display:flex;justify-content:space-between;align-items:flex-start;gap:16px;
          position:relative;transition:background .25s;cursor:default;
          opacity:0;transform:translateY(16px);
        }
        .mn-item.vis{opacity:1;transform:translateY(0);}
        .mn-item:hover{background:rgba(201,123,75,.04);}
        .mn-item::before{
          content:'';position:absolute;left:0;top:50%;height:0;width:2px;
          background:#c97b4b;transform:translateY(-50%);
          transition:height .3s ease;opacity:0;
        }
        .mn-item:hover::before{height:60%;opacity:1;}
        .mn-item-names{}
        .mn-item-en{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;color:#fffaf5;font-weight:400;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
        .mn-item-tag{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.55rem;
          letter-spacing:.1em;text-transform:uppercase;
          padding:2px 8px;border-radius:1px;
        }
        .mn-tag-bs{background:rgba(201,123,75,.9);color:#0a0502;}
        .mn-tag-new{background:transparent;border:1px solid rgba(201,123,75,.5);color:#c97b4b;}
        .mn-tag-sea{background:rgba(255,250,245,.08);color:rgba(255,250,245,.5);}
        .mn-item-kr{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;color:rgba(255,250,245,.2);margin-top:3px;letter-spacing:.06em;}
        .mn-item-desc{font-family:'Cormorant Garamond',Georgia,serif;font-size:.88rem;color:rgba(255,250,245,.3);margin-top:5px;font-weight:300;}
        .mn-item-price{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.05rem;color:#c97b4b;white-space:nowrap;font-style:italic;padding-top:2px;}

        .mn-footer{
          margin-top:64px;padding-top:40px;border-top:1px solid rgba(255,250,245,.06);
          display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;
          opacity:0;transform:translateY(20px);transition:opacity .8s ease .4s,transform .8s ease .4s;
        }
        .mn-footer.vis{opacity:1;transform:translateY(0);}
        .mn-footer-txt{font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;color:rgba(255,250,245,.3);font-style:italic;}
        .mn-footer-note{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.12em;color:rgba(255,250,245,.15);}
        .mn-full-btn{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;
          color:rgba(255,250,245,.5);text-decoration:none;border-bottom:1px solid rgba(255,250,245,.2);
          padding-bottom:2px;transition:color .3s,border-color .3s;
        }
        .mn-full-btn:hover{color:#fffaf5;border-color:#c97b4b;}

        @media(max-width:900px){
          .mn{padding:80px 24px;}
          .mn-grid{grid-template-columns:1fr;}
          .mn-tab{padding:12px 20px;}
        }
      `}</style>

      <section className="mn" id="menu" ref={ref}>
        <div className="mn-bg-motif">메</div>
        <div className="mn-inner">
          <div className={`mn-header ${vis ? "vis" : ""}`}>
            <div className="mn-eye">
              <div className="mn-eye-line" />
              <span className="mn-eye-txt">메뉴</span>
              <div className="mn-eye-line2" />
            </div>
            <h2 className="mn-title">Our <em>Seasonal</em> Menu</h2>
          </div>

          <div className="mn-tabs">
            <div className="mn-tab-bg" />
            {cats.map((cat, i) => {
              const krs = ["음료","음식","디저트"];
              return (
                <button key={cat} className={`mn-tab ${active === cat ? "active" : ""}`} onClick={() => switchTab(cat)}>
                  {cat}
                  <span className="mn-tab-kr">{krs[i]}</span>
                </button>
              );
            })}
          </div>

          <div className="mn-grid-wrap">
            <div className={`mn-grid ${animating ? "fade-out" : "fade-in"}`}>
              {items.map((item, i) => (
                <MnItem key={item.name} item={item} delay={i * 50} />
              ))}
            </div>
          </div>

          <div className={`mn-footer ${vis ? "vis" : ""}`}>
            <span className="mn-footer-txt">Seasonal ingredients, always fresh.</span>
            <span className="mn-footer-note">All prices include VAT · Menu changes seasonally</span>
            <a href="#contact" className="mn-full-btn">View Full Menu →</a>
          </div>
        </div>
      </section>
    </>
  );
}

function MnItem({ item, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
      if (ref.current) obs.observe(ref.current);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  const tagClass = item.tag === "Best Seller" ? "mn-tag-bs" : item.tag === "New" ? "mn-tag-new" : "mn-tag-sea";

  return (
    <div ref={ref} className={`mn-item ${vis ? "vis" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="mn-item-names">
        <div className="mn-item-en">
          {item.name}
          {item.tag && <span className={`mn-item-tag ${tagClass}`}>{item.tag}</span>}
        </div>
        <div className="mn-item-kr">{item.kr}</div>
        <div className="mn-item-desc">{item.desc}</div>
      </div>
      <div className="mn-item-price">{item.price}</div>
    </div>
  );
}