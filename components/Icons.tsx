import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => (
  <img 
    src="/AJ.png" 
    alt="AJ STUDIOZ" 
    className={className}
  />
);

export const Location404Icon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const FigmaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 38 57" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5V57H9.5C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H9.5C6.98044 19 4.56408 17.9991 2.78249 16.2175C1.00089 14.4359 0 12.0196 0 9.5C0 6.98044 1.00089 4.56408 2.78249 2.78249C4.56408 1.00089 6.98044 0 9.5 0H19Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 25.9804 1.00089 23.5641 2.78249 21.7825C4.56408 20.0009 6.98044 19 9.5 19H19V38H9.5C6.98044 38 4.56408 36.9991 2.78249 35.2175C1.00089 33.4359 0 31.0196 0 28.5Z" fill="#A259FF"/>
    <path d="M19 0H28.5C31.0196 0 33.4359 1.00089 35.2175 2.78249C36.9991 4.56408 38 6.98044 38 9.5C38 12.0196 36.9991 14.4359 35.2175 16.2175C33.4359 17.9991 31.0196 19 28.5 19H19V0Z" fill="#FF7262"/>
  </svg>
);
