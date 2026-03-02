"use client";
import { useEffect, useRef, useState } from "react";

const items = [
  { emoji: "☕", label: "Dalgona Latte", kr: "달고나 라떼", col: "#c9a882", span: "tall" },
  { emoji: "🍵", label: "Matcha Bingsu", kr: "말차 빙수", col: "#8faa7e", span: "normal" },
  { emoji: "🌸", label: "Spring Terrace", kr: "봄 테라스", col: "#d4a5a5", span: "normal" },
  { emoji: "🍡", label: "Tteok Selection", kr: "떡 선택", col: "#c4956a", span: "wide" },
  { emoji: "🏮", label: "Evening Ambience", kr: "저녁 분위기", col: "#b87333", span: "normal" },
  { emoji: "🎋", label: "Garden Corner", kr: "정원 코너", col: "#7a9e7e", span: "tall" },
];

export default function Gallery() {
  const refs = useRef([]);
  const [vis, setVis] = useState([]);
  const [headerVis, setHeaderVis] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVis(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers = items.map((_, i) => {
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setVis(v => { const n = [...v]; n[i] = true; return n; });
      }, { threshold: 0.15 });
      if (refs.current[i]) o.observe(refs.current[i]);
      return o;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .gl{background:#fffaf5;padding:140px 56px;overflow:hidden;position:relative;}
        .gl-bg-txt{
          position:absolute;bottom:-40px;right:-20px;
          font-family:'Noto Serif KR',Georgia,serif;font-size:18rem;font-weight:700;
          color:rgba(58,28,14,.04);pointer-events:none;user-select:none;line-height:1;
        }
        .gl-inner{max-width:1280px;margin:0 auto;position:relative;}
        .gl-header{
          display:flex;justify-content:space-between;align-items:flex-end;
          margin-bottom:64px;flex-wrap:wrap;gap:24px;
          opacity:0;transform:translateY(24px);transition:opacity .9s ease,transform .9s ease;
        }
        .gl-header.vis{opacity:1;transform:translateY(0);}
        .gl-eye{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
        .gl-eye-line{width:36px;height:1px;background:linear-gradient(90deg,#c97b4b,transparent);}
        .gl-eye-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:#c97b4b;}
        .gl-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.8rem,4.5vw,4rem);font-weight:300;color:#3a1c0e;margin:0;letter-spacing:-.01em;}
        .gl-title em{font-style:italic;color:#c97b4b;}
        .gl-ig{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;
          color:#3a1c0e;text-decoration:none;display:flex;align-items:center;gap:10px;
          border-bottom:1px solid rgba(58,28,14,.2);padding-bottom:2px;align-self:flex-end;
          transition:color .3s,border-color .3s,gap .3s;
        }
        .gl-ig:hover{color:#c97b4b;border-color:#c97b4b;gap:16px;}

        .gl-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          grid-auto-rows:280px;
          gap:12px;
        }
        .gl-item{
          overflow:hidden;position:relative;cursor:pointer;
          background:#e8d5c0;
          opacity:0;transform:scale(.95);
          transition:opacity .7s ease,transform .7s ease;
        }
        .gl-item.vis{opacity:1;transform:scale(1);}
        .gl-item:nth-child(1){grid-row:span 2;}
        .gl-item:nth-child(4){grid-column:span 2;}
        .gl-item:nth-child(6){grid-row:span 2;}

        .gl-item-fill{
          position:absolute;inset:0;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:12px;
          transition:transform .6s cubic-bezier(.25,.46,.45,.94);
        }
        .gl-item:hover .gl-item-fill{transform:scale(1.06);}
        .gl-item-emoji{font-size:3.5rem;transition:transform .4s ease;}
        .gl-item:hover .gl-item-emoji{transform:scale(1.15) rotate(-5deg);}
        .gl-item-label{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.65rem;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(58,28,14,.4);
          transition:color .3s;
        }

        .gl-item-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(26,12,6,.7) 0%,transparent 60%);
          opacity:0;transition:opacity .4s ease;
          display:flex;flex-direction:column;justify-content:flex-end;padding:24px;
        }
        .gl-item:hover .gl-item-overlay{opacity:1;}
        .gl-ov-en{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.2rem;color:#fffaf5;font-style:italic;font-weight:300;transform:translateY(12px);transition:transform .4s ease;}
        .gl-ov-kr{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.15em;color:rgba(255,250,245,.5);margin-top:4px;transform:translateY(12px);transition:transform .4s ease .04s;}
        .gl-item:hover .gl-ov-en,.gl-item:hover .gl-ov-kr{transform:translateY(0);}
        .gl-item-border{
          position:absolute;inset:0;pointer-events:none;
          border:0px solid rgba(201,123,75,0);transition:border .3s;
        }
        .gl-item:hover .gl-item-border{border:1px solid rgba(201,123,75,.4);}

        @media(max-width:900px){
          .gl{padding:80px 24px;}
          .gl-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:220px;}
          .gl-item:nth-child(1){grid-row:auto;}
          .gl-item:nth-child(4){grid-column:span 2;}
          .gl-item:nth-child(6){grid-row:auto;}
          .gl-bg-txt{display:none;}
        }
      `}</style>

      <section className="gl" id="gallery">
        <div className="gl-bg-txt">갤</div>
        <div className="gl-inner">
          <div className={`gl-header ${headerVis ? "vis" : ""}`} ref={headerRef}>
            <div>
              <div className="gl-eye"><div className="gl-eye-line" /><span className="gl-eye-txt">갤러리</span></div>
              <h2 className="gl-title">A Glimpse of<br/><em>Our World</em></h2>
            </div>
            <a href="#" className="gl-ig">Follow us on Instagram →</a>
          </div>

          <div className="gl-grid">
            {items.map((item, i) => (
              <div
                key={i}
                ref={el => refs.current[i] = el}
                className={`gl-item ${vis[i] ? "vis" : ""}`}
                style={{ background: `linear-gradient(135deg, ${item.col}55 0%, ${item.col}88 100%)`, transitionDelay: `${i * 80}ms` }}
              >
                <div className="gl-item-fill" style={{ background: `linear-gradient(160deg,${item.col}30 0%,${item.col}60 100%)` }}>
                  <span className="gl-item-emoji">{item.emoji}</span>
                  <span className="gl-item-label">{item.label}</span>
                </div>
                <div className="gl-item-overlay">
                  <div className="gl-ov-en">{item.label}</div>
                  <div className="gl-ov-kr">{item.kr}</div>
                </div>
                <div className="gl-item-border" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}