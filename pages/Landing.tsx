import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Landing: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light flex flex-col relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="px-4 md:px-10 lg:px-40 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-main">
              <div className="text-primary"><Icon name="school" size={32} /></div>
              <h2 className="text-xl font-bold">CampusPass</h2>
            </div>
            <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
              <div className="flex items-center gap-9">
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
                <a href="#events" className="text-sm font-medium hover:text-primary transition-colors">Events</a>
                <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
              </div>
              <div className="flex gap-3">
                <Link to="/admin" className="text-sm font-medium text-text-secondary hover:text-primary flex items-center">Admin Demo</Link>
                <Link to="/login" className="flex items-center justify-center rounded-lg h-10 px-5 bg-transparent hover:bg-gray-100 text-text-main text-sm font-bold transition-all">
                  Login
                </Link>
                <Link to="/signup" className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/30 transition-all">
                  Sign Up
                </Link>
              </div>
            </div>
            <button
              className="lg:hidden text-text-main p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-text-main">
                <div className="text-primary"><Icon name="school" size={28} /></div>
                <h2 className="text-lg font-bold">CampusPass</h2>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
                <Icon name="close" size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-main hover:text-primary">Home</a>
              <a href="#events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-main hover:text-primary">Events</a>
              <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-main hover:text-primary">Pricing</Link>

              <div className="h-px bg-gray-100 my-2"></div>

              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center rounded-lg h-12 bg-gray-50 hover:bg-gray-100 text-text-main font-bold transition-all">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center rounded-lg h-12 bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 transition-all">
                Sign Up
              </Link>

              <div className="mt-4 text-center">
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-text-secondary hover:text-primary">
                  View Admin Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <header className="relative w-full bg-gradient-to-br from-white via-indigo-50/50 to-purple-100/30">
        <div className="px-4 md:px-10 lg:px-40 py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              <div className="flex flex-col gap-8 flex-1 items-start text-left max-w-2xl">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary w-fit">
                    New Semester Access Open
                  </span>
                  <h1 className="text-text-main text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                    One Pass for All <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">College Events</span>
                  </h1>
                  <h2 className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-lg">
                    The all-in-one subscription for concerts, workshops, and sports. Skip the lines and save money with CampusPass.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                  <Link to="/pricing" className="flex-1 sm:flex-none h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2">
                    <span>Get Membership</span>
                    <Icon name="arrow_forward" size={20} />
                  </Link>
                  <Link to="/student/explore" className="flex-1 sm:flex-none h-12 px-8 bg-white border border-slate-200 text-text-main hover:border-primary/50 text-base font-bold rounded-lg transition-all flex items-center justify-center">
                    Explore Events
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-center bg-cover" style={{ backgroundImage: `url(https://picsum.photos/32/32?random=${i})` }}></div>
                    ))}
                  </div>
                  <p>Trusted by 10,000+ students</p>
                </div>
              </div>
              <div className="flex-1 w-full lg:w-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-full aspect-[4/3] bg-center bg-cover rounded-xl shadow-2xl overflow-hidden" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8Vvj826uYlcHJFr5TuKhxdfA2TJRahfo5Ita2ZmT-zzDOuVszJC5yTtu-WQMpD62_WYq7pXBInjxD-FlZPDj6kxZlmANjp8j-cfzxP9Q7QtMr6aitX0Q_bSplfrTdNcd4fo5CvF9Juqjsl7kB5q4eyZHGTZsek4chzRP7kAUmg0x3LQ24Q8-A6X8J-qJcac2u_s3TrcU5irYPNl0m_digZvW-d22kbkjRqJuEzUKAHHlfKDGYHHlz4TH4fhLk_kM8GlMTvoTDAy-c")' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="px-4 md:px-10 lg:px-40">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'local_activity', color: 'text-primary bg-blue-100', title: 'All-Access Pass', desc: 'Pay one monthly fee and attend unlimited campus events.' },
              { icon: 'event_available', color: 'text-purple-600 bg-purple-100', title: 'Instant Booking', desc: 'Reserve your guaranteed spot in seconds directly from the dashboard.' },
              { icon: 'qr_code_2', color: 'text-teal-600 bg-teal-100', title: 'Contactless Entry', desc: 'Forget paper tickets. Just show your unique dynamic QR code.' }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-8 hover:border-primary/30 transition-all hover:shadow-lg">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${feature.color}`}>
                  <Icon name={feature.icon} size={28} />
                </div>
                <h3 className="text-text-main text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 mt-auto">
        <div className="px-4 md:px-10 lg:px-40 max-w-[1440px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-primary">
            <Icon name="school" />
            <span className="font-bold text-lg text-text-main">CampusPass</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 CampusPass Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};