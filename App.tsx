
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Menu, 
  X, 
  Home as HomeIcon, 
  Tv, 
  Info, 
  MessageSquare, 
  Phone, 
  Facebook, 
  Youtube, 
  Music,
  Play,
  Pause,
  Volume2,
  Loader2,
  Radio as RadioIcon,
  ExternalLink
} from 'lucide-react';
import { View } from './types';
import { RADIO_NAME, RADIO_SLOGAN, DISPLAY_PHONE, WHATSAPP_PHONE, EMAIL_CONTACT, SOCIALS, RADIO_STREAM_URL, TV_IFRAME_URL, THEME } from './constants';

// --- Components ---

const Sidebar: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  currentView: View; 
  onViewChange: (view: View) => void; 
}> = ({ isOpen, onClose, currentView, onViewChange }) => {
  const menuItems = [
    { id: View.HOME, label: 'Accueil', icon: <HomeIcon size={20} /> },
    { id: View.TV, label: 'Alliance TV', icon: <Tv size={20} /> },
    { id: View.ABOUT, label: 'À propos', icon: <Info size={20} /> },
    { id: View.CONTACT, label: 'Contact', icon: <MessageSquare size={20} /> },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#0a192f] z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) border-r border-yellow-500/20 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full bg-gradient-to-b from-[#2e0854]/40 to-[#0a192f]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex flex-col">
              <span className="text-xl font-black text-white italic leading-none tracking-tighter">
                <span className="text-red-600">ALLIANCE</span> RADIO
              </span>
              <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-1">Direct Côte d'Ivoire</span>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-1.5 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onViewChange(item.id); onClose(); }}
                className={`flex items-center space-x-4 w-full p-4 rounded-xl transition-all duration-300 ${currentView === item.id ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-900/40' : 'text-gray-300 hover:bg-white/5'}`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
            
            <div className="border-t border-white/10 my-6 pt-6">
              <p className="text-[10px] text-yellow-500/50 uppercase tracking-[0.2em] px-4 mb-4 font-bold">Réseaux Sociaux</p>
              <div className="grid grid-cols-2 gap-2 px-2">
                <button onClick={() => window.open(SOCIALS.FACEBOOK, '_blank')} className="flex items-center space-x-2 p-3 text-[10px] font-bold text-gray-300 bg-white/5 rounded-lg hover:text-blue-400 transition-all uppercase tracking-tighter">
                  <Facebook size={14} />
                  <span>Facebook</span>
                </button>
                <button onClick={() => window.open(SOCIALS.TIKTOK, '_blank')} className="flex items-center space-x-2 p-3 text-[10px] font-bold text-gray-300 bg-white/5 rounded-lg hover:text-pink-400 transition-all uppercase tracking-tighter">
                  <Music size={14} />
                  <span>TikTok</span>
                </button>
                <button onClick={() => window.open(SOCIALS.YOUTUBE, '_blank')} className="flex items-center space-x-2 p-3 text-[10px] font-bold text-gray-300 bg-white/5 rounded-lg hover:text-red-500 transition-all uppercase tracking-tighter col-span-2 justify-center">
                  <Youtube size={14} />
                  <span>YouTube Official</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="pt-6 border-t border-white/10 mt-auto">
             <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20 text-center">
                <p className="text-[10px] text-yellow-500 font-bold uppercase mb-2">Audience direct</p>
                <button 
                  onClick={() => window.location.href = `tel:${WHATSAPP_PHONE}`}
                  className="flex items-center justify-center space-x-2 w-full bg-yellow-500 text-black py-3 rounded-xl font-black text-sm hover:bg-yellow-400 transition-all transform active:scale-95 shadow-xl shadow-yellow-500/20"
                >
                  <Phone size={16} />
                  <span>APPELEZ LE STUDIO</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => (
  <header className="sticky top-0 z-30 bg-[#0a192f]/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 flex items-center justify-between">
    <button onClick={onOpenMenu} className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
      <Menu size={24} className="text-yellow-500" />
      <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-[#0a192f] animate-pulse"></span>
    </button>
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-black tracking-tighter text-white italic leading-none">
        <span className="text-red-600">ALLIANCE</span> RADIO
      </h1>
      <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-[0.3em] mt-0.5">La Voix de l'Espoir</span>
    </div>
    <div className="w-10 flex justify-end">
      <div className="w-8 h-8 rounded-full flex items-center justify-center border border-yellow-500/30 text-yellow-500">
        <RadioIcon size={16} />
      </div>
    </div>
  </header>
);

const RadioPlayer: React.FC<{ 
  isPlaying: boolean; 
  isLoading: boolean;
  onToggle: () => void; 
}> = ({ isPlaying, isLoading, onToggle }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-[#0a192f]/95 backdrop-blur-xl border-t border-white/10 p-4 pb-8 safe-area-bottom z-40">
      <div className="max-w-xl mx-auto flex items-center gap-4">
        <div className="relative group">
          <div className={`w-14 h-14 bg-gradient-to-br from-red-600 to-[#2e0854] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-500 ${isPlaying ? 'rotate-[360deg]' : ''}`}>
             {isPlaying ? (
               <div className="flex gap-0.5 items-end h-6">
                  <div className="w-1 bg-white animate-[bounce_0.6s_infinite] h-full rounded-full"></div>
                  <div className="w-1 bg-white animate-[bounce_0.8s_infinite] h-3 rounded-full"></div>
                  <div className="w-1 bg-white animate-[bounce_0.7s_infinite] h-5 rounded-full"></div>
                  <div className="w-1 bg-white animate-[bounce_0.9s_infinite] h-4 rounded-full"></div>
               </div>
             ) : (
               <Music className="text-white" size={24} />
             )}
          </div>
          {isPlaying && (
             <span className="absolute -top-1 -right-1 flex h-4 w-4">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-[#0a192f] text-[6px] font-bold items-center justify-center">ON</span>
             </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-black text-white truncate tracking-tight uppercase">ALLIANCE RADIO</h3>
          <div className="flex items-center gap-2">
            <p className={`text-[10px] font-bold uppercase tracking-widest ${isPlaying ? 'text-green-400' : 'text-yellow-500'}`}>
              {isLoading ? 'Connexion...' : (isPlaying ? 'En Direct' : 'Pause')}
            </p>
            {isPlaying && <span className="text-[10px] text-white/30">• Côte d'Ivoire</span>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggle}
            disabled={isLoading}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all duration-300 disabled:opacity-50 ${isPlaying ? 'bg-white text-black' : 'bg-red-600 text-white'}`}
          >
            {isLoading ? (
              <Loader2 size={28} className="animate-spin" />
            ) : (
              isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => (
  <div className="flex flex-col animate-fade-in pb-32">
    <div className="relative w-full aspect-[4/3] max-h-96 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop" 
        alt="Studio" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-[#2e0854]/40 flex flex-col items-center justify-center text-center p-6">
        <div className="w-full max-w-xs flex flex-col items-center">
           <span className="text-5xl font-black italic tracking-tighter text-white drop-shadow-2xl">
              <span className="text-red-600">ALLIANCE</span><br/>RADIO
           </span>
           <div className="w-20 h-1 bg-yellow-500 mt-4 rounded-full"></div>
        </div>
        <p className="text-yellow-500 font-bold text-2xl font-slogan italic mt-6 drop-shadow-lg animate-pulse">
          {RADIO_SLOGAN}
        </p>
      </div>
    </div>

    <div className="px-6 -mt-8 relative z-10">
      <div className="bg-gradient-to-br from-[#2e0854] to-[#0a192f] p-6 rounded-[2rem] border border-white/10 shadow-2xl">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black italic tracking-tighter text-white">VOTRE DIRECT</h3>
            <div className="flex items-center gap-1 bg-red-600/20 px-2 py-1 rounded-md">
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
               <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter">Live</span>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_PHONE.replace('+', '')}`, '_blank')}
              className="flex flex-col items-center justify-center gap-2 bg-green-600/10 p-4 rounded-2xl border border-green-600/20 hover:bg-green-600/20 transition-all group"
            >
               <MessageSquare className="text-green-500 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">WhatsApp</span>
            </button>
            <a 
              href={`tel:${WHATSAPP_PHONE}`}
              className="flex flex-col items-center justify-center gap-2 bg-yellow-500/10 p-4 rounded-2xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-all group"
            >
               <Phone className="text-yellow-500 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold text-yellow-500 uppercase tracking-tighter">Téléphone</span>
            </a>
         </div>
      </div>
    </div>

    <div className="p-6">
       <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Programmes TV</h4>
          <button className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest border-b border-yellow-500/30 pb-0.5">Voir tout</button>
       </div>
       <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
             <div className="w-20 h-20 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&auto=format" alt="Event" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 flex flex-col justify-center">
                <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest">En ce moment</span>
                <h5 className="font-bold text-white group-hover:text-yellow-500 transition-colors">Le Réveil Divin</h5>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1">Émission de louange et d'adoration matinale.</p>
             </div>
          </div>
       </div>
    </div>
  </div>
);

const TVPage: React.FC = () => (
  <div className="min-h-screen bg-black animate-fade-in pb-32">
    <div className="p-6 bg-[#0a192f] rounded-b-[3rem] border-b border-white/10 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter text-white">ALLIANCE <span className="text-red-600">TV</span></h2>
          <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Le Direct Vidéo</p>
        </div>
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/50">
           <Tv size={24} />
        </div>
      </div>
    </div>
    <div className="px-4">
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border border-white/5">
        <iframe 
          allowFullScreen 
          src={TV_IFRAME_URL} 
          height="100%" 
          width="100%" 
          frameBorder="0"
          title="Alliance TV Stream"
          className="w-full h-full"
        />
      </div>
      <div className="mt-8 p-6 bg-[#0a192f] rounded-[2rem] border border-white/10">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white"><RadioIcon size={16} /></div>
           <h3 className="font-bold text-white">Informations Direct</h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed italic">
          "{RADIO_SLOGAN}"
        </p>
        <p className="mt-4 text-gray-300 text-sm">
          Retrouvez nos programmes phares, nos documentaires exclusifs et l'actualité en temps réel sur notre canal TV officiel.
        </p>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isRadioLoading, setIsRadioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleRadio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && audio.src !== "") {
      audio.pause();
      audio.src = "";
      audio.load();
      setIsRadioPlaying(false);
    } else {
      setIsRadioLoading(true);
      audio.src = RADIO_STREAM_URL;
      audio.load();
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsRadioPlaying(true);
            setIsRadioLoading(false);
          })
          .catch(err => {
            console.error("Playback failed:", err);
            setIsRadioLoading(false);
            setIsRadioPlaying(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: RADIO_NAME,
        artist: RADIO_SLOGAN,
        album: 'Live 24h/24'
      });

      navigator.mediaSession.setActionHandler('play', toggleRadio);
      navigator.mediaSession.setActionHandler('pause', toggleRadio);
      navigator.mediaSession.setActionHandler('stop', () => {
         if(audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            setIsRadioPlaying(false);
         }
      });
      
      return () => {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
      };
    }
  }, [toggleRadio]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isRadioPlaying ? 'playing' : 'paused';
    }
  }, [isRadioPlaying]);

  const renderContent = () => {
    switch (currentView) {
      case View.HOME: return <HomePage />;
      case View.TV: return <TVPage />;
      case View.ABOUT: return (
        <div className="p-6 animate-fade-in pb-32">
          <div className="flex flex-col items-center mb-8">
             <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-[#2e0854] rounded-[2rem] flex items-center justify-center shadow-2xl mb-4 border border-white/10">
                <RadioIcon size={48} className="text-white" />
             </div>
             <h2 className="text-2xl font-black italic tracking-tighter text-white">ALLIANCE RADIO</h2>
             <p className="text-yellow-500 font-bold text-sm tracking-widest uppercase">{RADIO_SLOGAN}</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all"></div>
               <p className="text-gray-300 leading-relaxed relative z-10 text-sm">
                 Alliance Radio & TV est bien plus qu'une simple station. C'est votre compagnon spirituel quotidien, vous offrant une programmation riche en messages d'espoir, louanges célestes et informations essentielles.
               </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-red-600"><Phone size={18} /></div>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-gray-500 font-bold uppercase">Téléphone Direct</span>
                     <span className="text-sm font-bold text-white">{DISPLAY_PHONE}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400"><ExternalLink size={18} /></div>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-gray-500 font-bold uppercase">Site Web</span>
                     <span className="text-sm font-bold text-white">www.allianceradio.com</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      );
      case View.CONTACT: return (
        <div className="p-6 animate-fade-in pb-32">
          <div className="mb-8">
            <h2 className="text-3xl font-black italic tracking-tighter text-white">CONTACTEZ-NOUS</h2>
            <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mt-1">Laissez un message à l'équipe</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase px-2">Nom Complet</label>
                <input type="text" placeholder="Entrez votre nom" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-600" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase px-2">Message</label>
                <textarea placeholder="Votre message pour Alliance..." rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-600" />
             </div>
             <button className="w-full bg-gradient-to-r from-red-600 to-red-800 py-5 rounded-[2rem] font-black text-white shadow-xl shadow-red-900/40 hover:scale-[1.02] active:scale-95 transition-all">
                ENVOYER LE MESSAGE
             </button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a192f] select-none text-white overflow-x-hidden">
      <Header onOpenMenu={() => setIsSidebarOpen(true)} />
      
      <audio 
        ref={audioRef} 
        preload="none"
        onPlaying={() => { setIsRadioPlaying(true); setIsRadioLoading(false); }}
        onPause={() => setIsRadioPlaying(false)}
        onWaiting={() => setIsRadioLoading(true)}
        onCanPlay={() => setIsRadioLoading(false)}
        onError={() => { setIsRadioLoading(false); setIsRadioPlaying(false); }}
      />

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {renderContent()}
      </main>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <RadioPlayer 
        isPlaying={isRadioPlaying} 
        isLoading={isRadioLoading}
        onToggle={toggleRadio} 
      />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .font-slogan { font-family: 'Great Vibes', cursive; }
        main { -webkit-overflow-scrolling: touch; }
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
      `}</style>
    </div>
  );
};

export default App;
