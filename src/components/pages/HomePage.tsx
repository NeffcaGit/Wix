// HPI 1.6-V
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Anchor, 
  Waves, 
  Shield, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  Terminal, 
  Cpu, 
  Activity, 
  Radio, 
  ChevronRight, 
  Crosshair,
  Zap,
  Globe,
  Server
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { GameModes, ServerRules, SocialMediaLinks } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// --- Utility Components for "Living" Experience ---

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={cn(
        "transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TechBorder = ({ className }: { className?: string }) => (
  <div className={cn("absolute pointer-events-none inset-0 border border-[#79d0ff]/20", className)}>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#79d0ff]" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#79d0ff]" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#79d0ff]" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#79d0ff]" />
  </div>
);

const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#79d0ff] opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none" aria-hidden="true">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#e85d4a] opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none" aria-hidden="true">{text}</span>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [gameModes, setGameModes] = useState<GameModes[]>([]);
  const [serverRules, setServerRules] = useState<ServerRules[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [filteredRules, setFilteredRules] = useState<ServerRules[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Scroll & Parallax Hooks ---
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const heroParallax = useTransform(smoothScrollY, [0, 1000], [0, 300]);
  const bgParallax1 = useTransform(smoothScrollY, [0, 2000], [0, -150]);
  const bgParallax2 = useTransform(smoothScrollY, [0, 2000], [0, -300]);
  const opacityFade = useTransform(smoothScrollY, [0, 500], [1, 0]);
  const headerBgOpacity = useTransform(smoothScrollY, [0, 100], [0, 0.95]);

  // --- Data Loading (Preserved Logic) ---
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [modesResult, rulesResult, socialResult] = await Promise.all([
        BaseCrudService.getAll<GameModes>('gamemodes'),
        BaseCrudService.getAll<ServerRules>('serverrules'),
        BaseCrudService.getAll<SocialMediaLinks>('socialmedialinks')
      ]);

      const sortedModes = modesResult.items.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      const sortedRules = rulesResult.items
        .filter(rule => rule.isActive)
        .sort((a, b) => (a.ruleNumber || 0) - (b.ruleNumber || 0));
      const sortedSocial = socialResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      setGameModes(sortedModes);
      setServerRules(sortedRules);
      setSocialLinks(sortedSocial);

      if (sortedModes.length > 0) {
        const firstModeId = sortedModes[0]._id;
        setSelectedMode(firstModeId);
        // Filter rules for the first mode
        const modeRules = sortedRules.filter(rule => rule.gameMode === firstModeId);
        setFilteredRules(modeRules.length > 0 ? modeRules : sortedRules);
      }
      
      setIsLoaded(true);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  // Update filtered rules when selected mode changes
  useEffect(() => {
    if (selectedMode && serverRules.length > 0) {
      const modeRules = serverRules.filter(rule => rule.gameMode === selectedMode);
      setFilteredRules(modeRules.length > 0 ? modeRules : serverRules);
    }
  }, [selectedMode, serverRules]);

  return (
    <div className="min-h-screen bg-[#050a10] text-[#F1F1F1] font-paragraph selection:bg-[#79d0ff]/30 selection:text-[#79d0ff] overflow-x-clip">
      {/* --- Global Background System --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deepest Layer - Void */}
        <div className="absolute inset-0 bg-[#0f1c28]" />
        
        {/* Layer 1 - Distant Structures */}
        <motion.div style={{ y: bgParallax1 }} className="absolute inset-0 opacity-30 mix-blend-luminosity">
          <Image 
            src="https://static.wixstatic.com/media/a2d8da_6bb547a642244b0897706699126670a5~mv2.png?id=bg-layer-1"
            alt="Deep sea ruins"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer 2 - Midground Debris */}
        <motion.div style={{ y: bgParallax2 }} className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image 
            src="https://static.wixstatic.com/media/a2d8da_a819aa4892254667ba67603288fa4ad5~mv2.png?id=bg-layer-2"
            alt="Underwater structures"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlay - Scanlines & Vignette */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c28]/80 via-transparent to-[#0f1c28]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      </div>
      {/* --- Navigation --- */}
      <motion.header 
        style={{ backgroundColor: `rgba(19, 42, 54, ${headerBgOpacity})` }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#79d0ff]/10 backdrop-blur-sm transition-colors duration-300"
      >
        <div className="max-w-[120rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 flex items-center justify-center bg-[#79d0ff]/10 border border-[#79d0ff]/30 rounded-sm">
              <Anchor className="w-6 h-6 text-[#79d0ff]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#e85d4a] rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-widest text-[#F1F1F1]">DEEP STATION</span>
              <span className="text-[10px] text-[#79d0ff] tracking-[0.2em] uppercase">System Online</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Режимы', href: '#modes' },
              { label: 'Правила', href: '#rules' },
              { label: 'Контакты', href: '#contact' },
              { label: 'Статус', href: '#status' }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="relative text-sm font-medium text-[#B2A8A8] hover:text-[#79d0ff] transition-colors group py-2"
              >
                <span className="relative z-10">{'// '}{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#79d0ff] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <Button 
            className="bg-[#79d0ff]/10 hover:bg-[#79d0ff]/20 text-[#79d0ff] border border-[#79d0ff]/50 font-heading tracking-wider"
            onClick={() => window.open('https://discord.com', '_blank')}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            ПРИСОЕДИНИТЬСЯ
          </Button>
        </div>
      </motion.header>
      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
           <Image 
            src="https://static.wixstatic.com/media/a2d8da_d9f6fd68eff64e8da8224ac367d6ec84~mv2.png?id=hero-bg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a10] via-[#050a10]/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[120rem] w-full px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#79d0ff]/10 border border-[#79d0ff]/20 text-[#79d0ff] text-xs font-mono mb-6">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>SIGNAL_DETECTED: INCOMING TRANSMISSION</span>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="font-heading text-6xl md:text-8xl leading-[0.9] tracking-tighter bg-clip-text bg-gradient-to-r from-white via-[#c9ccf1] to-[#79d0ff] text-icon2 font-bold">
                Люди VS Монстры <span className="text-stroke-thin text-transparent bg-clip-text bg-gradient-to-r from-[#79d0ff] to-[#3342D2]">ARE CALLING</span>
              <br />
                </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-[#B2A8A8] max-w-2xl leading-relaxed border-l-2 border-[#e85d4a] pl-6">
                Что такое ЛVМ? (Люди VS Монстры),
                Это сеть серверов с разными хостами, разными админами и режимами, но с общей целью - развлекать игроков.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 bg-[#e85d4a] hover:bg-[#e85d4a]/90 text-white font-heading text-lg rounded-none clip-path-button relative overflow-hidden group"
                  onClick={() => window.open('https://discord.com', '_blank')}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    НАЧАТЬ_ПОГРУЖЕНИЕ <ChevronRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 border-[#79d0ff]/50 text-[#79d0ff] hover:bg-[#79d0ff]/10 font-heading text-lg rounded-none"
                  onClick={() => document.getElementById('modes')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  ПРОСМОТР_ПРОТОКОЛОВ
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={400}>
              <div className="relative bg-[#132a36]/40 backdrop-blur-md border border-[#79d0ff]/20 p-8 rounded-sm">
                <TechBorder />
                <div className="flex items-center justify-between mb-6 border-b border-[#79d0ff]/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#9be27d]" />
                    <span className="font-heading font-bold text-[#F1F1F1] text-lg">SERVER_STATUS</span>
                  </div>
                  <span className="text-[#9be27d] text-sm font-mono animate-pulse">● ONLINE</span>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0f1c28]/50 p-4 rounded border border-[#2e3a44]">
                      <div className="text-[#B2A8A8] text-xs uppercase tracking-wider mb-1">Active Crew</div>
                      <div className="text-3xl font-heading font-bold text-[#79d0ff]">342</div>
                    </div>
                    <div className="bg-[#0f1c28]/50 p-4 rounded border border-[#2e3a44]">
                      <div className="text-[#B2A8A8] text-xs uppercase tracking-wider mb-1">Total Personnel</div>
                      <div className="text-3xl font-heading font-bold text-[#F1F1F1]">1,247</div>
                    </div>
                  </div>

                  <div className="relative h-48 bg-[#0f1c28] rounded border border-[#2e3a44] overflow-hidden group">
                    <Image 
                      src="https://static.wixstatic.com/media/a2d8da_85c83eab057c4caebe39aeeb5d9c5851~mv2.png?id=discord-preview"
                      alt="Server Preview"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-heading shadow-lg shadow-[#5865F2]/20"
                        onClick={() => window.open('https://discord.com', '_blank')}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Connect to Comms
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: opacityFade }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#79d0ff]/50"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Dive</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#79d0ff] to-transparent" />
        </motion.div>
      </section>
      {/* --- Narrative Transition --- */}
      <section className="relative py-32 px-6 border-t border-[#2e3a44] bg-[#0f1c28]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <div className="w-16 h-16 mx-auto bg-[#79d0ff]/10 rounded-full flex items-center justify-center mb-6 border border-[#79d0ff]/30">
              <Globe className="w-8 h-8 text-[#79d0ff]" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              <GlitchText text="THE FACILITY" />
            </h2>
            <p className="text-lg text-[#B2A8A8] leading-relaxed">
              Deep Station is not just a server; it is a living, breathing underwater metropolis. 
              From the high-pressure industrial docks to the bioluminescent gardens of the residential sectors, 
              every channel is a location, every role is a purpose.
            </p>
          </Reveal>
        </div>
      </section>
      {/* --- Game Modes (Simulation Modules) --- */}
      <section id="modes" className="relative py-32 px-6 overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Image 
            src="https://static.wixstatic.com/media/a2d8da_510d8dd666e543b596b95f1673db6f4b~mv2.png?id=modes-bg"
            alt="Texture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <Reveal>
            <div className="flex items-end justify-between mb-16 border-b border-[#2e3a44] pb-6">
              <div>
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-[#F1F1F1]">
                  SIMULATION <span className="text-[#79d0ff]">MODULES</span>
                </h2>
                <p className="text-[#B2A8A8] mt-2 font-mono text-sm">SELECT A PROTOCOL TO INITIALIZE</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-[#79d0ff] font-heading text-2xl font-bold">0{gameModes.length}</div>
                <div className="text-[#B2A8A8] text-xs uppercase">Active Modules</div>
              </div>
            </div>
          </Reveal>

          <Tabs value={selectedMode} onValueChange={setSelectedMode} className="w-full">
            <Reveal delay={100}>
              <TabsList className="w-full flex flex-wrap justify-start gap-4 bg-transparent h-auto p-0 mb-12">
                {gameModes.map((mode) => (
                  <TabsTrigger
                    key={mode._id}
                    value={mode._id}
                    className="group relative overflow-hidden bg-[#132a36]/50 border border-[#2e3a44] data-[state=active]:border-[#79d0ff] data-[state=active]:bg-[#79d0ff]/10 px-6 py-4 h-auto rounded-sm transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      {mode.icon ? (
                        <Image src={mode.icon} alt={mode.name || ''} className="w-6 h-6 object-contain" />
                      ) : (
                        <Cpu className="w-6 h-6 text-[#B2A8A8] group-data-[state=active]:text-[#79d0ff]" />
                      )}
                      <span className="font-heading font-bold text-[#F1F1F1] uppercase tracking-wider">{mode.name}</span>
                    </div>
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#79d0ff]/0 via-[#79d0ff]/5 to-[#79d0ff]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Reveal>

            <AnimatePresence mode="wait">
              {gameModes.map((mode) => (
                mode._id === selectedMode && (
                  <TabsContent key={mode._id} value={mode._id} className="mt-0 focus-visible:outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="grid lg:grid-cols-12 gap-8 lg:gap-16"
                    >
                      {/* Content Side */}
                      <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#79d0ff]" />
                            <h3 className="font-heading text-3xl font-bold text-[#F1F1F1]">{mode.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {mode.status && (
                              <span className={cn(
                                "px-2 py-1 text-[10px] font-bold uppercase tracking-widest border",
                                mode.status === 'active' ? "border-[#9be27d] text-[#9be27d]" : 
                                mode.status === 'beta' ? "border-[#e2c45d] text-[#e2c45d]" : "border-[#e85d4a] text-[#e85d4a]"
                              )}>
                                STATUS: {mode.status}
                              </span>
                            )}
                            {mode.maxPlayers && (
                              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-[#B2A8A8] text-[#B2A8A8]">
                                CAPACITY: {mode.maxPlayers}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-lg text-[#F1F1F1] font-medium leading-relaxed">
                          {mode.shortDescription}
                        </p>

                        <div className="bg-[#132a36]/30 p-6 border border-[#2e3a44] rounded-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-20">
                            <Terminal className="w-12 h-12" />
                          </div>
                          <h4 className="text-[#79d0ff] font-mono text-sm mb-3 uppercase tracking-wider">System_Description.log</h4>
                          <p className="text-[#B2A8A8] text-sm leading-relaxed whitespace-pre-line font-mono">
                            {mode.detailedDescription}
                          </p>
                        </div>

                        <Button className="w-full md:w-auto bg-[#79d0ff] hover:bg-[#79d0ff]/90 text-[#0f1c28] font-heading font-bold">
                          INITIALIZE {mode.name}
                        </Button>
                      </div>

                      {/* Visual Side */}
                      <div className="lg:col-span-7 relative h-[500px] group">
                        <div className="absolute inset-0 border border-[#79d0ff]/30 z-20 pointer-events-none">
                          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#79d0ff]" />
                          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#79d0ff]" />
                        </div>
                        
                        <div className="absolute inset-0 bg-[#0f1c28] z-0 overflow-hidden">
                          {mode.bannerImage ? (
                            <Image 
                              src={mode.bannerImage} 
                              alt={mode.name || ''} 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#132a36] to-[#0f1c28]">
                              <Waves className="w-32 h-32 text-[#79d0ff]/20" />
                            </div>
                          )}
                          {/* Scanline Overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                )
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>
      {/* --- Server Rules (Protocols) --- */}
      <section id="rules" className="relative py-32 px-6 bg-[#0b141d]">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Sticky Header for Rules */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <Reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-12 h-12 text-[#9be27d]" />
                    <h2 className="font-heading text-4xl font-bold text-[#F1F1F1]">
                      CORE <br /><span className="text-[#9be27d]">PROTOCOLS</span>
                    </h2>
                  </div>
                  <p className="text-[#B2A8A8] mb-8 leading-relaxed">
                    Compliance is mandatory. Failure to adhere to station protocols will result in immediate disciplinary action or expulsion from the facility.
                  </p>
                  
                  <div className="p-6 bg-[#9be27d]/5 border border-[#9be27d]/20 rounded-sm">
                    <div className="flex items-center gap-2 text-[#9be27d] mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-heading font-bold text-sm uppercase">Warning</span>
                    </div>
                    <p className="text-xs text-[#9be27d]/80 font-mono">
                      Automated moderation systems are active. All communications are monitored.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Rules List */}
            <div className="lg:col-span-8 space-y-4">
              {filteredRules.map((rule, index) => (
                <Reveal key={rule._id} delay={index * 50}>
                  <div className="group relative bg-[#132a36]/20 border border-[#2e3a44] hover:border-[#9be27d]/50 transition-colors duration-300 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2e3a44] group-hover:bg-[#9be27d] transition-colors duration-300" />
                    
                    <div className="p-6 md:p-8 pl-8">
                      <div className="flex items-baseline gap-4 mb-3">
                        <span className="font-mono text-[#9be27d] text-sm font-bold opacity-50 group-hover:opacity-100">
                          {String(rule.ruleNumber || index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-[#F1F1F1] group-hover:text-[#9be27d] transition-colors">
                          {rule.ruleTitle}
                        </h3>
                      </div>
                      
                      <p className="text-[#B2A8A8] leading-relaxed pl-8 mb-4">
                        {rule.ruleContent}
                      </p>

                      {rule.consequence && (
                        <div className="ml-8 mt-4 pt-4 border-t border-[#2e3a44] flex items-start gap-2">
                          <span className="text-[#e85d4a] text-xs font-bold uppercase tracking-wider mt-1">Consequence:</span>
                          <span className="text-[#e85d4a]/80 text-sm">{rule.consequence}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- Footer (System Footer) --- */}
      <footer className="relative bg-[#050a10] border-t border-[#2e3a44] pt-24 pb-12 px-6 overflow-hidden">
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#79d0ff] to-transparent opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-32 bg-[#79d0ff] blur-[100px] opacity-10 pointer-events-none" />

        <div className="max-w-[120rem] mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Anchor className="w-8 h-8 text-[#79d0ff]" />
                <span className="font-heading text-2xl font-bold text-[#F1F1F1]">DEEP STATION</span>
              </div>
              <p className="text-[#B2A8A8] max-w-md leading-relaxed">
                A premier underwater roleplay community. 
                Established 2025. 
                Operating at depth 4,000m.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social._id}
                    href={social.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#132a36] border border-[#2e3a44] flex items-center justify-center text-[#79d0ff] hover:bg-[#79d0ff] hover:text-[#050a10] transition-all duration-300 rounded-sm"
                  >
                    {social.platformIcon ? (
                      <Image src={social.platformIcon} alt={social.platformName || ''} className="w-5 h-5 object-contain" />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-[#F1F1F1] font-bold mb-6 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3">
                {['Modes', 'Rules', 'Contact', 'Bug Report'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Bug Report' ? '/bug-report' : `/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-[#B2A8A8] hover:text-[#79d0ff] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#2e3a44] group-hover:text-[#79d0ff] transition-colors" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-[#F1F1F1] font-bold mb-6 uppercase tracking-wider">System</h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm border-b border-[#2e3a44] pb-2">
                  <span className="text-[#B2A8A8]">Status</span>
                  <span className="text-[#9be27d] font-mono">ONLINE</span>
                </li>
                <li className="flex items-center justify-between text-sm border-b border-[#2e3a44] pb-2">
                  <span className="text-[#B2A8A8]">Version</span>
                  <span className="text-[#79d0ff] font-mono">v2.4.0</span>
                </li>
                <li className="flex items-center justify-between text-sm border-b border-[#2e3a44] pb-2">
                  <span className="text-[#B2A8A8]">Ping</span>
                  <span className="text-[#F1F1F1] font-mono">24ms</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2e3a44] text-xs text-[#B2A8A8]/50 font-mono">
            <p>© 2025 DEEP STATION. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED BY WIX VIBE ARCHITECT</p>
          </div>
        </div>
      </footer>
    </div>
  );
}