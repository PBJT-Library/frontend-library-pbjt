import React from 'react';
import { BookOpenIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Logo } from '@/components/ui';

interface BrandPanelProps {
    mousePosition: { x: number; y: number };
}

export const BrandPanel: React.FC<BrandPanelProps> = ({ mousePosition }) => {
    return (
        <div
            className="bg-gradient-to-br from-blue-700 via-blue-600 to-slate-800 flex flex-col justify-center items-center overflow-hidden h-full relative"
            style={{
                transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                transition: 'transform 0.4s ease-out'
            }}
        >
            {/* Subtle Geometric Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            {/* Abstract Book Pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="books" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="2" y="2" width="6" height="8" fill="white" />
                        <rect x="10" y="4" width="6" height="8" fill="white" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#books)" />
                </svg>
            </div>

            {/* Content - Centered with Institutional Hierarchy */}
            <div className="relative z-10 text-white px-12 py-12 text-center">

                {/* Institutional Logo - PRIMARY */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-2xl p-4">
                        <Logo
                            type="institutional"
                            size="2xl"
                            className="drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Institution Name */}
                <h1 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                    Politeknik Baja Tegal
                </h1>

                {/* Subtitle */}
                <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed font-light">
                    Sistem Perpustakaan Digital
                </p>

                {/* Decorative Divider */}
                <div className="w-24 h-1 bg-blue-400 rounded-full mb-8 mx-auto" />

                {/* App Logo - SECONDARY */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Logo
                            type="library"
                            size="lg"
                            className="opacity-80"
                        />
                    </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 text-blue-100">
                    <div className="flex items-center justify-center gap-3">
                        <BookOpenIcon className="w-5 h-5" />
                        <span className="text-sm">Koleksi Digital Terintegrasi</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <UserGroupIcon className="w-5 h-5" />
                        <span className="text-sm">Manajemen Anggota</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <AcademicCapIcon className="w-5 h-5" />
                        <span className="text-sm">Akses Mudah & Cepat</span>
                    </div>
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
    );
};
