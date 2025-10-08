import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Zap, Users, Shield, Quote, Star, ArrowRight, CheckCircle, TrendingUp, Clock, Globe } from 'lucide-react';
import Modal from '../components/Modal';
import Logo from '../components/Logo';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "ProdDash has transformed how our team manages projects. The analytics are incredibly insightful and have helped us increase productivity by 40%.",
      avatar: "AJ",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Marketing Director",
      company: "GrowthInc",
      content: "The automation features save us hours each week. A game-changer for our workflow and team collaboration.",
      avatar: "SW",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "CTO",
      company: "InnovateX",
      content: "Security and reliability were our top priorities. ProdDash exceeded our expectations with enterprise-grade features.",
      avatar: "MC",
      rating: 5
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track your productivity with detailed insights and comprehensive reports that help you make data-driven decisions. Save hours on manual reporting.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Task Automation",
      description: "Automate repetitive tasks and focus on high-value work with our intelligent workflow automation. Boost efficiency by 40%.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members in real-time with advanced collaboration tools. Streamline communication.",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and encryption, ensuring complete privacy and uptime.",
      color: "text-error"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Navigation Header */}
      <header className="relative z-20 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                ProdDash
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
              <ul className="flex items-center space-x-8">
                <li>
                  <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Start Free Trial
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-12 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up leading-tight">
            Manage Your Projects, <br />
            <span className="text-primary">Not Just Your Tasks</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Bring your team together to build better products. From planning to execution, ProdDash provides the tools you need to ship on time.
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/register"
              className="group bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg flex items-center justify-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            ProdDash is designed to be powerful yet simple. Get the features you need to ship better products, faster.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left border border-gray-200 dark:border-gray-700 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-primary/10 p-3 rounded-lg w-fit mb-5`}>
                <feature.icon className={`w-8 h-8 text-primary`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Loved by Teams Worldwide
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              See how ProdDash is making an impact at leading companies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pricing for Every Team
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Start free, then scale as you grow. No hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Starter</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">For individuals and small teams.</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">$0</span>
              <span className="text-lg text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                10 Projects
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Basic Analytics
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Community Support
              </li>
            </ul>
            <Link
              to="/register"
              className="block w-full bg-gray-100 dark:bg-gray-700 text-center text-gray-800 dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Start for Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-primary text-white p-8 rounded-2xl shadow-2xl border-4 border-blue-400 animate-slide-up relative" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-4 -mt-4">
              <div className="bg-blue-400 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-blue-100 mb-6">For growing teams and businesses.</p>
            <div className="mb-6">
              <span className="text-5xl font-bold">$12</span>
              <span className="text-lg text-blue-100">/user/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-300 mr-3" />
                Unlimited Projects
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-300 mr-3" />
                Advanced Analytics
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-300 mr-3" />
                Priority Support
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-300 mr-3" />
                Integrations
              </li>
            </ul>
            <Link
              to="/register"
              className="block w-full bg-white text-primary text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Started with Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">For large organizations.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">Contact Us</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Everything in Pro
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                SAML Single Sign-On
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Dedicated Support
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Custom Security
              </li>
            </ul>
            <Link
              to="/contact"
              className="block w-full bg-gray-800 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gray-50 dark:bg-gray-900 py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Join thousands of teams who are shipping better products, faster.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/register"
              className="group bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg inline-flex items-center justify-center"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <Logo className="h-8 w-auto" />
              <p className="text-gray-600 dark:text-gray-400">&copy; 2024 ProdDash. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.07-4.85.149-6.851 1.699-6.919 6.92-.058 1.265-.07 1.644-.07 4.849 0 3.205.013 3.583.07 4.849.149 4.227 1.664 6.771 6.919 6.919 1.266.057 1.645.069 4.849.069z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;