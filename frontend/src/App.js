import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Icon components (using simple SVG icons)
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z" clipRule="evenodd" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const GamepadIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2C6.134 2 3 5.134 3 9c0 1.103.272 2.14.741 3.05L6 17h2.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H7.618l-1.618-3.236C5.692 12.298 5.5 11.672 5.5 11c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5c0 .672-.192 1.298-.5 1.764L12.382 16H11c-.276 0-.5.224-.5.5s.224.5.5.5H14l2.259-4.95C16.728 11.14 17 10.103 17 9c0-3.866-3.134-7-7-7z" />
  </svg>
);

const ServerIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
  </svg>
);

function App() {
  const [features, setFeatures] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [serverStatus, setServerStatus] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresRes, pricingRes, statusRes] = await Promise.all([
          axios.get(`${backendUrl}/api/features`),
          axios.get(`${backendUrl}/api/pricing`),
          axios.get(`${backendUrl}/api/status`)
        ]);
        
        setFeatures(featuresRes.data.features);
        setPricing(pricingRes.data.pricing);
        setServerStatus(statusRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data if API is not available
        setFeatures([
          { id: 1, title: "KV Protection", description: "Advanced console key vault protection", icon: "shield" },
          { id: 2, title: "Real-Time Stealth", description: "Live stealth monitoring and protection", icon: "eye-slash" },
          { id: 3, title: "Bypasses Latest Dash", description: "Works with all current dashboard versions", icon: "check-circle" },
          { id: 4, title: "Compatible with All Consoles", description: "Supports all Xbox 360 console types", icon: "gamepad" },
          { id: 5, title: "High Uptime", description: "99.9% server uptime guarantee", icon: "server" },
          { id: 6, title: "Frequent Updates", description: "Regular updates for latest protections", icon: "refresh" }
        ]);
        
        setPricing([
          { id: 1, name: "Trial", price: 1.99, duration: "3 Days", popular: false, features: ["Basic stealth protection", "Email support", "Standard uptime"] },
          { id: 2, name: "Bronze", price: 3.99, duration: "1 Week", popular: false, features: ["Full stealth protection", "Priority support", "High uptime"] },
          { id: 3, name: "Silver", price: 5.99, duration: "2 Weeks", popular: true, features: ["Full stealth protection", "Priority support", "Premium uptime", "Advanced features"] },
          { id: 4, name: "Gold", price: 9.99, duration: "1 Month", popular: false, features: ["Full stealth protection", "VIP support", "Premium uptime", "All features", "Early access"] },
          { id: 5, name: "Lifetime", price: 19.99, duration: "Forever", popular: false, features: ["Full stealth protection", "VIP support", "Premium uptime", "All features", "Early access", "Lifetime updates"] }
        ]);
      }
    };

    fetchData();
  }, [backendUrl]);

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'shield': return <ShieldIcon />;
      case 'eye-slash': return <EyeSlashIcon />;
      case 'check-circle': return <CheckCircleIcon />;
      case 'gamepad': return <GamepadIcon />;
      case 'server': return <ServerIcon />;
      case 'refresh': return <RefreshIcon />;
      default: return <ShieldIcon />;
    }
  };

  const scrollToPricing = () => {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      {/* Hero Section */}
      <section className="hero-content particles-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-dark-100"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            {/* Logo placeholder */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-3xl font-bold animate-float">
                R
              </div>
            </div>
            
            <h1 className="hero-title mb-6 animate-slide-up">
              RIVAL
            </h1>
            
            <p className="hero-subtitle mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              The Next Best Xbox Live Stealth Solution
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <button 
                onClick={scrollToPricing}
                className="btn-primary hover-scale"
              >
                Join Now
              </button>
              <a href="#features" className="btn-secondary hover-scale">
                Learn More
              </a>
            </div>

            {/* Server Status */}
            {serverStatus && (
              <div className="mt-12 inline-flex items-center gap-2 bg-dark-200/50 border border-primary-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Server Online • {serverStatus.active_users} Active Users</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-dark-100 to-dark-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Premium <span className="text-primary-500">Stealth Features</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Experience unmatched protection with our advanced stealth technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className="feature-card animate-slide-up hover-scale"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="feature-icon icon-float">
                  {getFeatureIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-dark-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-primary-500">Plan</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Flexible pricing options to suit every need
            </p>
          </div>

          <div className="pricing-grid">
            {pricing.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`price-card relative p-8 rounded-2xl bg-dark-200/50 backdrop-blur-sm animate-slide-up ${plan.popular ? 'popular' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="price-value mb-1">${plan.price}</div>
                  <p className="text-dark-600">{plan.duration}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircleIcon />
                      <span className="text-dark-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'} hover-scale`}>
                  Purchase Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-20 bg-dark-200">
        <div className="container mx-auto px-6">
          <div className="discord-section rounded-3xl p-12 text-center backdrop-blur-sm">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
                <DiscordIcon />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our <span className="text-primary-500">Discord</span>
              </h2>
              
              <p className="text-xl text-dark-600 mb-8 leading-relaxed">
                Get instant support, stay updated with server status, and connect with the community. 
                Our Discord is your hub for sales, support, and real-time notifications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://discord.gg/placeholder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary hover-scale inline-flex items-center gap-3"
                >
                  <DiscordIcon />
                  Join Discord
                </a>
                <button className="btn-secondary hover-scale">
                  View Server Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-dark-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              About <span className="text-primary-500">RIVAL</span>
            </h2>
            
            <div className="bg-dark-200/50 border border-dark-300 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-lg text-dark-600 leading-relaxed mb-6">
                RIVAL is crafted by <strong className="text-primary-500">Deviant</strong>, a dedicated developer 
                passionate about providing the best Xbox Live stealth solutions. Starting as a solo project, 
                RIVAL focuses on quality, reliability, and user trust.
              </p>
              
              <p className="text-lg text-dark-600 leading-relaxed">
                Our commitment to excellence means frequent updates, responsive support, and cutting-edge 
                protection methods. As we grow, we're scaling our team while maintaining the personal 
                touch that sets RIVAL apart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-lg font-bold">
                  R
                </div>
                <div>
                  <div className="text-xl font-bold">RIVAL</div>
                  <div className="text-sm text-dark-600">Xbox Live Stealth Solution</div>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-dark-600 mb-2">
                © 2024 RIVAL. All rights reserved.
              </p>
              <p className="text-sm text-dark-500">
                Made by <span className="text-primary-500 font-medium">кяуρтιк</span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-dark-300 mt-8 pt-8 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-600">
              <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Support</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;