import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import { Calendar as CalendarIcon, ArrowRight, MapPin, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useResourcesControl } from '../hooks/useResourcesControl';
import { useResourcesAnimations } from '../hooks/useResourcesAnimations';
import { DAILY_SCHEDULE, MONTHLY_GRID, MONTHLY_EVENTS, WEEKLY_DATA, EVENTS_DATA, PARTNER_ARTICLES } from '../constants/resourcesData';

const Resources = () => {
  const { 
    calendarView, setCalendarView, currentEventIndex, activeEvent,
    nextEvent, prevEvent, featureScrollIndex, nextFeature, prevFeature
  } = useResourcesControl();

  const { 
    containerRef, marqueeRef, eventCardRef, 
    handleCardMouseMove, handleCardMouseLeave 
  } = useResourcesAnimations();

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDF4DC] text-[#3A2618] overflow-x-hidden flex flex-col relative"
    >
      {/* --- GRAIN TEXTURE --- */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* --- BACKGROUND MARQUEE --- */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 w-[200vw] pointer-events-none opacity-[0.02] z-0 select-none overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap font-display text-[15vw] leading-none uppercase tracking-tighter text-[#3A2618]"
        >
          <span>Community • Growth • Connection • Rhythm • Tribe • </span>
          <span>Community • Growth • Connection • Rhythm • Tribe • </span>
        </div>
      </div>

      <Navbar />

      {/* --- HEADER (UPDATED LAYOUT) --- */}
      <div className="pt-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full relative z-10">
        {/* Flex container for side-by-side layout with equal vertical alignment */}
        <div className="page-title-group border-b border-[#3A2618]/20 pb-12 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16">
          {/* Title on the Left */}
          <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter text-[#3A2618] drop-shadow-lg shrink-0">
            Life at <span className="text-[#FDF4DC]">Espasyo</span>
          </h1>

          {/* Description on the Right (Right aligned text) */}
          <p className="font-body text-lg md:text-xl text-[#3A2618]/80 max-w-lg leading-relaxed md:text-right">
            From morning brew sessions to evening workshops, this is the
            heartbeat of our shared home. Find your rhythm, connect with the
            tribe, and see what’s cooking in the community today.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="flex-1 px-6 md:px-12 max-w-[1600px] mx-auto w-full mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT COLUMN: CALENDAR */}
          <div className="content-block h-full flex flex-col">
            <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
              <h2 className="font-display text-3xl uppercase tracking-widest text-[#FDF4DC]">
                Activity <br /> Calendar
              </h2>

              <div className="flex bg-[#3A2618]/10 rounded-full p-1 backdrop-blur-sm">
                {(["daily", "weekly", "monthly"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setCalendarView(view)}
                    className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${calendarView === view
                      ? "bg-[#3A2618] text-[#FDF4DC] shadow-md"
                      : "text-[#3A2618]/60 hover:text-[#3A2618]"
                      }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col flex-1 min-h-[400px]">
              {/* DAILY VIEW */}
              {calendarView === "daily" && (
                <div className="flex flex-col gap-0 border-l-2 border-[#FDF4DC]/30 pl-6 ml-3 py-2 animate-fade-in-up">
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest mb-6 text-[#FDF4DC]">
                    Today's Agenda
                  </h3>
                  {DAILY_SCHEDULE.map((item, idx) => (
                    <div key={idx} className="relative pb-8 group last:pb-0">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#FDF4DC] border-2 border-[#FDF4DC] group-hover:bg-[#FDF4DC] transition-colors z-10 scale-100 group-hover:scale-125 duration-300" />
                      <div className="bg-[#3A2618]/5 border border-[#3A2618]/10 p-4 rounded-xl hover:bg-[#3A2618]/10 hover:border-[#3A2618]/20 transition-all cursor-default backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-display text-lg font-bold text-[#3A2618]">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-bold uppercase bg-[#FDF4DC] text-[#FDF4DC] px-2 py-0.5 rounded-full">
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs opacity-60 font-mono">
                          <span>{item.time}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* WEEKLY VIEW */}
              {calendarView === "weekly" && (
                <div className="flex flex-col gap-4 animate-fade-in-up">
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest mb-2 text-[#FDF4DC]">
                    This Week
                  </h3>
                  {WEEKLY_DATA.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-6 p-5 border border-[#3A2618]/10 rounded-xl hover:bg-[#3A2618]/5 transition-all duration-300 cursor-default backdrop-blur-sm"
                    >
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#3E4A35] rounded-lg group-hover:bg-[#FDF4DC] transition-colors shadow-inner">
                        <span className="font-display text-[10px] uppercase tracking-wider opacity-80 group-hover:text-[#FDF4DC]">
                          {item.day}
                        </span>
                        <span className="font-display text-2xl font-bold group-hover:text-[#FDF4DC]">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl uppercase tracking-tight mb-1 group-hover:text-[#FDF4DC] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs font-body opacity-60">
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {item.time}
                          </span>
                          <span className="w-1 h-1 bg-[#3A2618] rounded-full" />
                          <span>{item.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MONTHLY VIEW */}
              {calendarView === "monthly" && (
                <div className="bg-[#3A2618]/5 border border-[#3A2618]/10 rounded-2xl p-6 animate-fade-in-up backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-bold uppercase tracking-widest text-[#3A2618]">
                      March 2026
                    </h3>
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FDF4DC]"></span>
                      <span className="text-[10px] uppercase tracking-widest opacity-60">
                        Has Event
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                      <div
                        key={d}
                        className="text-center text-xs font-bold opacity-40 py-2"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {MONTHLY_GRID.map((date, idx) => {
                      const events =
                        MONTHLY_EVENTS[date as keyof typeof MONTHLY_EVENTS];
                      const hasEvent = events && events.length > 0;

                      return (
                        <div
                          key={idx}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center relative text-sm group
                                                ${date === 0 ? "invisible" : "bg-[#3E4A35]/50 hover:bg-[#FDF4DC] hover:text-[#FDF4DC] cursor-pointer transition-colors"}
                                                ${hasEvent ? "border border-[#FDF4DC] shadow-[0_0_10px_rgba(212,163,115,0.2)]" : ""}
                                            `}
                        >
                          <span
                            className={hasEvent ? "font-bold" : "opacity-70"}
                          >
                            {date}
                          </span>
                          {hasEvent && (
                            <div className="w-1 h-1 bg-[#FDF4DC] rounded-full mt-1 group-hover:bg-[#FDF4DC]"></div>
                          )}

                          {/* Tooltip */}
                          {hasEvent && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-48 animate-scale-up origin-bottom">
                              <div className="bg-[#FDF4DC] border border-[#FDF4DC]/30 text-[#3A2618] text-xs rounded-lg p-3 shadow-2xl relative">
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FDF4DC] border-b border-r border-[#FDF4DC]/30 rotate-45"></div>
                                <div className="flex flex-col gap-2">
                                  {events.map((evt, i) => (
                                    <div
                                      key={i}
                                      className="border-b border-[#3A2618]/10 last:border-0 pb-1 last:pb-0"
                                    >
                                      <div className="font-bold text-[#FDF4DC] mb-0.5">
                                        {evt.title}
                                      </div>
                                      <div className="flex justify-between opacity-70 text-[10px]">
                                        <span>{evt.time}</span>
                                        <span className="uppercase">
                                          {evt.type}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: EVENTS CAROUSEL */}
          <div className="content-block h-full flex flex-col perspective-1000">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl uppercase tracking-widest text-[#FDF4DC]">
                Upcoming <br /> Events
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={prevEvent}
                  className="w-10 h-10 border border-[#3A2618]/20 rounded-full flex items-center justify-center hover:bg-[#3A2618] hover:text-[#FDF4DC] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextEvent}
                  className="w-10 h-10 border border-[#3A2618]/20 rounded-full flex items-center justify-center hover:bg-[#3A2618] hover:text-[#FDF4DC] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={eventCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl group border border-[#3A2618]/10 min-h-[400px] transform-style-3d transition-transform"
            >
              <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
                <img
                  key={activeEvent.image}
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDF4DC] via-[#FDF4DC]/40 to-transparent" />
              </div>

              <div
                key={activeEvent.id}
                className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-start animate-fade-in-up transform translate-z-10"
              >
                <div className="bg-[#FDF4DC] text-[#FDF4DC] font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 shadow-lg flex items-center gap-2">
                  <CalendarIcon size={12} /> {activeEvent.date}
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-[#3A2618] uppercase tracking-tighter mb-4 leading-[0.9] drop-shadow-md">
                  {activeEvent.title}
                </h3>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#FDF4DC] mb-8">
                  <MapPin size={16} /> {activeEvent.location}
                </div>
              </div>

              <div className="absolute top-8 right-8 flex gap-2">
                {EVENTS_DATA.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentEventIndex
                      ? "bg-[#FDF4DC] w-6"
                      : "bg-[#3A2618]/30"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- PARTNER STORIES (CAROUSEL) --- */}
        {false && (
          <div className="features-section mt-24 border-t border-[#3A2618]/20 pt-16 relative z-10">
            <div className="flex items-center justify-between mb-10 px-4">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[#FDF4DC] mb-2">
                  Featured Stories
                </h3>
                <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-[#3A2618]">
                  Community Articles
                </h2>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevFeature}
                  className="w-12 h-12 border border-[#3A2618]/20 rounded-full flex items-center justify-center hover:bg-[#3A2618] hover:text-[#FDF4DC] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextFeature}
                  className="w-12 h-12 border border-[#3A2618]/20 rounded-full flex items-center justify-center hover:bg-[#3A2618] hover:text-[#FDF4DC] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="feature-carousel overflow-hidden w-full px-4">
              <div
                className="flex gap-8 transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1)"
                style={{
                  transform: `translateX(-${featureScrollIndex * 340}px)`,
                }}
              >
                {PARTNER_ARTICLES.map((article, idx) => (
                  <div
                    key={idx}
                    className="min-w-[300px] md:min-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer border border-[#3A2618]/10 hover:border-[#FDF4DC]/50 transition-colors"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDF4DC] via-[#FDF4DC]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start transform transition-transform duration-500 group-hover:-translate-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FDF4DC] mb-2 bg-[#FDF4DC]/80 backdrop-blur-md px-2 py-1 rounded border border-[#FDF4DC]/20">
                        {article.category} • {article.business}
                      </span>
                      <h4 className="font-display text-xl uppercase leading-tight mb-3 text-[#3A2618] group-hover:text-[#FDF4DC] transition-colors">
                        {article.title}
                      </h4>
                      <p className="font-body text-xs text-[#3A2618]/70 leading-relaxed mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FDF4DC] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        Read Article <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER COMPONENT --- */}
      <Footer />
    </div>
  );
};

export default Resources;