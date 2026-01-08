import React from 'react';
import { BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface BrandPanelProps {
    mousePosition: { x: number; y: number };
}

export const BrandPanel: React.FC<BrandPanelProps> = ({ mousePosition }) => {
    return (
        <div
            className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex flex-col justify-center overflow-hidden h-full"
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

            {/* Content - Centered with Padding */}
            <div className="relative z-10 text-white px-12 py-12">
                {/* Logo */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                        <BookOpenIcon className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    Perpustakaan<br />Digital
                </h1>

                {/* Subtitle */}
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                    Sistem Informasi Manajemen<br />Perpustakaan
                </p>

                {/* Decorative Divider */}
                <div className="w-20 h-1 bg-white/30 rounded-full mb-8" />

                {/* Additional Info */}
                <div className="space-y-3 text-blue-100">
                    <div className="flex items-center gap-3">
                        <AcademicCapIcon className="w-5 h-5" />
                        <span className="text-sm">Akses Koleksi Digital</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <BookOpenIcon className="w-5 h-5" />
                        <span className="text-sm">Manajemen Peminjaman</span>
                    </div>
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
    );
};
