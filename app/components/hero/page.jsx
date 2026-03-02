"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      life: Math.random(),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += 0.003;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; p.life = 0; }
        const a = p.alpha * Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,123,75,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const specials = [
    { name: "Dalgona Latte", desc: "Whipped coffee cream", price: "₩6,500" },
    { name: "Matcha Bingsu", desc: "Shaved ice, red bean", price: "₩9,500" },
    { name: "Sikhye Float", desc: "Sweet rice punch", price: "₩7,000" },
    { name: "Hojicha Affogato", desc: "Roasted green tea", price: "₩8,000" },
  ];

  return (
    <>
      <style>{`
        .hero{min-height:100vh;background:#0a0502;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
        .hero-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
        .hero-glow1{position:absolute;width:800px;height:800px;border-radius:50%;top:50%;left:55%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(201,123,75,.12) 0%,transparent 65%);pointer-events:none;animation:heroBreath 6s ease-in-out infinite;}
        .hero-glow2{position:absolute;width:400px;height:400px;border-radius:50%;bottom:10%;left:5%;background:radial-gradient(circle,rgba(201,123,75,.06) 0%,transparent 65%);pointer-events:none;}
        @keyframes heroBreath{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.08)}}

        .hero-lines{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
        .hero-line{position:absolute;background:rgba(201,123,75,.06);}
        .hero-line-v{width:1px;top:0;bottom:0;}
        .hero-line-h{height:1px;left:0;right:0;}

        .hero-content{position:relative;z-index:2;max-width:1280px;width:100%;margin:0 auto;padding:0 56px;display:grid;grid-template-columns:1fr 420px;gap:80px;align-items:center;padding-top:80px;}

        .hero-eyebrow{
          display:flex;align-items:center;gap:12px;margin-bottom:28px;
          opacity:0;transform:translateY(20px);
          transition:opacity .8s ease,transform .8s ease;
        }
        .hero-eyebrow.vis{opacity:1;transform:translateY(0);}
        .hero-eye-line{width:36px;height:1px;background:linear-gradient(90deg,#c97b4b,transparent);}
        .hero-eye-text{font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:#c97b4b;}
        .hero-eye-dot{width:4px;height:4px;border-radius:50%;background:#c97b4b;opacity:.6;}

        .hero-title{
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(4rem,7vw,6.5rem);font-weight:300;line-height:.95;
          color:#fffaf5;margin:0 0 8px;letter-spacing:-.02em;
          opacity:0;transform:translateY(30px);
          transition:opacity .9s ease .15s,transform .9s ease .15s;
        }
        .hero-title.vis{opacity:1;transform:translateY(0);}
        .hero-title em{display:block;font-style:italic;color:#c97b4b;font-size:1.1em;}
        .hero-title-kr{
          font-family:'Noto Serif KR',Georgia,serif;
          font-size:clamp(1rem,2vw,1.4rem);font-weight:300;
          color:rgba(255,250,245,.2);letter-spacing:.2em;
          display:block;margin-top:16px;
          opacity:0;transform:translateY(20px);
          transition:opacity .8s ease .35s,transform .8s ease .35s;
        }
        .hero-title-kr.vis{opacity:1;transform:translateY(0);}

        .hero-desc{
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.1rem;line-height:1.9;color:rgba(255,250,245,.5);
          font-weight:300;margin:36px 0 48px;max-width:420px;
          opacity:0;transform:translateY(20px);
          transition:opacity .8s ease .5s,transform .8s ease .5s;
        }
        .hero-desc.vis{opacity:1;transform:translateY(0);}

        .hero-actions{
          display:flex;gap:20px;align-items:center;flex-wrap:wrap;
          opacity:0;transform:translateY(20px);
          transition:opacity .8s ease .65s,transform .8s ease .65s;
        }
        .hero-actions.vis{opacity:1;transform:translateY(0);}
        .hero-btn-p{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.72rem;
          letter-spacing:.18em;text-transform:uppercase;
          color:#0a0502;background:linear-gradient(135deg,#c97b4b,#e8a87c);
          padding:14px 36px;text-decoration:none;display:inline-block;
          position:relative;overflow:hidden;
          box-shadow:0 4px 32px rgba(201,123,75,.35);
          transition:transform .25s,box-shadow .3s;
          clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
        }
        .hero-btn-p::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transform:translateX(-100%);transition:transform .5s;}
        .hero-btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 48px rgba(201,123,75,.55);}
        .hero-btn-p:hover::before{transform:translateX(100%);}
        .hero-btn-g{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.72rem;
          letter-spacing:.18em;text-transform:uppercase;
          color:rgba(255,250,245,.5);text-decoration:none;
          display:inline-flex;align-items:center;gap:8px;
          border-bottom:1px solid rgba(255,250,245,.2);padding-bottom:2px;
          transition:color .3s,border-color .3s,gap .3s;
        }
        .hero-btn-g:hover{color:#fffaf5;border-color:#c97b4b;gap:14px;}

        .hero-stats{
          display:flex;gap:40px;margin-top:56px;padding-top:40px;
          border-top:1px solid rgba(255,250,245,.07);
          opacity:0;transform:translateY(20px);
          transition:opacity .8s ease .8s,transform .8s ease .8s;
        }
        .hero-stats.vis{opacity:1;transform:translateY(0);}
        .hero-stat-num{font-family:'Cormorant Garamond',Georgia,serif;font-size:2.4rem;font-weight:300;color:#c97b4b;line-height:1;}
        .hero-stat-label{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,250,245,.3);margin-top:6px;}

        .hero-card{
          background:rgba(255,250,245,.03);
          border:1px solid rgba(255,250,245,.08);
          padding:36px;border-radius:2px;width:100%;
          backdrop-filter:blur(16px);
          position:relative;overflow:hidden;
          opacity:0;transform:translateX(30px);
          transition:opacity .9s ease .4s,transform .9s ease .4s;
        }
        .hero-card.vis{opacity:1;transform:translateX(0);}
        .hero-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,123,75,.5),transparent);
        }
        .hero-card-tag{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;
          letter-spacing:.25em;text-transform:uppercase;color:#c97b4b;
          margin-bottom:24px;display:flex;align-items:center;gap:10px;
        }
        .hero-card-tag::after{content:'';flex:1;height:1px;background:rgba(201,123,75,.2);}
        .hero-card-item{
          padding:18px 0;border-bottom:1px solid rgba(255,250,245,.06);
          display:flex;justify-content:space-between;align-items:center;gap:12px;
          transition:background .2s;
        }
        .hero-card-item:last-child{border-bottom:none;}
        .hero-card-item:hover{background:rgba(201,123,75,.04);margin:0 -12px;padding:18px 12px;}
        .hero-card-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.05rem;color:#fffaf5;font-weight:400;}
        .hero-card-desc{font-family:'Cormorant Garamond',Georgia,serif;font-size:.82rem;color:rgba(255,250,245,.3);margin-top:2px;}
        .hero-card-price{font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;color:#c97b4b;white-space:nowrap;font-style:italic;}

        .hero-card-bottom{
          margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,250,245,.06);
          display:flex;justify-content:space-between;align-items:center;
        }
        .hero-card-bottom-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.12em;color:rgba(255,250,245,.2);}
        .hero-card-dot{width:6px;height:6px;border-radius:50%;background:#c97b4b;box-shadow:0 0 12px #c97b4b;animation:pulse 2s ease-in-out infinite;}
        @keyframes pulse{0%,100%{box-shadow:0 0 6px #c97b4b}50%{box-shadow:0 0 18px #c97b4b,0 0 32px rgba(201,123,75,.4)}}

        .hero-scroll{position:absolute;bottom:36px;left:56px;display:flex;align-items:center;gap:16px;z-index:2;}
        .hero-scroll-line{width:60px;height:1px;background:linear-gradient(90deg,rgba(201,123,75,.5),transparent);}
        .hero-scroll-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,250,245,.25);}

        @media(max-width:900px){
          .hero-content{grid-template-columns:1fr;gap:56px;padding:100px 24px 64px;}
          .hero-card{display:none;}
          .hero-stats{gap:28px;}
          .hero-scroll{left:24px;}
        }
      `}</style>

      <section className="hero" id="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-glow1" /><div className="hero-glow2" />
        <div className="hero-lines">
          {[20,40,60,80].map(p => <div key={p} className="hero-line hero-line-v" style={{left:`${p}%`}} />)}
          {[30,60].map(p => <div key={p} className="hero-line hero-line-h" style={{top:`${p}%`}} />)}
        </div>

        <div className="hero-content">
          <div>
            <div className={`hero-eyebrow ${loaded ? "vis" : ""}`}>
              <div className="hero-eye-line" />
              <span className="hero-eye-text">Seoul · Est. 2019</span>
              <div className="hero-eye-dot" />
            </div>
            <h1 className={`hero-title ${loaded ? "vis" : ""}`}>
              Moonlight<em>Café</em>
              <span className="hero-title-kr">달이 빛나는 곳에서</span>
            </h1>
            <p className={`hero-desc ${loaded ? "vis" : ""}`}>
              Where Korean traditions bloom into artisan coffee culture.
              Each cup is a quiet ceremony — brewed with intention, served with grace.
            </p>
            <div className={`hero-actions ${loaded ? "vis" : ""}`}>
              <a href="#menu" className="hero-btn-p">Explore the Menu</a>
              <a href="#about" className="hero-btn-g">Our Story →</a>
            </div>
            <div className={`hero-stats ${loaded ? "vis" : ""}`}>
              {[["5+","Years"],["40+","Menu Items"],["100%","Organic"]].map(([n,l]) => (
                <div key={l}>
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`hero-card ${loaded ? "vis" : ""}`}>
            <div className="hero-card-tag">Today's Specials</div>
            {[
              { name: "Dalgona Latte", desc: "Whipped coffee cream", price: "₩6,500" },
              { name: "Matcha Bingsu", desc: "Shaved ice, red bean", price: "₩9,500" },
              { name: "Sikhye Float", desc: "Sweet rice punch", price: "₩7,000" },
              { name: "Hojicha Affogato", desc: "Roasted green tea", price: "₩8,000" },
            ].map(item => (
              <div className="hero-card-item" key={item.name}>
                <div>
                  <div className="hero-card-name">{item.name}</div>
                  <div className="hero-card-desc">{item.desc}</div>
                </div>
                <div className="hero-card-price">{item.price}</div>
              </div>
            ))}
            <div className="hero-card-bottom">
              <span className="hero-card-bottom-txt">NOW SERVING</span>
              <div className="hero-card-dot" />
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-txt">Scroll to explore</span>
        </div>
      </section>
    </>
  );
}