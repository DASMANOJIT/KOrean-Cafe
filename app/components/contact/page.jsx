"use client";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  const infos = [
    { icon: "📍", label: "Address", value: "23 Bukchon-ro\nJongno-gu, Seoul" },
    { icon: "🕐", label: "Hours", value: "Mon–Fri  8am – 9pm\nSat–Sun  9am – 10pm" },
    { icon: "📞", label: "Phone", value: "+82 2-123-4567" },
    { icon: "✉️", label: "Email", value: "hello@dalbit.cafe" },
  ];

  return (
    <>
      <style>{`
        .ct{background:#0a0502;padding:140px 56px;position:relative;overflow:hidden;}
        .ct-bg1{position:absolute;top:0;right:0;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(201,123,75,.07) 0%,transparent 65%);pointer-events:none;}
        .ct-bg2{position:absolute;bottom:0;left:0;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(201,123,75,.04) 0%,transparent 65%);pointer-events:none;}
        .ct-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:100px;align-items:start;position:relative;}

        .ct-left{opacity:0;transform:translateX(-30px);transition:opacity 1s ease,transform 1s ease;}
        .ct-left.vis{opacity:1;transform:translateX(0);}
        .ct-eye{display:flex;align-items:center;gap:12px;margin-bottom:24px;}
        .ct-eye-line{width:36px;height:1px;background:linear-gradient(90deg,#c97b4b,transparent);}
        .ct-eye-txt{font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:#c97b4b;}
        .ct-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.8rem,4.5vw,4rem);font-weight:300;color:#fffaf5;margin:0 0 24px;letter-spacing:-.01em;}
        .ct-title em{font-style:italic;color:#c97b4b;}
        .ct-desc{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;line-height:1.9;color:rgba(255,250,245,.45);font-weight:300;margin-bottom:48px;}

        .ct-infos{display:flex;flex-direction:column;gap:28px;}
        .ct-info{display:flex;gap:16px;align-items:flex-start;}
        .ct-info-icon{width:40px;height:40px;border:1px solid rgba(201,123,75,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.9rem;transition:border-color .3s,background .3s;}
        .ct-info:hover .ct-info-icon{border-color:#c97b4b;background:rgba(201,123,75,.08);}
        .ct-info-label{font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:#c97b4b;margin-bottom:5px;}
        .ct-info-val{font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;color:rgba(255,250,245,.6);font-weight:300;line-height:1.5;white-space:pre-line;}

        .ct-map{margin-top:48px;height:160px;background:rgba(255,250,245,.03);border:1px solid rgba(255,250,245,.07);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
        .ct-map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,123,75,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(201,123,75,.06) 1px,transparent 1px);background-size:24px 24px;}
        .ct-map-dot{width:10px;height:10px;border-radius:50%;background:#c97b4b;box-shadow:0 0 20px #c97b4b;position:relative;z-index:1;}
        .ct-map-ring{position:absolute;width:60px;height:60px;border-radius:50%;border:1px solid rgba(201,123,75,.3);animation:mapRing 2s ease-out infinite;}
        .ct-map-ring2{animation-delay:.6s;}
        @keyframes mapRing{0%{opacity:.8;transform:scale(.3)}100%{opacity:0;transform:scale(1)}}
        .ct-map-label{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-family:'Noto Serif KR',Georgia,serif;font-size:.6rem;letter-spacing:.15em;color:rgba(255,250,245,.2);}

        .ct-right{opacity:0;transform:translateX(30px);transition:opacity 1s ease .2s,transform 1s ease .2s;}
        .ct-right.vis{opacity:1;transform:translateX(0);}
        .ct-form{display:flex;flex-direction:column;gap:0;}
        .ct-field{position:relative;margin-bottom:24px;}
        .ct-label{
          display:block;font-family:'Noto Serif KR',Georgia,serif;
          font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;
          margin-bottom:8px;transition:color .3s;
        }
        .ct-label.idle{color:rgba(255,250,245,.25);}
        .ct-label.focus{color:#c97b4b;}
        .ct-label.filled{color:rgba(255,250,245,.4);}
        .ct-input,.ct-textarea{
          width:100%;background:rgba(255,250,245,.04);
          border:none;border-bottom:1px solid rgba(255,250,245,.1);
          color:#fffaf5;padding:12px 4px;
          font-family:'Cormorant Garamond',Georgia,serif;font-size:1.05rem;
          outline:none;resize:none;transition:border-color .3s,background .3s;
          box-sizing:border-box;
        }
        .ct-input:focus,.ct-textarea:focus{border-color:#c97b4b;background:rgba(201,123,75,.04);}
        .ct-input::placeholder,.ct-textarea::placeholder{color:rgba(255,250,245,.2);}
        .ct-textarea{min-height:100px;}
        .ct-field-bar{
          position:absolute;bottom:0;left:0;width:0;height:1px;
          background:linear-gradient(90deg,#c97b4b,#e8a87c);
          transition:width .4s ease;
        }
        .ct-input:focus~.ct-field-bar,.ct-textarea:focus~.ct-field-bar{width:100%;}

        .ct-submit{
          font-family:'Noto Serif KR',Georgia,serif;font-size:.72rem;
          letter-spacing:.18em;text-transform:uppercase;
          color:#0a0502;background:linear-gradient(135deg,#c97b4b,#e8a87c);
          padding:14px 40px;border:none;cursor:pointer;
          align-self:flex-start;margin-top:8px;position:relative;overflow:hidden;
          clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          box-shadow:0 4px 28px rgba(201,123,75,.3);
          transition:transform .25s,box-shadow .3s;
        }
        .ct-submit::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transform:translateX(-100%);transition:transform .5s;}
        .ct-submit:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(201,123,75,.5);}
        .ct-submit:hover::before{transform:translateX(100%);}

        .ct-success{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:16px;padding:60px 0;text-align:center;
        }
        .ct-success-icon{font-size:2.5rem;animation:successPop .5s cubic-bezier(.34,1.56,.64,1);}
        @keyframes successPop{0%{transform:scale(0)}100%{transform:scale(1)}}
        .ct-success-txt{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-style:italic;color:#c97b4b;}
        .ct-success-sub{font-family:'Noto Serif KR',Georgia,serif;font-size:.7rem;letter-spacing:.15em;color:rgba(255,250,245,.3);}

        @media(max-width:900px){
          .ct{padding:80px 24px;}
          .ct-inner{grid-template-columns:1fr;gap:56px;}
        }
      `}</style>

      <section className="ct" id="contact" ref={ref}>
        <div className="ct-bg1"/><div className="ct-bg2"/>
        <div className="ct-inner">
          <div className={`ct-left ${vis ? "vis" : ""}`}>
            <div className="ct-eye"><div className="ct-eye-line"/><span className="ct-eye-txt">연락처</span></div>
            <h2 className="ct-title">Come<br/><em>Find Us</em></h2>
            <p className="ct-desc">
              Whether it's a reservation, a private event, or simply to say 여보세요 — 
              we'd love to hear from you.
            </p>
            <div className="ct-infos">
              {infos.map(info => (
                <div className="ct-info" key={info.label}>
                  <div className="ct-info-icon">{info.icon}</div>
                  <div>
                    <div className="ct-info-label">{info.label}</div>
                    <div className="ct-info-val">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ct-map">
              <div className="ct-map-grid"/>
              <div className="ct-map-ring"/>
              <div className="ct-map-ring ct-map-ring2"/>
              <div className="ct-map-dot"/>
              <div className="ct-map-label">23 BUKCHON-RO · SEOUL</div>
            </div>
          </div>

          <div className={`ct-right ${vis ? "vis" : ""}`}>
            {sent ? (
              <div className="ct-success">
                <span className="ct-success-icon">🌸</span>
                <p className="ct-success-txt">감사합니다 — We'll be in touch soon.</p>
                <p className="ct-success-sub">Thank you for reaching out</p>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit}>
                {[
                  { id: "name", label: "Your Name", type: "input", placeholder: "Hong Gildong" },
                  { id: "email", label: "Email Address", type: "input", placeholder: "you@example.com" },
                  { id: "message", label: "Message", type: "textarea", placeholder: "Tell us anything..." },
                ].map(field => (
                  <div className="ct-field" key={field.id}>
                    <label className={`ct-label ${focused === field.id ? "focus" : form[field.id] ? "filled" : "idle"}`}>
                      {field.label}
                    </label>
                    {field.type === "input" ? (
                      <input
                        className="ct-input" type={field.id === "email" ? "email" : "text"}
                        value={form[field.id]} placeholder={field.placeholder}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        onChange={e => setForm({...form, [field.id]: e.target.value})}
                        required
                      />
                    ) : (
                      <textarea
                        className="ct-textarea" value={form[field.id]} placeholder={field.placeholder}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        onChange={e => setForm({...form, [field.id]: e.target.value})}
                        required
                      />
                    )}
                    <div className="ct-field-bar"/>
                  </div>
                ))}
                <button type="submit" className="ct-submit">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}