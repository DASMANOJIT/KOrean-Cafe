"use client";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hovered, setHovered] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const refs = useRef({});

  const links = [
    { id: "about", label: "About", kr: "소개" },
    { id: "menu", label: "Menu", kr: "메뉴" },
    { id: "gallery", label: "Gallery", kr: "갤러리" },
    { id: "contact", label: "Contact", kr: "연락처" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["hero","about","menu","gallery","contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const key = hovered || activeSection;
    const el = refs.current[key];
    if (el && el.parentElement) {
      const r = el.getBoundingClientRect();
      const pr = el.parentElement.getBoundingClientRect();
      setIndicator({ left: r.left - pr.left, width: r.width, opacity: 1 });
    }
  }, [hovered, activeSection]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        :root{--ink:#1a0c06;--cream:#fffaf5;--gold:#c97b4b;--gold2:#a85e32;}

        .nb{position:fixed;top:0;left:0;right:0;z-index:200;padding:0 56px;transition:all .5s cubic-bezier(.25,.46,.45,.94);}
        .nb-inner{display:flex;align-items:center;justify-content:space-between;height:80px;transition:all .5s ease;position:relative;}
        .nb.scrolled .nb-inner{
          height:64px;background:rgba(10,5,2,.88);
          backdrop-filter:blur(28px) saturate(200%);-webkit-backdrop-filter:blur(28px) saturate(200%);
          border-bottom:1px solid rgba(201,123,75,.18);border-radius:0 0 20px 20px;
          padding:0 28px;margin:0 -28px;
          box-shadow:0 12px 48px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04);
        }

        .nb-logo{display:flex;align-items:center;gap:12px;text-decoration:none;}
        .nb-logo-mark{
          width:38px;height:38px;border-radius:50%;
          background:linear-gradient(135deg,#c97b4b,#7a3a1a);
          display:flex;align-items:center;justify-content:center;font-size:1rem;
          box-shadow:0 0 24px rgba(201,123,75,.35);
          transition:box-shadow .3s,transform .5s cubic-bezier(.34,1.56,.64,1);
        }
        .nb-logo:hover .nb-logo-mark{box-shadow:0 0 40px rgba(201,123,75,.65);transform:rotate(20deg) scale(1.1);}
        .nb-logo-kr{font-family:'Noto Serif KR',Georgia,serif;font-size:1.1rem;font-weight:700;color:#fffaf5;letter-spacing:.05em;display:block;line-height:1.2;}
        .nb-logo-kr span{color:#c97b4b;}
        .nb-logo-en{font-family:'Cormorant Garamond',Georgia,serif;font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,250,245,.3);display:block;}

        .nb-links{display:flex;align-items:center;list-style:none;margin:0;padding:0;position:relative;}
        .nb-ind{
          position:absolute;bottom:-1px;height:1px;
          background:linear-gradient(90deg,transparent,#c97b4b 30%,#e8a87c 50%,#c97b4b 70%,transparent);
          transition:all .38s cubic-bezier(.25,.46,.45,.94);pointer-events:none;
          filter:drop-shadow(0 0 6px #c97b4b);
        }
        .nb-link{
          display:flex;flex-direction:column;align-items:center;padding:8px 22px;
          text-decoration:none;border:none;background:none;cursor:pointer;
        }
        .nb-link-en{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.72rem;
          letter-spacing:.14em;text-transform:uppercase;
          color:rgba(255,250,245,.45);transition:color .3s;display:block;line-height:1.5;
        }
        .nb-link-kr{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.5rem;letter-spacing:.1em;
          color:transparent;transition:all .3s;display:block;line-height:1;
        }
        .nb-link:hover .nb-link-en,.nb-link.active .nb-link-en{color:#fffaf5;}
        .nb-link:hover .nb-link-kr,.nb-link.active .nb-link-kr{color:rgba(201,123,75,.65);}

        .nb-right{display:flex;align-items:center;gap:16px;}
        .nb-cta{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.65rem;
          letter-spacing:.18em;text-transform:uppercase;color:#1a0c06;
          background:linear-gradient(135deg,#c97b4b,#e8a87c);
          padding:10px 26px;border:none;cursor:pointer;text-decoration:none;display:inline-block;
          position:relative;overflow:hidden;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:transform .2s,box-shadow .3s;
          box-shadow:0 4px 20px rgba(201,123,75,.25);
        }
        .nb-cta::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,250,245,.2),transparent);
          transform:translateX(-100%);transition:transform .5s;
        }
        .nb-cta:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(201,123,75,.5);}
        .nb-cta:hover::after{transform:translateX(100%);}

        .nb-ham{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:300;}
        .nb-bar{display:block;height:1.5px;background:#fffaf5;transition:all .4s cubic-bezier(.23,1,.32,1);transform-origin:center;}
        .nb-bar-1{width:26px;}.nb-bar-2{width:18px;}.nb-bar-3{width:22px;}
        .nb-ham.open .nb-bar-1{transform:translateY(6.5px) rotate(45deg);width:22px;}
        .nb-ham.open .nb-bar-2{opacity:0;transform:scaleX(0);}
        .nb-ham.open .nb-bar-3{transform:translateY(-6.5px) rotate(-45deg);width:22px;}

        .nb-mob{
          position:fixed;inset:0;z-index:250;background:#0a0502;
          transform:translateX(100%);transition:transform .65s cubic-bezier(.76,0,.24,1);
          display:flex;flex-direction:column;
        }
        .nb-mob.open{transform:translateX(0);}
        .nb-mob-bg{
          position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse at 90% 10%,rgba(201,123,75,.1) 0%,transparent 55%),
                    radial-gradient(ellipse at 10% 90%,rgba(201,123,75,.06) 0%,transparent 50%);
        }
        .nb-mob-inner{flex:1;display:flex;flex-direction:column;justify-content:center;padding:80px 48px;position:relative;}
        .nb-mob-list{list-style:none;margin:0;padding:0;}
        .nb-mob-item{border-bottom:1px solid rgba(255,250,245,.06);overflow:hidden;}
        .nb-mob-link{
          display:flex;align-items:baseline;gap:14px;padding:22px 0;text-decoration:none;
          transform:translateY(50px);opacity:0;
          transition:transform .55s ease,opacity .55s ease,color .3s;
        }
        .nb-mob.open .nb-mob-link{transform:translateY(0);opacity:1;}
        .nb-mob.open .nb-mob-item:nth-child(1) .nb-mob-link{transition-delay:.08s;}
        .nb-mob.open .nb-mob-item:nth-child(2) .nb-mob-link{transition-delay:.15s;}
        .nb-mob.open .nb-mob-item:nth-child(3) .nb-mob-link{transition-delay:.22s;}
        .nb-mob.open .nb-mob-item:nth-child(4) .nb-mob-link{transition-delay:.29s;}
        .nb-mob-num{font-family:'Cormorant Garamond',Georgia,serif;font-size:.8rem;color:#c97b4b;letter-spacing:.1em;}
        .nb-mob-en{font-family:'Cormorant Garamond',Georgia,serif;font-size:3.2rem;font-weight:300;color:#fffaf5;line-height:1;transition:color .3s;}
        .nb-mob-kr{font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;color:rgba(255,250,245,.2);margin-left:auto;letter-spacing:.08em;}
        .nb-mob-link:hover .nb-mob-en{color:#c97b4b;}
        .nb-mob-foot{padding:28px 48px;border-top:1px solid rgba(255,250,245,.06);display:flex;justify-content:space-between;align-items:center;}
        .nb-mob-foot-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:.65rem;color:rgba(255,250,245,.2);letter-spacing:.1em;}
        .nb-mob-foot-cta{font-family:'Noto Serif KR',Georgia,serif;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:#1a0c06;background:#c97b4b;padding:10px 20px;text-decoration:none;}

        @media(max-width:900px){
          .nb{padding:0 24px;}
          .nb-links,.nb-cta{display:none;}
          .nb-ham{display:flex;}
        }
      `}</style>

      <nav className={`nb ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-inner">
          <a href="#hero" className="nb-logo">
            <div className="nb-logo-mark">☕</div>
            <div>
              <span className="nb-logo-kr">달빛<span>카페</span></span>
              <span className="nb-logo-en">Dalbit Café</span>
            </div>
          </a>

          <ul className="nb-links">
            <div className="nb-ind" style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }} />
            {links.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  ref={el => { refs.current[l.id] = el; }}
                  className={`nb-link ${activeSection === l.id ? "active" : ""}`}
                  onMouseEnter={() => setHovered(l.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="nb-link-en">{l.label}</span>
                  <span className="nb-link-kr">{l.kr}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nb-right">
            <a href="#contact" className="nb-cta">Reserve a Table</a>
            <button className={`nb-ham ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className="nb-bar nb-bar-1"/><span className="nb-bar nb-bar-2"/><span className="nb-bar nb-bar-3"/>
            </button>
          </div>
        </div>
      </nav>

      <div className={`nb-mob ${menuOpen ? "open" : ""}`}>
        <div className="nb-mob-bg" />
        <div className="nb-mob-inner">
          <ul className="nb-mob-list">
            {links.map((l, i) => (
              <li key={l.id} className="nb-mob-item">
                <a href={`#${l.id}`} className="nb-mob-link" onClick={() => setMenuOpen(false)}>
                  <span className="nb-mob-num">0{i+1}</span>
                  <span className="nb-mob-en">{l.label}</span>
                  <span className="nb-mob-kr">{l.kr}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nb-mob-foot">
          <span className="nb-mob-foot-txt">달빛카페 © 2025</span>
          <a href="#contact" className="nb-mob-foot-cta" onClick={() => setMenuOpen(false)}>Reserve</a>
        </div>
      </div>
    </>
  );
}