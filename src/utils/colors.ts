/**
 * Color utility classes for Tailwind CSS
 * Using arbitrary values to ensure colors work correctly
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
    primary: 'bg-[#6D00FF]',
    secondary: 'bg-[#00FFA5]',
    logo: 'text-[#3B82F6]',
  },
  status: {
    live: 'bg-[#10B981] text-[#10B981]',
    ft: 'bg-[#EF4444] text-[#EF4444]',
    ht: 'bg-[#F59E0B] text-[#F59E0B]',
    scheduled: 'text-[#6B7280]',
  },
  button: {
    active: 'bg-[#10B981]',
    activeText: 'text-[#FFFFFF]',
    hover: 'bg-[#059669]',
  },
  border: {
    primary: 'border-[#2A2A2A]',
    secondary: 'border-[#1F1F1F]',
  },
} as const;

