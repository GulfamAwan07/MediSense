import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode
    ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200"
    : "bg-gray-50 text-gray-800";

  const card = darkMode
    ? "bg-gray-800 border border-gray-700 hover:border-blue-400"
    : "bg-white border border-gray-200 hover:border-blue-400";

  return (
    <div className={`${theme} transition-colors duration-700 min-h-screen`}>
      <nav
        className={`fixed w-full z-50 ${
          darkMode ? "bg-gray-900" : "bg-white"
        } shadow`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/public/images/logo.jpg" className="w-9 h-9 rounded-lg" />
            <h1 className="text-2xl font-bold text-blue-500">MediSense</h1>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <a href="#features" className="hover:text-blue-400">
              Features
            </a>
            <a href="#workflow" className="hover:text-blue-400">
              Workflow
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:scale-110 transition"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
            <Link to="/signin" className="px-4 py-2 border rounded-lg">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Get Started
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            ☰
          </button>
        </div>

        {menuOpen && (
          <div
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } md:hidden px-6 pb-4`}
          >
            <a href="#features" className="block py-2">
              Features
            </a>
            <a href="#workflow" className="block py-2">
              Workflow
            </a>
            <Link to="/signin" className="block py-2">
              Sign In
            </Link>
            <Link to="/signup" className="block py-2">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      <section className="pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Smart ECG Analysis <br />
                <span className="text-blue-400">Powered by AI</span>
              </h2>
              <p className="mt-6 text-lg">
                MediSense converts complex ECG reports into clear summaries,
                graphs, and medical insights for better healthcare decisions.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <img
              src="/public/images/image.png"
              className="w-full max-w-md mx-auto animate-[pulse_4s_ease-in-out_infinite]"
            />
          </FadeIn>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h3 className="text-3xl font-bold mb-4">
              Upload Your Medical Data
            </h3>
            <p className="max-w-2xl mx-auto text-lg mb-12 opacity-80">
              MediSense allows you to upload ECG reports or capture them
              instantly using your device camera for AI-powered analysis.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <FadeIn delay={200}>
              <div
                className={`p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200 shadow-lg"
                }`}
              >
                <div className="text-5xl mb-4">📄</div>
                <h4 className="text-xl font-semibold mb-3">
                  Upload ECG Report (PDF)
                </h4>
                <p className="mb-6 opacity-80">
                  Upload your ECG report in PDF format for automated
                  interpretation and summary generation.
                </p>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                  Upload PDF
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div
                className={`p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200 shadow-lg"
                }`}
              >
                <div className="text-5xl mb-4">📷</div>
                <h4 className="text-xl font-semibold mb-3">
                  Scan ECG Using Camera
                </h4>
                <p className="mb-6 opacity-80">
                  Capture ECG images directly using your camera and let
                  MediSense analyze them instantly.
                </p>
                <button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition">
                  Open Camera
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Who MediSense Is For</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {["Patients", "Doctors", "Medical Students", "Clinics"].map(
              (role, i) => (
                <FadeIn key={i} delay={i * 150}>
                  <div className={`p-6 rounded-xl ${card} transition-all`}>
                    <h4 className="font-semibold text-lg text-blue-400">
                      {role}
                    </h4>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Core Capabilities</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "AI ECG Interpretation",
              "Medical Report Summaries",
              "Graph-Based Health Trends",
              "Diet & Lifestyle Suggestions",
              "Doctor Recommendations",
              "Secure Health Records",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div
                  className={`p-8 rounded-2xl ${card} transition-all hover:-translate-y-1`}
                >
                  <h4 className="font-semibold text-blue-400">{item}</h4>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 dark:bg-gray-800  text-center">
          <h3 className="text-3xl font-bold mb-6">AI Intelligence Engine</h3>
          <p className="mb-10">
            MediSense uses AI models to analyze ECG signals, detect anomalies,
            generate insights, and suggest next steps.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {["Signal Analysis", "Visual Graphs", "Health Insights"].map(
              (ai, i) => (
                <FadeIn key={i} delay={i * 200}>
                  <div className={`p-6 rounded-xl ${card}`}>
                    <h4 className="text-blue-400 font-semibold">{ai}</h4>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Workflow</h3>
          <div className="grid md:grid-cols-3 gap-8 font-semibold">
            {[
              "Upload ECG",
              "AI Analysis",
              "Summary & Graphs",
              "Diet Suggestions",
              "Suggestions",
              "Follow-Up Tracking",
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className={`p-6 rounded-xl ${card}`}>
                  <span className="text-blue-400 font-bold">{i + 1}</span>
                  <p className="mt-2">{step}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <footer className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} py-16`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xl font-bold">MediSense</h4>
            <p className="text-sm mt-2">
              AI-powered ECG analysis platform for smarter healthcare decisions.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Navigation</h5>
            <ul className="space-y-2 text-sm ">
              <li className="hover:text-blue-600">
                <a href="#features">Features</a>
              </li>
              <li className="hover:text-blue-600">
                <a href="#workflow">Workflow</a>
              </li>
              <li className="hover:text-blue-600">
                <Link to="/signup">Get Started</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Contact</h5>
            <p className="text-sm">gulfamawan0077@gmail.com</p>
            <p className="text-sm">+92 303 6569950</p>
          </div>
        </div>
        <div className="text-center text-sm mt-12 opacity-70">
          © {new Date().getFullYear()} MediSense. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
