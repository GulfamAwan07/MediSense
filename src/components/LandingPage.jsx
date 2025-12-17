import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const workflowSteps = [
    { step: "1", title: "Upload ECG", desc: "Patients or doctors upload ECG and medical data securely." },
    { step: "2", title: "AI Analysis", desc: "Our AI engine interprets the data and highlights key insights." },
    { step: "3", title: "View Summary", desc: "Receive a clear, easy-to-understand medical summary." },
    { step: "4", title: "Graphs & Trends", desc: "Visual representation of your health metrics over time." },
    { step: "5", title: "Diet Suggestions", desc: "Personalized diet recommendations based on analysis." },
    { step: "6", title: "Doctor Recommendations", desc: "Receive expert suggestions for next steps in care." },
  ];

  const themeClasses = darkMode
    ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200"
    : "bg-gray-50 text-gray-800";

  const cardTheme = darkMode
    ? "bg-gray-800 text-gray-200 border border-gray-700 shadow-lg hover:shadow-2xl"
    : "bg-gray-50 text-gray-800 border border-gray-200 shadow-md hover:shadow-lg";

  const navTheme = darkMode
    ? "bg-gray-900 text-gray-200 shadow-lg"
    : "bg-white text-gray-800 shadow-md";

  const footerTheme = darkMode
    ? "bg-gray-900 text-gray-200 border-t border-gray-700"
    : "bg-gray-100 text-gray-700 border-t border-gray-300";

  return (
    <div className={`transition-colors duration-700 ${themeClasses} min-h-screen overflow-x-hidden`}>

      <nav className={`${navTheme} fixed w-full z-50 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-lg" src="/public/images/logo.jpg" />
            <h1 className="text-2xl font-bold text-blue-500">MediSense</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#workflow" className="hover:text-blue-400 transition">Workflow</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition transform hover:scale-110 ${
                darkMode ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-800"
              }`}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 5.36l-.71-.71M6.36 6.36l-.71-.71m12.02 12.02l-.71-.71M6.36 17.64l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                </svg>
              )}
            </button>
            <Link to="/signin" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Get Started</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`${navTheme} shadow-lg transition-colors duration-500`}>
            <a href="#features" className="block px-6 py-3 border-b hover:bg-gray-700/30 transition">Features</a>
            <a href="#workflow" className="block px-6 py-3 border-b hover:bg-gray-700/30 transition">Workflow</a>
            <Link to="/signin" className="block px-6 py-3 border-b hover:bg-gray-700/30 transition">Sign In</Link>
            <Link to="/signup" className="block px-6 py-3 hover:bg-gray-700/30 transition">Get Started</Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full text-left px-6 py-3 hover:bg-gray-700/30 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </nav>

      <section className="pt-36 pb-28 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Intelligent Healthcare <br />
                <span className="text-blue-400">Insights with AI</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed">
                MediSense empowers patients and clinicians by transforming ECG reports and medical data into clear, actionable insights using AI.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <Link to="/signup" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:-translate-y-1">Start Free</Link>
                <a href="#features" className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">Explore Features</a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex justify-center">
              <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl transition-colors duration-500 ${darkMode ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700" : "bg-blue-100"}`}>
                <img className="w-full object-contain animate-pulse" src="/public/images/image.png" alt="MediSense Preview" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="features" className="py-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold">Core Capabilities</h3>
          <p className="mt-3 max-w-2xl mx-auto">Simplifying medical understanding while maintaining clinical accuracy.</p>

          <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "ECG Intelligence", text: "AI analysis detects abnormalities in ECG reports quickly and accurately." },
              { title: "Patient-Friendly Summaries", text: "Transforms complex medical terminology into clear explanations." },
              { title: "Data Security", text: "Built with modern security standards to protect sensitive medical data." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 200}>
                <div className={`p-8 rounded-2xl transition-all transform hover:-translate-y-1 ${cardTheme}`}>
                  <h4 className="text-xl font-semibold text-blue-400">{item.title}</h4>
                  <p className="mt-3 leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold">How MediSense Works</h3>
          <p className="mt-3 max-w-2xl mx-auto">Step-by-step workflow for personalized healthcare insights.</p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {workflowSteps.map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className={`p-8 rounded-2xl transition-all transform hover:-translate-y-1 ${cardTheme}`}>
                  <div className="text-blue-400 text-2xl font-bold mb-3">{item.step}</div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold">Ready to experience smarter healthcare?</h3>
          <p className="mt-4 text-blue-100 text-lg">Join MediSense and take control of your medical understanding.</p>
          <Link to="/signup" className="inline-block mt-8 px-10 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1">
            Get Started
          </Link>
        </div>
      </section>

      <footer className={`${footerTheme} py-16 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xl font-bold mb-3">MediSense</h4>
            <p className="text-sm leading-relaxed">AI-powered medical insight platform designed for clarity, accuracy, and trust.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              <li><a href="#workflow" className="hover:text-blue-400 transition">Workflow</a></li>
              <li><Link to="/signup" className="hover:text-blue-400 transition">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Contact</h5>
            <p className="text-sm">gulfamawan0077@gmail.com</p>
            <p className="text-sm mt-1">+92 3036569950</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          © {new Date().getFullYear()} MediSense. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
