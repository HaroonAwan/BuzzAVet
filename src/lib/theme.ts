/**
 * Centralized theme configuration for form inputs and UI components
 * All color values must be imported from this file - hardcoded colors are forbidden
 */

export const theme = {
  colors: {
    // Form input states
    active: '#020409', // Black - default active/focused state
    error: '#DC2626', // Red - error state
    warning: '#EAB308', // Yellow - warning state
    success: '#16A34A', // Green - success state
    surface: '#FFFFFF', // White - general surface/background
    mutedBorder: '#D1D5DB', // Gray-300 - muted border for inactive radios

    // Form input defaults
    defaultBorder: '#E5E7EB', // Light gray - default border when not focused/disabled
    disabledBackground: '#E5E7EB', // Light gray - background when disabled
    placeholder: '#9CA3AF', // Gray - placeholder text color

    // Text colors
    text: {
      default: '#020409', // Black - default text color
      secondary: '#4B5563', // Gray-600 - secondary text color
      tertiary: '#6B7280', // Gray-500 - tertiary text color
      muted: '#9CA3AF', // Gray-400 - muted text color
      error: '#DC2626', // Red - error text color
      warning: '#EAB308', // Yellow - warning text color
      success: '#16A34A', // Green - success text color
      normal: '#0284C7', // Blue - normal informational text color for chips
      link: '#2563EB', // Blue-600 - link color
      linkHover: '#1D4ED8', // Blue-700 - link hover color
      dark: '#1F2937', // Gray-800 - dark text color
    },

    // Special colors
    special: {
      verifiedBadge: '#FEC717', // Yellow - verified badge background
      successIcon: '#16A34A', // Green-600 - success icon color
    },

    // Background colors
    background: {
      default: '#FFFFFF', // White - default background
      secondary: '#F9FAFB', // Gray-50 - secondary background
      tertiary: '#F3F4F6', // Gray-100 - tertiary background
      muted: '#E5E7EB', // Gray-200 - muted background
      range: '#0BA0A1', // Teal-400 - range background
      dark: '#1F2937', // Gray-800 - dark background for modals/overlays
      successLight: '#D1FAE5', // Green-100 - light success background
      placeholder: '#D1D5DB', // Gray-300 - placeholder background
      lightGreen: '#ECFDF5', // Green-100 - light green background
      lime: '#CCFBF1', // Green-100 - light green background
      lightPurple: '#F5F3FF',
      teal: '#F0FDFA',
      lightBlue: '#EEF2FF',
    },

    // Border colors
    border: {
      default: '#E5E7EB', // Gray-200 - default border
      secondary: '#D1D5DB', // Gray-300 - secondary border
      dark: '#111827', // Gray-900 - dark border
    },

    // Chip background & text colors (used by Chip component)
    chip: {
      warning: {
        background: '#FEF2F2',
        text: '#DC2626', // Reuse error text for warning label
      },
      alert: {
        background: '#FEFCE8',
        text: '#EAB308', // Reuse warning text color
      },
      normal: {
        background: '#F0F9FF',
        text: '#0284C7', // Provided text-normal color
      },
      success: {
        background: '#F0FDF4',
        text: '#16A34A', // Reuse success text color
      },
      pink: {
        background: '#FDF2F8',
        text: '#EC4899', // Pink-600 - pink text color
      },
      info: {
        background: '#0BA0A1',
        text: '#FFFFFF', // White - info text color
      },
    },
  },
  fonts: {
    default: 'Poppins, sans-serif',
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  icons: {
    active: '#020409', // Black - active state
    default: '#020409', // Black - default state
    disabled: '#9CA3AF', // Gray - disabled state
  },
} as const;

export type Theme = typeof theme;
