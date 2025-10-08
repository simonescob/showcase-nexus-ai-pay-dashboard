import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Zap, Users, Shield, Quote, Star, ArrowRight, CheckCircle, TrendingUp, Clock, Globe } from 'lucide-react';

const Home = () => {
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
      description: "Track your productivity with detailed insights and comprehensive reports that help you make data-driven decisions.",
      gradient: "from-primary to-accent",
      hoverColor: "blue"
    },
    {
      icon: Zap,
      title: "Task Automation",
      description: "Automate repetitive tasks and focus on what truly matters with our intelligent workflow automation.",
      gradient: "from-vibrant to-yellow-400",
      hoverColor: "yellow"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members in real-time with advanced collaboration tools.",
      gradient: "from-success to-green-400",
      hoverColor: "green"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and encryption, ensuring complete privacy.",
      gradient: "from-error to-red-400",
      hoverColor: "red"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Clock },
    { number: "50+", label: "Countries", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent/20 to-vibrant/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-vibrant/10 to-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-full mb-8 animate-slide-up border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse"></div>
            <span className="text-primary font-semibold">✨ New Features Available - Try Pro Free for 14 Days</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary via-accent to-vibrant dark:from-white dark:via-primary dark:via-accent dark:to-vibrant bg-clip-text text-transparent mb-8 animate-slide-up leading-tight">
            ProdDash
            <span className="block text-5xl md:text-6xl mt-2">Showcase</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Elevate your productivity with smart insights, seamless task management, and powerful automation tools designed for modern teams.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/register"
              className="group bg-gradient-to-r from-primary via-accent to-primary text-white px-10 py-5 rounded-2xl font-semibold text-xl hover:scale-105 hover:shadow-glow-lg transition-all duration-500 shadow-xl relative overflow-hidden min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-vibrant to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              to="/login"
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-primary dark:text-white px-10 py-5 rounded-2xl font-semibold text-xl border-2 border-primary hover:bg-primary hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-500 shadow-lg relative overflow-hidden min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center">
                Sign In
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary to-accent dark:from-white dark:via-primary dark:to-accent bg-clip-text text-transparent mb-8">
            Powerful Features
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Everything you need to boost productivity and streamline your workflow with cutting-edge technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-glow hover:scale-105 transition-all duration-500 text-center border border-gray-100/50 dark:border-gray-700/50 animate-slide-up hover:bg-gradient-to-br hover:from-white/50 hover:to-${feature.hoverColor}-50/50 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:animate-float shadow-lg`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 bg-gradient-to-r from-white/50 via-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:via-gray-900/50 dark:to-purple-900/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary to-accent dark:from-white dark:via-primary dark:to-accent bg-clip-text text-transparent mb-8">
              What Our Users Say
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied users who have transformed their productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-glow hover:scale-105 transition-all duration-500 border border-gray-100/50 dark:border-gray-700/50 animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    <Quote className="inline w-5 h-5 mr-2 text-primary" />
                    {testimonial.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary to-accent dark:from-white dark:via-primary dark:to-accent bg-clip-text text-transparent mb-8">
            Choose Your Plan
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Flexible pricing options designed to grow with your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-glow hover:scale-105 transition-all duration-500 border border-gray-100/50 dark:border-gray-700/50 animate-slide-in-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100/20 to-gray-200/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Starter
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Free</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Perfect for getting started</p>
              <div className="mb-8">
                <span className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$0</span>
                <span className="text-xl text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-10">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  50 tasks per month
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Basic analytics dashboard
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Community support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Mobile app access
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-md"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="group bg-gradient-to-br from-primary via-accent to-primary p-10 rounded-3xl shadow-2xl hover:shadow-glow-lg hover:scale-110 transition-all duration-500 text-white relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 right-0 bg-vibrant text-black px-6 py-3 rounded-bl-3xl font-bold text-sm animate-bounce-gentle shadow-lg">
              Most Popular
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vibrant via-yellow-400 to-vibrant"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4 mt-8">Pro</h3>
              <p className="text-white/90 mb-8 text-lg">For power users and growing teams</p>
              <div className="mb-8">
                <span className="text-6xl font-bold">$9</span>
                <span className="text-xl">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-10">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  Unlimited tasks and projects
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  Advanced analytics & insights
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  Priority email support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  Custom reports & exports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  Task automation workflows
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-white text-primary py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Pro Trial
              </Link>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-glow hover:scale-105 transition-all duration-500 border border-gray-100/50 dark:border-gray-700/50 animate-slide-in-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-vibrant/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent to-vibrant text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              For Teams
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Enterprise</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">For large teams and organizations</p>
              <div className="mb-8">
                <span className="text-6xl font-bold bg-gradient-to-r from-accent to-vibrant bg-clip-text text-transparent">$29</span>
                <span className="text-xl text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-10">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Advanced team collaboration
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Full API access
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Dedicated account manager
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Custom integrations
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-gradient-to-r from-accent to-vibrant text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-white/80 via-blue-50/80 to-purple-50/80 dark:from-gray-800/80 dark:via-gray-700/80 dark:to-purple-900/80 backdrop-blur-xl p-12 md:p-16 rounded-3xl shadow-2xl border border-gray-100/50 dark:border-gray-700/50 animate-slide-up relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-vibrant/5 animate-pulse-slow"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary to-accent dark:from-white dark:via-primary dark:to-accent bg-clip-text text-transparent mb-8">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who have revolutionized their workflow with ProdDash. Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-primary via-accent to-primary text-white px-10 py-5 rounded-2xl font-semibold text-xl hover:scale-105 hover:shadow-glow-lg transition-all duration-500 shadow-xl relative overflow-hidden min-w-[250px]"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-vibrant to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required • 14-day free trial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-vibrant/5 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-2 animate-slide-up">
              <h3 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ProdDash
              </h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Elevate your productivity with smart insights and seamless task management. Built for modern teams who demand excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="group w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 shadow-lg">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="group w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110 shadow-lg">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.07-4.85.149-6.851 1.699-6.919 6.92-.058 1.265-.07 1.644-.07 4.849 0 3.205.013 3.583.07 4.849.149 4.227 1.664 6.771 6.919 6.919 1.266.057 1.645.069 4.849.069z"/>
                  </svg>
                </a>
                <a href="#" className="group w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-vibrant transition-all duration-300 hover:scale-110 shadow-lg">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h4 className="font-semibold text-lg mb-6 text-white">Product</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 transform duration-300 block">Features</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 transform duration-300 block">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 transform duration-300 block">API Documentation</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 transform duration-300 block">Integrations</a></li>
                </ul>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 transform duration-300 block">About Us</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 transform duration-300 block">Blog</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 transform duration-300 block">Careers</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 transform duration-300 block">Press Kit</a></li>
                </ul>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h4 className="font-semibold text-lg mb-6 text-white">Support</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-vibrant transition-colors hover:translate-x-1 transform duration-300 block">Help Center</a></li>
                  <li><a href="#" className="hover:text-vibrant transition-colors hover:translate-x-1 transform duration-300 block">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-vibrant transition-colors hover:translate-x-1 transform duration-300 block">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-vibrant transition-colors hover:translate-x-1 transform duration-300 block">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800/50 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2024 ProdDash. All rights reserved. Made with ❤️ for productivity enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;