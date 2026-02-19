import { Calculator } from "./Calculator";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__logo">
            <svg
              viewBox="0 0 120 40"
              className="app__logo-svg"
              aria-label="Relay Graduate School of Education"
            >
              <text
                x="0"
                y="28"
                fontFamily="'Open Sans', sans-serif"
                fontWeight="800"
                fontSize="26"
                fill="#499db6"
              >
                RELAY
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
