import { Calculator } from "./Calculator";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__logo">
            <svg
              viewBox="0 0 260 50"
              className="app__logo-svg"
              aria-label="Relay Graduate School of Education"
            >
              <text
                x="130"
                y="30"
                textAnchor="middle"
                fontFamily="Calibri, 'Helvetica Neue', Helvetica, Arial, sans-serif"
                fontWeight="800"
                fontSize="32"
                letterSpacing="2"
              >
                <tspan fill="#1D3557">RELAY</tspan>
                <tspan fill="#B30838">/</tspan>
                <tspan fill="#6D97C9">GSE</tspan>
              </text>
              <text
                x="130"
                y="46"
                textAnchor="middle"
                fontFamily="Calibri, 'Helvetica Neue', Helvetica, Arial, sans-serif"
                fontWeight="600"
                fontSize="9.5"
                letterSpacing="3"
                fill="#1D3557"
              >
                GRADUATE SCHOOL
                <tspan fontStyle="italic" letterSpacing="1" fontWeight="400"> of </tspan>
                EDUCATION
              </text>
            </svg>
          </div>
          <h1 className="app__title">Cost Calculator</h1>
          <p className="app__subtitle">
            Estimate your tuition and explore financial aid options
          </p>
        </div>
      </header>

      <main className="app__main">
        <Calculator />
      </main>

      <footer className="app__footer">
        <div className="app__footer-inner">
          <p>
            Relay Graduate School of Education &middot; Cost Calculator
          </p>
          <p className="app__footer-note">
            This tool provides estimates only and is not a guarantee of
            financial aid. Contact Relay's financial aid office for
            personalized guidance.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
