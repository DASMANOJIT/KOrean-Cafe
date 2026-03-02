export default function About() {
  return (
    <>
      <style>{`
        .about {
          background: #fffaf5; padding: 120px 48px;
          position: relative; overflow: hidden;
        }
        .about-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center;
        }
        .about-visual { position: relative; }
        .about-img-wrap {
          width: 100%; aspect-ratio: 3/4; max-width: 420px;
          background: #e8d5c0; position: relative; overflow: hidden;
        }
        .about-img-fill {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #c97b4b22 0%, #3a1c0e33 100%);
          display: flex; align-items: center; justify-content: center;
        }
        .about-img-icon { font-size: 5rem; opacity: 0.3; }
        .about-accent-box {
          position: absolute; bottom: -24px; right: -24px;
          background: #3a1c0e; color: #fffaf5; padding: 32px;
          width: 180px;
        }
        .about-accent-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem; font-weight: 300; line-height: 1; color: #c97b4b;
        }
        .about-accent-label {
          font-family: 'Noto Serif KR', Georgia, serif;
          font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,250,245,0.6); margin-top: 8px;
        }
        .about-text { }
        .about-eyebrow {
          font-family: 'Noto Serif KR', Georgia, serif;
          font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: #c97b4b; margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .about-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: #c97b4b; }
        .about-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 300; line-height: 1.1;
          color: #3a1c0e; margin: 0 0 32px;
        }
        .about-title em { font-style: italic; color: #c97b4b; }
        .about-body {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem; line-height: 1.9; color: #5c3d2a; font-weight: 300;
          margin-bottom: 20px;
        }
        .about-divider { width: 48px; height: 1px; background: #c97b4b; margin: 32px 0; }
        .about-values { display: flex; gap: 40px; flex-wrap: wrap; }
        .about-value { }
        .about-value-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem; font-weight: 300; color: #c97b4b; line-height: 1;
        }
        .about-value-text {
          font-family: 'Noto Serif KR', Georgia, serif;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #3a1c0e; margin-top: 6px;
        }
        @media (max-width: 768px) {
          .about { padding: 80px 24px; }
          .about-inner { grid-template-columns: 1fr; gap: 48px; }
          .about-accent-box { right: 0; }
        }
      `}</style>
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-visual">
            <div className="about-img-wrap">
              <div className="about-img-fill">
                <span className="about-img-icon">☕</span>
              </div>
            </div>
            <div className="about-accent-box">
              <div className="about-accent-num">5+</div>
              <div className="about-accent-label">Years of Craft</div>
            </div>
          </div>
          <div className="about-text">
            <div className="about-eyebrow">우리의 이야기</div>
            <h2 className="about-title">Brewed with<br/><em>Tradition &</em><br/>Intention</h2>
            <p className="about-body">
              달빛 Café was born from a simple idea: to bring the warmth of Korean tea culture 
              together with the precision of specialty coffee. Nestled in the heart of the city, 
              we are a place to slow down, breathe, and truly taste.
            </p>
            <p className="about-body">
              Our recipes draw from centuries of Korean culinary heritage — rice wines, 
              fermented flavors, seasonal botanicals — reimagined for the modern palate.
            </p>
            <div className="about-divider" />
            <div className="about-values">
              {[
                { num: "100%", label: "Organic Beans" },
                { num: "40+", label: "Menu Items" },
                { num: "∞", label: "Good Moments" },
              ].map(v => (
                <div className="about-value" key={v.label}>
                  <div className="about-value-num">{v.num}</div>
                  <div className="about-value-text">{v.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
