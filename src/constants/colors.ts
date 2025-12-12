
export const colors = {
  background: {
    primary: '#0F0F0F',      
    secondary: '#1A1A1A',     
    card: '#1E1E1E',          
    hover: '#252525',         
  },

  text: {
    primary: '#FFFFFF',      
    secondary: '#B3B3B3',     
    tertiary: '#808080',      
    disabled: '#4A4A4A',      
  },

  brand: {
    primary: '#6D00FF',      
    secondary: '#00FFA5',     
    logo: '#3B82F6',          
  },

  status: {
    live: '#10B981',          
    liveIndicator: '#10B981', 
    fullTime: '#EF4444',      
    halfTime: '#F59E0B',      
    scheduled: '#6B7280',     
    aggregate: '#10B981',     
    penalty: '#10B981',       
  },

  button: {
    active: '#10B981',        
    activeText: '#FFFFFF',    
    inactive: 'transparent',  
    inactiveText: '#B3B3B3',  
    hover: '#059669',         
  },

  border: {
      primary: '#2A2A2A',       
    secondary: '#1F1F1F',    
    divider: '#2A2A2A',       
  },

  accent: {
    highlight: '#10B981',     
    warning: '#F59E0B',       
    error: '#EF4444',         
    info: '#3B82F6',          
  },
} as const;

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

