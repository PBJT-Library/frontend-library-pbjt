import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { BrandPanel } from './BrandPanel';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    // Subtle parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
            const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const onSubmit = async (_data: RegisterFormData) => {
        try {
            // Simulate registration
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Pendaftaran berhasil! Silakan login.');
            navigate('/login');
        } catch (error) {
            toast.error('Pendaftaran gagal. Silakan coba lagi.');
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-slate-100">
            {/* Subtle Parallax Background Layers */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Layer 1 - Soft Gradient Shapes */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                        transition: 'transform 0.5s ease-out'
                    }}
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-200 to-blue-100 rounded-full blur-3xl" />
                </div>

                {/* Layer 2 - Abstract Waves */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                        <path d="M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z" fill="rgba(191, 219, 254, 0.3)" />
                    </svg>
                </div>

                {/* Layer 3 - Subtle Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgb(71, 85, 105) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(71, 85, 105) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                        transition: 'transform 0.6s ease-out'
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
                {/* Unified Card Container */}
                <div className="w-full max-w-6xl animate-fade-in">
                    <div
                        className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col"
                        style={{
                            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
                            minHeight: '75vh'
                        }}
                    >
                        <div className="grid lg:grid-cols-2 flex-1">
                            {/* LEFT SECTION - Register Form (SWAPPED) */}
                            <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1 overflow-y-auto">
                                <div className="max-w-md mx-auto w-full">
                                    {/* Form Header */}
                                    <div className="mb-6 animate-fade-in">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                            Daftar Akun Baru
                                        </h2>
                                        <p className="text-slate-600">
                                            Lengkapi formulir untuk membuat akun
                                        </p>
                                    </div>

                                    {/* Register Form */}
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        {/* Name Input */}
                                        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                disabled={isSubmitting}
                                                className={`
                                                    w-full px-4 py-3 
                                                    bg-slate-50 border-2 ${errors.name ? 'border-red-500' : 'border-slate-200'}
                                                    rounded-xl 
                                                    text-slate-900 placeholder-slate-400
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                    transition-all duration-300 ease-in-out
                                                    hover:border-slate-300 hover:bg-white hover:shadow-sm
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                `}
                                                placeholder="Nama lengkap Anda"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600 mt-1 animate-fade-in">{errors.name.message}</p>
                                            )}
                                        </div>

                                        {/* Username Input */}
                                        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.15s' }}>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                {...register('username')}
                                                disabled={isSubmitting}
                                                className={`
                                                    w-full px-4 py-3 
                                                    bg-slate-50 border-2 ${errors.username ? 'border-red-500' : 'border-slate-200'}
                                                    rounded-xl 
                                                    text-slate-900 placeholder-slate-400
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                    transition-all duration-300 ease-in-out
                                                    hover:border-slate-300 hover:bg-white hover:shadow-sm
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                `}
                                                placeholder="Pilih username unik"
                                            />
                                            {errors.username && (
                                                <p className="text-sm text-red-600 mt-1 animate-fade-in">{errors.username.message}</p>
                                            )}
                                        </div>

                                        {/* Password Input */}
                                        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...register('password')}
                                                    disabled={isSubmitting}
                                                    className={`
                                                        w-full px-4 py-3 pr-12
                                                        bg-slate-50 border-2 ${errors.password ? 'border-red-500' : 'border-slate-200'}
                                                        rounded-xl 
                                                        text-slate-900 placeholder-slate-400
                                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                        transition-all duration-300 ease-in-out
                                                        hover:border-slate-300 hover:bg-white hover:shadow-sm
                                                        disabled:opacity-50 disabled:cursor-not-allowed
                                                    `}
                                                    placeholder="Minimal 6 karakter"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                                                    disabled={isSubmitting}
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <EyeSlashIcon className="w-5 h-5" />
                                                    ) : (
                                                        <EyeIcon className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-sm text-red-600 mt-1 animate-fade-in">{errors.password.message}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password Input */}
                                        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.25s' }}>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Konfirmasi Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    {...register('confirmPassword')}
                                                    disabled={isSubmitting}
                                                    className={`
                                                        w-full px-4 py-3 pr-12
                                                        bg-slate-50 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'}
                                                        rounded-xl 
                                                        text-slate-900 placeholder-slate-400
                                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                        transition-all duration-300 ease-in-out
                                                        hover:border-slate-300 hover:bg-white hover:shadow-sm
                                                        disabled:opacity-50 disabled:cursor-not-allowed
                                                    `}
                                                    placeholder="Ulangi password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                                                    disabled={isSubmitting}
                                                    tabIndex={-1}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeSlashIcon className="w-5 h-5" />
                                                    ) : (
                                                        <EyeIcon className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="text-sm text-red-600 mt-1 animate-fade-in">{errors.confirmPassword.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="
                                                w-full py-4 px-6
                                                bg-gradient-to-r from-blue-600 to-blue-700
                                                text-white font-semibold text-base
                                                rounded-xl
                                                shadow-lg shadow-blue-500/30
                                                hover:shadow-xl hover:shadow-blue-500/40
                                                hover:from-blue-700 hover:to-blue-800
                                                hover:-translate-y-0.5
                                                active:scale-[0.98]
                                                transition-all duration-300 ease-out
                                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                                mt-6
                                                animate-fade-in
                                            "
                                            style={{ animationDelay: '0.3s' }}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Memproses...
                                                </span>
                                            ) : (
                                                'Daftar'
                                            )}
                                        </button>

                                        {/* Login Link */}
                                        <div className="mt-4 text-center animate-fade-in" style={{ animationDelay: '0.35s' }}>
                                            <p className="text-sm text-slate-600">
                                                Sudah punya akun?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/login')}
                                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                                                >
                                                    Masuk sekarang
                                                </button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* RIGHT SECTION - Branding (SWAPPED) */}
                            <div className="order-1 lg:order-2">
                                <BrandPanel mousePosition={mousePosition} />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-600 mt-6">
                        © {new Date().getFullYear()} Perpustakaan Digital. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};
