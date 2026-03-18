import { useState, useEffect, useRef } from 'react';
import { MapPin, Download, LogIn, Menu, X, LayoutDashboard, LogOut, BookOpen } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // ── LMS state ──
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isPartnersActive = location.pathname === '/partners' || location.pathname === '/become-partner';

  // ── LMS: check login on mount and events ──
  useEffect(() => {
    checkLoginStatus();
    const handler = () => checkLoginStatus();
    window.addEventListener('userLoginStatusChanged', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('userLoginStatusChanged', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const checkLoginStatus = async () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserEmail(user.email);
        setUserName(user.name || user.email.split('@')[0]);
        setIsLoggedIn(true);
        await checkActiveLicense(user.email);
      } catch {
        setIsLoggedIn(false);
        setHasActiveLicense(false);
      }
    } else {
      setIsLoggedIn(false);
      setHasActiveLicense(false);
      setUserEmail('');
      setUserName('');
    }
  };

  const checkActiveLicense = async (email: string) => {
    try {
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=69589d3ba7306459dd47fd87`,
        { headers: { 'x-api-key': 'my-secret-key-123' } }
      );
      if (response.ok) {
        const data = await response.json();
        setHasActiveLicense(data.activeLicense?.status === 'active');
      } else {
        setHasActiveLicense(false);
      }
    } catch {
      setHasActiveLicense(false);
    }
  };

  // ── Updated: navigates to login page for all users ──
  const handleDashboardClick = () => {
    window.open('https://geo-track-em3s.onrender.com/login', '_blank');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // ── Updated: navigates to /tutorials route ──
  const handleTutorialsClick = () => {
    navigate('/tutorials');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setHasActiveLicense(false);
    setUserEmail('');
    setUserName('');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event('userLoginStatusChanged'));
  };

  const getUserInitials = () => {
    if (!userName) return 'U';
    return userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/become-partner') {
      window.scrollTo(0, 0);
      navigate('/become-partner');
      return;
    }

    const id = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home',     href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Why Us',   href: '#why-us' },
    { label: 'Product',  href: '#product' },
    { label: 'Pricing',  href: '#pricing' },
    { label: 'FAQs',     href: '#faqs' },
    { label: 'Partners', href: '/become-partner' },
  ];

  return (
    <>
      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onAdminLogin={(type, name) => console.log(type, name)}
        onLoginSuccess={() => checkLoginStatus()}
        onNavigateToPricing={() => {
          const el = document.getElementById('pricing');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700&display=swap');

        html { scroll-behavior: smooth; }

        .gt-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid #E8EDF4;
          font-family: 'Inter', sans-serif;
        }

        .gt-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 61px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .gt-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .gt-logo-mark {
          width: 34px;
          height: 34px;
          background: linear-gradient(145deg, #1A56DB 0%, #0E3FA8 100%);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(26, 86, 219, 0.28);
        }

        .gt-logo-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.025em;
        }

        .gt-logo-text span { color: #1A56DB; }

        .gt-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
          padding-left: 0px;
        }

        .gt-nav-link {
          padding: 7px 14px;
          font-size: 0.795rem;
          font-weight: 500;
          color: #4B5563;
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.18s ease, background 0.18s ease;
          letter-spacing: -0.01em;
          white-space: nowrap;
          cursor: pointer;
        }

        .gt-nav-link:hover { color: #1A56DB; background: #EEF3FF; }
        .gt-nav-link.active { color: #1A56DB; background: #EEF3FF; font-weight: 600; }

        .gt-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .gt-btn-ghost {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #4B5563;
          background: none;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }

        .gt-btn-ghost:hover { color: #1A56DB; border-color: #1A56DB; background: #EEF3FF; }

        .gt-btn-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(145deg, #1A56DB 0%, #0E3FA8 100%);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 2px 8px rgba(26, 86, 219, 0.25);
          white-space: nowrap;
        }

        .gt-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26, 86, 219, 0.35); }

        /* ── Avatar & Dropdown ── */
        .gt-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(145deg, #1A56DB 0%, #0E3FA8 100%);
          color: white;
          font-size: 0.78rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(26,86,219,0.28);
          transition: all 0.18s ease;
          font-family: 'Inter', sans-serif;
          outline: none;
        }
        .gt-avatar:hover { transform: scale(1.06); box-shadow: 0 4px 14px rgba(26,86,219,0.38); }

        .gt-dropdown {
          position: absolute;
          right: 0; top: calc(100% + 10px);
          width: 220px;
          background: white;
          border-radius: 16px;
          border: 1px solid #E5E7EB;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          overflow: hidden;
          z-index: 200;
        }
        .gt-dropdown-header {
          padding: 14px 16px;
          border-bottom: 1px solid #F3F4F6;
          background: #F8FAFF;
        }
        .gt-dropdown-name { font-size: 0.83rem; font-weight: 600; color: #111827; margin-bottom: 2px; font-family: 'Inter', sans-serif; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .gt-dropdown-email { font-size: 0.72rem; color: #9CA3AF; font-family: 'Inter', sans-serif; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .gt-dropdown-body { padding: 6px; }
        .gt-dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 10px;
          font-size: 0.83rem; font-weight: 500; color: #374151;
          cursor: pointer; background: none; border: none;
          width: 100%; text-align: left;
          transition: background 0.15s ease;
          font-family: 'Inter', sans-serif;
        }
        .gt-dropdown-item:hover { background: #F3F4F6; }
        .gt-dropdown-item.danger { color: #EF4444; }
        .gt-dropdown-item.danger:hover { background: #FEF2F2; }
        .gt-dropdown-divider { height: 1px; background: #F3F4F6; margin: 4px 0; }

        .gt-mobile-toggle {
          display: none;
          padding: 8px;
          background: none;
          border: none;
          color: #4B5563;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.18s;
        }

        .gt-mobile-toggle:hover { background: #F3F4F6; color: #1A56DB; }

        .gt-mobile-menu {
          background: white;
          border-top: 1px solid #E8EDF4;
          padding: 12px 24px 20px;
        }

        .gt-mobile-link {
          display: block;
          padding: 11px 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.18s;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
        }

        .gt-mobile-link:hover,
        .gt-mobile-link.active { color: #1A56DB; background: #EEF3FF; }

        .gt-mobile-divider { height: 1px; background: #F3F4F6; margin: 10px 0; border: none; }
        .gt-mobile-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }

        @media (max-width: 1024px) {
          .gt-nav { display: none; }
          .gt-mobile-toggle { display: flex; align-items: center; justify-content: center; }
        }

        @media (max-width: 640px) {
          .gt-actions { display: none; }
          .gt-header-inner { padding: 0 16px; }
        }
      `}</style>

      <header className="gt-header">
        <div className="gt-header-inner">

          {/* Logo */}
          <div className="gt-logo" onClick={() => { window.scrollTo(0, 0); navigate('/'); }}>
            <div className="gt-logo-mark">
              <MapPin size={16} color="white" strokeWidth={2.5} />
            </div>
            <span className="gt-logo-text">Geo<span> Track</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="gt-nav">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`gt-nav-link ${isPartnersActive && link.label === 'Partners' ? 'active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="gt-actions">
            {!isLoggedIn ? (
              <>
                <button className="gt-btn-ghost" onClick={() => window.open('http://bit.ly/4r3d9ZB', '_blank')}>
                  <Download size={14} strokeWidth={2.5} />
                  Download APK
                </button>
                <button className="gt-btn-primary" onClick={() => setLoginOpen(true)}>
                  <LogIn size={14} strokeWidth={2.5} />
                  Login
                </button>
              </>
            ) : (
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button className="gt-avatar" onClick={() => setDropdownOpen(o => !o)}>
                  {getUserInitials()}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="gt-dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="gt-dropdown-header">
                        <div className="gt-dropdown-name">{userName}</div>
                        <div className="gt-dropdown-email">{userEmail}</div>
                      </div>

                      {/* ── All items visible for ALL logged-in users ── */}
                      <div className="gt-dropdown-body">
                        <button className="gt-dropdown-item" onClick={handleDashboardClick}>
                          <LayoutDashboard size={15} color="#1A56DB" />
                          Dashboard
                        </button>
                        <button className="gt-dropdown-item" onClick={handleTutorialsClick}>
                          <BookOpen size={15} color="#1A56DB" />
                          Watch Tutorials
                        </button>
                        <button className="gt-dropdown-item" onClick={() => { window.open('http://bit.ly/4r3d9ZB', '_blank'); setDropdownOpen(false); }}>
                          <Download size={15} color="#6B7280" />
                          Download APK
                        </button>
                        <div className="gt-dropdown-divider" />
                        <button className="gt-dropdown-item danger" onClick={handleLogout}>
                          <LogOut size={15} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="gt-mobile-toggle"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="gt-mobile-menu">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`gt-mobile-link ${isPartnersActive && link.label === 'Partners' ? 'active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <hr className="gt-mobile-divider" />
            <div className="gt-mobile-actions">
              {!isLoggedIn ? (
                <>
                  <button className="gt-btn-ghost" style={{ justifyContent: 'center' }} onClick={() => window.open('http://bit.ly/4r3d9ZB', '_blank')}>
                    <Download size={14} /> Download APK
                  </button>
                  <button className="gt-btn-primary" style={{ justifyContent: 'center' }} onClick={() => { setLoginOpen(true); setMobileMenuOpen(false); }}>
                    <LogIn size={14} /> Login
                  </button>
                </>
              ) : (
                <>
                  <div style={{ padding: '8px 12px', background: '#F8FAFF', borderRadius: '10px', marginBottom: '4px' }}>
                    <div style={{ fontSize: '0.83rem', fontWeight: 600, color: '#111827', fontFamily: 'Inter, sans-serif' }}>{userName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>{userEmail}</div>
                  </div>

                  {/* ── All items visible for ALL logged-in users in mobile too ── */}
                  <button className="gt-btn-ghost" style={{ justifyContent: 'center' }} onClick={handleDashboardClick}>
                    <LayoutDashboard size={14} /> Dashboard
                  </button>
                  <button className="gt-btn-ghost" style={{ justifyContent: 'center' }} onClick={handleTutorialsClick}>
                    <BookOpen size={14} /> Watch Tutorials
                  </button>
                  <button className="gt-btn-ghost" style={{ justifyContent: 'center' }} onClick={() => { window.open('http://bit.ly/4r3d9ZB', '_blank'); setMobileMenuOpen(false); }}>
                    <Download size={14} /> Download APK
                  </button>
                  <button className="gt-btn-ghost" style={{ justifyContent: 'center', color: '#EF4444', borderColor: '#FCA5A5' }} onClick={handleLogout}>
                    <LogOut size={14} /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}