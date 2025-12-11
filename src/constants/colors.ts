/**
 * Centralized color configuration for The Sports Hub
 * Based on the design system from the dashboard UI
 */

export const colors = {
  // Background colors
  background: {
    primary: '#0F0F0F',      // Main dark background
    secondary: '#1A1A1A',     // Secondary dark background
    card: '#1E1E1E',          // Card/container background
    hover: '#252525',         // Hover state background
  },

  // Text colors
  text: {
    primary: '#FFFFFF',       // Primary white text
    secondary: '#B3B3B3',     // Secondary gray text
    tertiary: '#808080',      // Tertiary muted text
    disabled: '#4A4A4A',      // Disabled text
  },

  // Brand colors
  brand: {
    primary: '#6D00FF',       // Primary purple
    secondary: '#00FFA5',     // Secondary green
    logo: '#3B82F6',          // Blue for logo
  },

  // Status colors
  status: {
    live: '#10B981',          // Green for live matches
    liveIndicator: '#10B981', // Green indicator bar
    fullTime: '#EF4444',      // Red for FT (Full Time)
    halfTime: '#F59E0B',      // Amber for HT (Half Time)
    scheduled: '#6B7280',     // Gray for scheduled matches
    aggregate: '#10B981',     // Green for aggregate/winner
    penalty: '#10B981',       // Green for penalty winner
  },

  // Button colors
  button: {
    active: '#10B981',        // Green for active button (All, Live, Favorites)
    activeText: '#FFFFFF',    // White text on active button
    inactive: 'transparent',  // Transparent for inactive buttons
    inactiveText: '#B3B3B3',  // Gray text for inactive buttons
    hover: '#059669',         // Darker green on hover
  },

  // Border colors
  border: {
    primary: '#2A2A2A',       // Primary border color
    secondary: '#1F1F1F',    // Secondary border color
    divider: '#2A2A2A',       // Divider lines
  },

  // Accent colors
  accent: {
    highlight: '#10B981',     // Green highlight
    warning: '#F59E0B',       // Amber warning
    error: '#EF4444',         // Red error
    info: '#3B82F6',          // Blue info
  },
} as const;

/**
 * Tailwind CSS color classes mapping
 * Use these for consistent color application
 */
export const colorClasses = {
  bg: {
    primary: 'bg-[#0F0F0F]',
    secondary: 'bg-[#1A1A1A]',
    card: 'bg-[#1E1E1E]',
    hover: 'bg-[#252525]',
  },
  text: {
    primary: 'text-[#FFFFFF]',
    secondary: 'text-[#B3B3B3]',
    tertiary: 'text-[#808080]',
    disabled: 'text-[#4A4A4A]',
  },
  brand: {
    primary: 'text-[#6D00FF]',
    secondary: 'text-[#00FFA5]',
    logo: 'text-[#3B82F6]',
  },
  status: {
    live: 'text-[#10B981]',
    fullTime: 'text-[#EF4444]',
    halfTime: 'text-[#F59E0B]',
    scheduled: 'text-[#6B7280]',
  },
  border: {
    primary: 'border-[#2A2A2A]',
    secondary: 'border-[#1F1F1F]',
  },
} as const;

