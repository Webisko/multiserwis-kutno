import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { Menu, X, Phone, Mail, GraduationCap, Truck, User, HardHat, ChevronRight, BarChart3, Globe, Users, Shield, Building2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

// Helper function for image paths
const getImagePath = (filename: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${filename}`.replace('//', '/');
};

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setCatalogCategory: (category: string) => void;
  onShowLoginModal?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, language, setLanguage, setCatalogCategory, onShowLoginModal, isLoggedIn, userName, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [trainingMenuOpen, setTrainingMenuOpen] = useState(false);
  const [panelsMenuOpen, setPanelsMenuOpen] = useState(false);

  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (view: ViewState) => `
    cursor-pointer text-sm font-bold uppercase tracking-wider transition-colors duration-300
    ${currentView === view ? 'text-brand-accent' : 'text-white hover:text-brand-accent'}
  `;

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-slate-800">
      {/* Top Bar - Contact Info - Added relative z-[60] for Language Switcher context */}
      <div className="bg-brand-dark text-slate-400 py-2 px-4 text-xs md:text-sm border-b border-brand-secondary/30 relative z-[60]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2"><Phone size={14} className="text-brand-accent" /> +48 730 101 000</span>
            <span className="flex items-center gap-2 hidden md:flex"><Mail size={14} className="text-brand-accent" /> biuro@multiserwis.pl</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="font-semibold text-brand-accent uppercase tracking-wide hidden sm:block">
               Profesjonalne Szkolenia UDT
             </div>
             
             {/* Desktop Language Switcher */}
             <div className="relative hidden md:block">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1 text-white hover:text-brand-accent transition-colors font-bold"
                >
                  <Globe size={14} /> {language} <ChevronRight size={10} className={`transform transition-transform ${langMenuOpen ? 'rotate-90' : ''}`}/>
                </button>
                
                {langMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-24 bg-white rounded shadow-lg border border-slate-200 py-1 z-50">
                    {(['PL', 'EN', 'DE'] as Language[]).map((lang) => (
                      <div 
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangMenuOpen(false); }}
                        className={`
                          px-4 py-2 text-xs font-bold cursor-pointer hover:bg-slate-50 flex items-center justify-between
                          ${language === lang ? 'text-brand-accent' : 'text-slate-600'}
                        `}
                      >
                        {lang} {language === lang && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>}
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-primary shadow-xl py-3' : 'bg-brand-primary/95 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo Area */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setView('HOME')}
          >
            <div className="w-10 h-10 bg-brand-accent rounded-sm flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 p-1">
              <img src={getImagePath('logo.svg')} alt="MultiSerwis Logo" className="w-full h-full scale-[0.85] group-hover:scale-100 transform group-hover:-rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-extrabold text-white leading-none tracking-tight">MULTI<span className="text-brand-accent">SERWIS</span></span>
              <span className="text-[10px] text-slate-300 font-medium tracking-[0.2em] uppercase leading-none mt-1">Szkolenia & Maszyny</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            
            {/* Szkolenia Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setTrainingMenuOpen(true)}
              onMouseLeave={() => setTrainingMenuOpen(false)}
            >
              <span onClick={() => setView('CATALOG')} className={`${navItemClass('CATALOG')} flex items-center gap-1`}>
                {t.catalog} <ChevronRight size={14} className={`transform transition-transform ${trainingMenuOpen ? 'rotate-90' : ''}`}/>
              </span>
              
              {trainingMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-white rounded-sm shadow-xl border border-slate-200 overflow-hidden">
                    <div 
                      onClick={() => { setCatalogCategory('Wszystkie'); setView('CATALOG'); setTrainingMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <GraduationCap size={16} /> Wszystkie szkolenia
                    </div>
                    <div className="border-t border-slate-100"></div>
                    {[{name: 'UDT', label: 'Urządzenia UDT'}, {name: 'SEP', label: 'Uprawnienia SEP'}, {name: 'BHP', label: 'BHP i PPOŻ'}, {name: 'Inne', label: 'Maszyny Budowlane'}].map((category) => (
                      <div 
                        key={category.name}
                        onClick={() => { setCatalogCategory(category.label); setView('CATALOG'); setTrainingMenuOpen(false); }}
                        className="px-4 py-2 text-sm text-slate-600 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors"
                      >
                        Szkolenia {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Usługi Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <span className={`cursor-pointer text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${currentView === 'RENTALS' || currentView === 'SERVICES' ? 'text-brand-accent' : 'text-white hover:text-brand-accent'} flex items-center gap-1`}>
                Usługi <ChevronRight size={14} className={`transform transition-transform ${servicesMenuOpen ? 'rotate-90' : ''}`}/>
              </span>
              
              {servicesMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-white rounded-sm shadow-xl border border-slate-200 overflow-hidden">
                    <div 
                      onClick={() => { setView('RENTALS'); setServicesMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <Truck size={16} /> Wynajem maszyn
                    </div>
                    <div 
                      onClick={() => { setView('SERVICES'); setServicesMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <HardHat size={16} /> Serwis i konserwacja
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <span onClick={() => setView('CONTACT')} className={navItemClass('CONTACT')}>{t.contact}</span>
            
            {!isLoggedIn ? (
              <button 
                onClick={onShowLoginModal}
                className="px-5 py-2 rounded-sm font-bold text-sm uppercase tracking-wide transition-all bg-brand-accent text-white hover:bg-brand-accentHover shadow-lg"
              >
                <User size={16} className="inline mr-2" />
                Zaloguj
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-white text-sm font-bold">{userName}</span>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 rounded-sm font-bold text-xs uppercase tracking-wide bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Wyloguj
                </button>
              </div>
            )}
            
            {/* Panele Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setPanelsMenuOpen(true)}
              onMouseLeave={() => setPanelsMenuOpen(false)}
            >
              <span className={`cursor-pointer text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${currentView === 'ADMIN_PANEL' || currentView === 'LMS' || currentView === 'COMPANY_GUARDIAN_PANEL' ? 'text-brand-accent' : 'text-white hover:text-brand-accent'} flex items-center gap-1`}>
                Panele <ChevronRight size={14} className={`transform transition-transform ${panelsMenuOpen ? 'rotate-90' : ''}`}/>
              </span>
              
              {panelsMenuOpen && (
                <div className="absolute right-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white rounded-sm shadow-xl border border-slate-200 overflow-hidden">
                    <div 
                      onClick={() => { setView('ADMIN_PANEL'); setPanelsMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <Shield size={16} /> Panel administratora
                    </div>
                    <div 
                      onClick={() => { setView('ADMIN'); setPanelsMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <BarChart3 size={16} /> Panel managera
                    </div>
                    <div 
                      onClick={() => { setView('COMPANY_GUARDIAN_PANEL'); setPanelsMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <Building2 size={16} /> Strefa opiekuna firmy
                    </div>
                    <div 
                      onClick={() => { setView('LMS'); setPanelsMenuOpen(false); }}
                      className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <GraduationCap size={16} /> Strefa kursanta
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-primary border-t border-brand-secondary/50 shadow-2xl">
            <div className="flex flex-col p-4 space-y-4">
              
              {/* Szkolenia Mobile */}
              <div className="border-b border-brand-secondary/30">
                <div 
                  onClick={() => setTrainingMenuOpen(!trainingMenuOpen)}
                  className="text-white font-bold py-2 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2"><GraduationCap size={16}/> {t.catalog}</span>
                  <ChevronRight size={16} className={`transform transition-transform ${trainingMenuOpen ? 'rotate-90' : ''}`}/>
                </div>
                {trainingMenuOpen && (
                  <div className="pl-6 py-2 space-y-2">
                    <div onClick={() => { setCatalogCategory('Wszystkie'); setView('CATALOG'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1">Wszystkie szkolenia</div>
                    {[{name: 'UDT', label: 'Urządzenia UDT'}, {name: 'SEP', label: 'Uprawnienia SEP'}, {name: 'BHP', label: 'BHP i PPOŻ'}, {name: 'Inne', label: 'Maszyny Budowlane'}].map((category) => (
                      <div 
                        key={category.name}
                        onClick={() => { setCatalogCategory(category.label); setView('CATALOG'); setMobileMenuOpen(false); }}
                        className="text-slate-300 text-sm py-1"
                      >
                        Szkolenia {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Usługi Mobile */}
              <div className="border-b border-brand-secondary/30">
                <div 
                  onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  className="text-white font-bold py-2 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Truck size={16}/> Usługi</span>
                  <ChevronRight size={16} className={`transform transition-transform ${servicesMenuOpen ? 'rotate-90' : ''}`}/>
                </div>
                {servicesMenuOpen && (
                  <div className="pl-6 py-2 space-y-2">
                    <div onClick={() => { setView('RENTALS'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1 flex items-center gap-2">
                      <Truck size={14}/> Wynajem maszyn
                    </div>
                    <div onClick={() => { setView('SERVICES'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1 flex items-center gap-2">
                      <HardHat size={14}/> Serwis i konserwacja
                    </div>
                  </div>
                )}
              </div>
              
              <span onClick={() => { setView('CONTACT'); setMobileMenuOpen(false); }} className="text-white font-bold py-2 border-b border-brand-secondary/30">{t.contact}</span>
              
              {/* Login/Logout Mobile */}
              {!isLoggedIn ? (
                <button 
                  onClick={() => { onShowLoginModal?.(); setMobileMenuOpen(false); }}
                  className="text-white font-bold py-2 border-b border-brand-secondary/30 flex items-center gap-2 bg-brand-accent px-4 rounded"
                >
                  <User size={16}/> Zaloguj
                </button>
              ) : (
                <div className="flex items-center justify-between border-b border-brand-secondary/30 pb-2">
                  <span className="text-white text-sm font-bold">{userName}</span>
                  <button 
                    onClick={() => { onLogout?.(); setMobileMenuOpen(false); }}
                    className="px-4 py-2 rounded-sm font-bold text-xs uppercase bg-red-600 text-white"
                  >
                    Wyloguj
                  </button>
                </div>
              )}
              
              {/* Panele Mobile */}
              <div className="border-b border-brand-secondary/30">
                <div 
                  onClick={() => setPanelsMenuOpen(!panelsMenuOpen)}
                  className="text-white font-bold py-2 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Users size={16}/> Panele</span>
                  <ChevronRight size={16} className={`transform transition-transform ${panelsMenuOpen ? 'rotate-90' : ''}`}/>
                </div>
                {panelsMenuOpen && (
                  <div className="pl-6 py-2 space-y-2">
                    <div onClick={() => { setView('ADMIN_PANEL'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1 flex items-center gap-2">
                      <Shield size={14}/> Panel administratora
                    </div>
                    <div onClick={() => { setView('ADMIN'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1 flex items-center gap-2">
                      <BarChart3 size={14}/> Panel managera
                    </div>
                    <div onClick={() => { setView('COMPANY_GUARDIAN_PANEL'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1 flex items-center gap-2">
                      <Building2 size={14}/> Strefa opiekuna firmy
                    </div>
                    <div onClick={() => { setView('LMS'); setMobileMenuOpen(false); }} className="text-slate-300 text-sm py-1 flex items-center gap-2">
                      <GraduationCap size={14}/> Strefa kursanta
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Language Switcher */}
              <div className="flex gap-4 pt-2 justify-center">
                 {(['PL', 'EN', 'DE'] as Language[]).map((lang) => (
                   <span 
                     key={lang}
                     onClick={() => setLanguage(lang)}
                     className={`text-sm font-bold p-2 rounded ${language === lang ? 'bg-brand-accent text-white' : 'text-slate-400 bg-brand-dark/30'}`}
                   >
                     {lang}
                   </span>
                 ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex flex-col mb-6">
              <span className="text-2xl font-heading font-extrabold text-white leading-none tracking-tight">MULTI<span className="text-brand-accent">SERWIS</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Lider szkoleń zawodowych i wynajmu maszyn budowlanych. Dostarczamy najwyższą jakość usług, certyfikowane szkolenia UDT oraz niezawodny sprzęt.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-brand-secondary/50 rounded flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer">F</div>
               <div className="w-8 h-8 bg-brand-secondary/50 rounded flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer">I</div>
               <div className="w-8 h-8 bg-brand-secondary/50 rounded flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer">L</div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent block"></span> Usługi
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="hover:text-brand-accent cursor-pointer transition-colors">Szkolenia UDT</li>
              <li className="hover:text-brand-accent cursor-pointer transition-colors">Wynajem Ładowarek</li>
              <li className="hover:text-brand-accent cursor-pointer transition-colors">Serwis Maszyn</li>
              <li className="hover:text-brand-accent cursor-pointer transition-colors">Uprawnienia SEP</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent block"></span> Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="mt-1"><Phone size={14} className="text-brand-accent"/></div>
                <div>+48 730 101 000<br/><span className="text-xs text-slate-500">Pn-Pt 8:00 - 16:00</span></div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-brand-accent"/> biuro@multiserwis.pl
              </li>
              <li className="flex items-start gap-3">
                 <div className="mt-1">📍</div>
                 <div>ul. Siemieradzkiego 18<br/>99-300 Kutno</div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent block"></span> Certyfikaty
            </h4>
            <div className="bg-white/5 p-4 rounded border border-white/10 flex flex-col items-center justify-center">
               <div className="text-2xl font-bold mb-1 tracking-widest text-slate-200">ISO 9001</div>
               <div className="text-[10px] uppercase text-slate-500">System Zarządzania Jakością</div>
            </div>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-brand-secondary/30 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2026 MultiSerwis. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Polityka Prywatności</span>
            <span className="hover:text-white cursor-pointer">Regulamin</span>
          </div>
        </div>
      </footer>
    </div>
  );
};