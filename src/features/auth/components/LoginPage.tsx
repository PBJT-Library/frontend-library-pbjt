import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { BrandPanel } from './BrandPanel';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rememberMe, setRememberMe] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
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

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.username, data.password);
            toast.success('Selamat datang kembali!');
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = (error as Error).message;

            // Check if error is about user not found
            if (errorMessage.includes('not found') || errorMessage.includes('tidak ditemukan')) {
                toast.error('User tidak ditemukan. Silakan registrasi akun terlebih dahulu.', {
                    duration: 5000,
                    action: {
                        label: 'Register',
                        onClick: () => navigate('/register')
                    }
                });
            } else {
                toast.error(errorMessage || 'Username atau password salah. Silakan coba lagi.');
            }
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
                            {/* LEFT SECTION - Branding */}
                            <BrandPanel mousePosition={mousePosition} />

                            {/* RIGHT SECTION - Login Form */}
                            <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                                <div className="max-w-md mx-auto w-full">
                                    {/* Form Header */}
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                            Selamat Datang
                                        </h2>
                                        <p className="text-slate-600">
                                            Silakan masuk ke akun Anda
                                        </p>
                                    </div>

                                    {/* Login Form */}
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Username Input */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                autoComplete="username"
                                                {...register('username')}
                                                disabled={isSubmitting}
                                                className={`
                                                    w-full px-4 py-3.5 
                                                    bg-slate-50 border-2 ${errors.username ? 'border-red-500' : 'border-slate-200'}
                                                    rounded-xl 
                                                    text-slate-900 placeholder-slate-400
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                    transition-all duration-300 ease-in-out
                                                    hover:border-slate-300 hover:bg-white hover:shadow-sm
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                `}
                                                placeholder="Masukkan username Anda"
                                            />
                                            {errors.username && (
                                                <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                                            )}
                                        </div>

                                        {/* Password Input */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    autoComplete="current-password"
                                                    {...register('password')}
                                                    disabled={isSubmitting}
                                                    className={`
                                                        w-full px-4 py-3.5 pr-12
                                                        bg-slate-50 border-2 ${errors.password ? 'border-red-500' : 'border-slate-200'}
                                                        rounded-xl 
                                                        text-slate-900 placeholder-slate-400
                                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                        transition-all duration-300 ease-in-out
                                                        hover:border-slate-300 hover:bg-white hover:shadow-sm
                                                        disabled:opacity-50 disabled:cursor-not-allowed
                                                    `}
                                                    placeholder="••••••••"
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
                                                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                                            )}
                                        </div>

                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-slate-700">Ingat saya</span>
                                            </label>
                                            <button
                                                type="button"
                                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                            >
                                                Lupa password?
                                            </button>
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
                                                mt-8
                                            "
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
                                                'Masuk'
                                            )}
                                        </button>

                                        {/* Register Link */}
                                        <div className="mt-6 text-center">
                                            <p className="text-sm text-slate-600">
                                                Belum punya akun?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/register')}
                                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                                >
                                                    Daftar sekarang
                                                </button>
                                            </p>
                                        </div>

                                        {/* Demo Info */}
                                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                            <p className="text-sm text-blue-900 text-center">
                                                <span className="font-medium">Demo:</span> Masukkan username dan password (min. 6 karakter)
                                            </p>
                                        </div>
                                    </form>
                                </div>
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
