import React from 'react';

const VillageMap: React.FC = () => {
    const villages = [
        { name: 'Village Alpha', points: 12500, x: 20, y: 30 },
        { name: 'Village Beta', points: 11800, x: 60, y: 20 },
        { name: 'Village Gamma', points: 10200, x: 40, y: 50 },
        { name: 'Village Delta', points: 9500, x: 75, y: 60 },
        { name: 'Village Epsilon', points: 8900, x: 15, y: 70 },
    ];

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            {/* Stylized Map SVG Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Rivers/Paths */}
                <path d="M 10,50 Q 30,30 50,50 T 90,40" stroke="#6200EE" strokeWidth="0.5" fill="none" opacity="0.3" />
                <path d="M 20,80 Q 40,60 60,70 T 85,75" stroke="#6200EE" strokeWidth="0.5" fill="none" opacity="0.3" />

                {/* Hills/Terrain */}
                <ellipse cx="30" cy="40" rx="15" ry="10" fill="#FF9100" opacity="0.1" />
                <ellipse cx="70" cy="30" rx="20" ry="12" fill="#FF9100" opacity="0.1" />
                <ellipse cx="50" cy="65" rx="18" ry="11" fill="#6200EE" opacity="0.1" />
            </svg>

            {/* Village Markers */}
            {villages.map((village, index) => (
                <div
                    key={village.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${village.x}%`, top: `${village.y}%` }}
                >
                    {/* Village Icon */}
                    <div className="relative">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-brand-purple to-brand-orange rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                            <span className="text-2xl md:text-3xl">🏘️</span>
                        </div>

                        {/* Points Badge */}
                        <div className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-black px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                            {(village.points / 1000).toFixed(1)}k
                        </div>
                    </div>

                    {/* Village Info Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl shadow-xl border-2 border-brand-purple whitespace-nowrap">
                            <p className="font-black text-brand-purple dark:text-white text-sm">{village.name}</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">{village.points.toLocaleString()} points</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <p className="text-xs font-bold text-brand-purple dark:text-white mb-2">Village Standings</p>
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                    <span className="text-zinc-700 dark:text-zinc-300">Active Villages</span>
                </div>
            </div>
        </div>
    );
};

export default VillageMap;
