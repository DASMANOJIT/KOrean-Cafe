"use client";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { label: "About", kr: "소개", href: "#about" },
    { label: "Menu", kr: "메뉴", href: "#menu" },
    { label: "Gallery", kr: "갤러리", href: "#gallery" },
    { label: "Contact", kr: "연락처", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        .ft{background:#060301;padding:80px 56px 40px;position:relative;overflow:hidden;}
        .ft-motif{
          position:absolute;right:-60px;bottom:-60px;
          font-family:'Noto Serif KR',Georgia,serif;font-size:24rem;font-weight:700;
          color:rgba(255,250,245,.02);pointer-events:none;user-select:none;line-height:1;
        }
        .ft-inner{max-width:1280px;margin:0 auto;position:relative;}

        .ft-top{
          display:grid;grid-template-columns:2.5fr 1fr 1fr 1.2fr;gap:64px;
          padding-bottom:64px;border-bottom:1px solid rgba(255,250,245,.06);
          opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s ease;
        }
        .ft-top.vis{opacity:1;transform:translateY(0);}

        .ft-logo-link{text-decoration:none;display:inline-flex;align-items:center;gap:10px;margin-bottom:20px;}
        .ft-logo-mark{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#c97b4b,#7a3a1a);display:flex;align-items:center;justify-content:center;font-size:.85rem;box-shadow:0 0 16px rgba(201,123,75,.3);transition:box-shadow .3s;}
        .ft-logo-link:hover .ft-logo-mark{box-shadow:0 0 28px rgba(201,123,75,.5);}
        .ft-logo-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:1.1rem;font-weight:700;color:#fffaf5;letter-spacing:.04em;}
        .ft-logo-txt span{color:#c97b4b;}
        .ft-brand-desc{font-family:'Cormorant Garamond',Georgia,serif;font-size:.95rem;line-height:1.8;color:rgba(255,250,245,.28);font-weight:300;max-width:260px;margin-bottom:32px;}
        .ft-socials{display:flex;gap:10px;}
        .ft-social{
          width:36px;height:36px;border:1px solid rgba(255,250,245,.1);
          display:flex;align-items:center;justify-content:center;
          font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.06em;
          color:rgba(255,250,245,.3);text-decoration:none;
          transition:border-color .3s,color .3s,background .3s;
        }
        .ft-social:hover{border-color:#c97b4b;color:#c97b4b;background:rgba(201,123,75,.07);}

        .ft-col-head{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;color:#c97b4b;margin-bottom:24px;display:flex;align-items:center;gap:8px;}
        .ft-col-head::after{content:'';flex:1;height:1px;background:rgba(201,123,75,.2);}
        .ft-col-links{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;}
        .ft-col-link{
          font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;
          color:rgba(255,250,245,.35);text-decoration:none;font-weight:300;
          display:flex;align-items:baseline;gap:8px;
          transition:color .3s;position:relative;
        }
        .ft-col-link-kr{font-family:'Noto Serif KR',Georgia,serif;font-size:.55rem;letter-spacing:.08em;color:transparent;transition:color .3s;}
        .ft-col-link:hover{color:#fffaf5;}
        .ft-col-link:hover .ft-col-link-kr{color:rgba(201,123,75,.5);}
        .ft-col-txt{font-family:'Cormorant Garamond',Georgia,serif;font-size:.95rem;color:rgba(255,250,245,.3);font-weight:300;line-height:1.9;}

        .ft-bottom{
          display:flex;justify-content:space-between;align-items:center;
          padding-top:32px;flex-wrap:wrap;gap:16px;
          opacity:0;transition:opacity .8s ease .3s;
        }
        .ft-bottom.vis{opacity:1;}
        .ft-copy{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.1em;color:rgba(255,250,245,.15);}
        .ft-bottom-links{display:flex;gap:24px;}
        .ft-bl{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.1em;color:rgba(255,250,245,.15);text-decoration:none;transition:color .3s;}
        .ft-bl:hover{color:rgba(255,250,245,.4);}
        .ft-back-top{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;
          color:rgba(255,250,245,.2);background:none;border:1px solid rgba(255,250,245,.08);
          padding:8px 16px;cursor:pointer;transition:all .3s;text-decoration:none;display:inline-block;
        }
        .ft-back-top:hover{color:#c97b4b;border-color:#c97b4b;}

        @media(max-width:900px){
          .ft{padding:56px 24px 32px;}
          .ft-top{grid-template-columns:1fr 1fr;gap:40px;}
          .ft-top>div:first-child{grid-column:span 2;}
          .ft-motif{display:none;}
        }
        @media(max-width:500px){
          .ft-top{grid-template-columns:1fr;}
          .ft-top>div:first-child{grid-column:auto;}
        }
      `}</style>

      <footer className="ft" ref={ref}>
        <div className="ft-motif">달빛</div>
        <div className="ft-inner">
          <div className={`ft-top ${vis ? "vis" : ""}`}>
            <div>
              <a href="#hero" className="ft-logo-link">
                <div className="ft-logo-mark">☕</div>
                <span className="ft-logo-txt">달빛<span>카페</span></span>
              </a>
              <p className="ft-brand-desc">
                A sanctuary of Korean flavors and artisan coffee. Every visit, a quiet moment of grace and intention.
              </p>
              <div className="ft-socials">
                {[["IG","Instagram"],["KT","KakaoTalk"],["NV","Naver"],["YT","YouTube"]].map(([s,a]) => (
                  <a key={s} href="#" className="ft-social" aria-label={a}>{s}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="ft-col-head">Navigate</div>
              <ul className="ft-col-links">
                {navLinks.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="ft-col-link">
                      {l.label}
                      <span className="ft-col-link-kr">{l.kr}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="ft-col-head">Visit Us</div>
              <p className="ft-col-txt">
                23 Bukchon-ro<br/>
                Jongno-gu, Seoul<br/><br/>
                Mon–Fri  8am–9pm<br/>
                Sat–Sun  9am–10pm
              </p>
            </div>

            <div>
              <div className="ft-col-head">Contact</div>
              <p className="ft-col-txt">
                +82 2-123-4567<br/>
                hello@dalbit.cafe<br/><br/>
                Private events & catering available upon request.
              </p>
            </div>
          </div>

          <div className={`ft-bottom ${vis ? "vis" : ""}`}>
            <span className="ft-copy">© 2025 달빛카페 Dalbit Café. All rights reserved.</span>
            <div className="ft-bottom-links">
              <a href="#" className="ft-bl">Privacy</a>
              <a href="#" className="ft-bl">Terms</a>
            </div>
            <a href="#hero" className="ft-back-top">↑ Back to Top</a>
          </div>
        </div>
      </footer>
    </>
  );
}