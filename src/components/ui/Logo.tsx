import React from 'react';
import { useThemeStore } from '@/stores/themeStore';

// Import all logos
import logoPoltek from '@/assets/images/poltek_baja.png';
import logoLibraryLight from '@/assets/images/logo_perpustakaan_light.png';
import logoLibraryDark from '@/assets/images/logo_perpustakaan_dark.png';

interface LogoProps {
    /**
     * Type of logo to display
     * - library: App logo (auto-switches light/dark based on theme)
     * - institutional: Poltek Baja logo (always same)
     * - both: Show both logos side by side
     */
    type?: 'library' | 'institutional' | 'both';

    /**
     * Size of the logo
     * - xs: 24px height (for favicons, small buttons)
     * - sm: 32px height (for mobile navbar, dual branding)
     * - md: 40px height (default, desktop navbar)
     * - lg: 60px height (for page headers)
     * - xl: 80px height (for medium displays)
     * - 2xl: 128px height (for large hero sections)
     * - 3xl: 160px height (for landing pages)
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

    /**
     * Additional CSS classes
     */
    className?: string;

    /**
     * Alt text for accessibility
     */
    alt?: string;

    /**
     * Show with text branding
     */
    withText?: boolean;

    /**
     * Text to display (only if withText is true)
     */
    text?: {
        primary?: string;
        secondary?: string;
    };
}

const sizeMap = {
    xs: 'h-6',      // 24px
    sm: 'h-8',      // 32px
    md: 'h-10',     // 40px
    lg: 'h-15',     // 60px
    xl: 'h-20',     // 80px
    '2xl': 'h-32',  // 128px
    '3xl': 'h-40',  // 160px
};

/**
 * Logo Component
 * 
 * Displays application and institutional logos with automatic dark mode support.
 * 
 * @example
 * // Library logo with auto dark mode
 * <Logo type="library" size="md" />
 * 
 * @example
 * // Institutional logo
 * <Logo type="institutional" size="lg" />
 * 
 * @example
 * // Both logos side by side
 * <Logo type="both" size="sm" />
 * 
 * @example
 * // With text branding
 * <Logo type="both" size="md" withText text={{ primary: "Perpustakaan PBJT", secondary: "Library System" }} />
 */
export const Logo: React.FC<LogoProps> = ({
    type = 'library',
    size = 'md',
    className = '',
    alt,
    withText = false,
    text = {
        primary: 'Perpustakaan PBJT',
        secondary: 'Library System'
    },
}) => {
    const { isDarkMode } = useThemeStore();
    const sizeClass = sizeMap[size];

    // Determine which logo(s) to show
    const getLogos = () => {
        switch (type) {
            case 'institutional':
                return (
                    <img
                        src={logoPoltek}
                        alt={alt || 'Politeknik Baja Tegal'}
                        className={`${sizeClass} w-auto object-contain ${className}`}
                    />
                );

            case 'library':
                return (
                    <img
                        src={isDarkMode ? logoLibraryDark : logoLibraryLight}
                        alt={alt || 'Perpustakaan Digital PBJT'}
                        className={`${sizeClass} w-auto object-contain ${className}`}
                    />
                );

            case 'both':
                const institutionalSize = size === 'md' ? 'sm' : size; // Slightly smaller for institutional when both
                const institutionalClass = sizeMap[institutionalSize as keyof typeof sizeMap];

                return (
                    <div className={`flex items-center gap-2 ${className}`}>
                        <img
                            src={logoPoltek}
                            alt="Politeknik Baja Tegal"
                            className={`${institutionalClass} w-auto object-contain`}
                        />
                        <img
                            src={isDarkMode ? logoLibraryDark : logoLibraryLight}
                            alt="Perpustakaan Digital PBJT"
                            className={`${sizeClass} w-auto object-contain`}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    if (withText) {
        return (
            <div className="flex items-center gap-3">
                {getLogos()}
                <div className="flex-1">
                    {text.primary && (
                        <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">
                            {text.primary}
                        </h1>
                    )}
                    {text.secondary && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {text.secondary}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return getLogos();
};

// Export specific logo type components for convenience
export const LibraryLogo: React.FC<Omit<LogoProps, 'type'>> = (props) => (
    <Logo {...props} type="library" />
);

export const InstitutionalLogo: React.FC<Omit<LogoProps, 'type'>> = (props) => (
    <Logo {...props} type="institutional" />
);

export const DualLogo: React.FC<Omit<LogoProps, 'type'>> = (props) => (
    <Logo {...props} type="both" />
);
