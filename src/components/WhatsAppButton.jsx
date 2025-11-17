import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const phoneNumber = "+221XXXXXXXXX"; // Remplace par le vrai numéro
  const message = "Bonjour SkyBlue, je souhaite en savoir plus sur les dons.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Contactez-nous sur WhatsApp"
    >
      {/* Logo WhatsApp officiel en SVG */}
      <svg 
        viewBox="0 0 32 32" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.245 1.407 1.405-5.24-0.322-0.532c-1.318-2.151-2.011-4.63-2.011-7.173 0-7.444 6.056-13.5 13.5-13.5s13.5 6.056 13.5 13.5c0 7.444-6.056 13.5-13.5 13.5z"/>
        <path d="M22.75 19.25c-0.293-0.146-1.727-0.854-1.995-0.951-0.267-0.098-0.461-0.146-0.656 0.146s-0.754 0.951-0.925 1.146c-0.171 0.195-0.342 0.22-0.635 0.073-0.293-0.146-1.237-0.456-2.356-1.453-0.871-0.777-1.458-1.737-1.629-2.030s-0.018-0.451 0.128-0.597c0.131-0.131 0.293-0.342 0.439-0.513s0.195-0.293 0.293-0.488c0.098-0.195 0.049-0.366-0.024-0.513s-0.656-1.582-0.9-2.167c-0.236-0.569-0.476-0.492-0.656-0.501-0.17-0.008-0.364-0.010-0.558-0.010s-0.513 0.073-0.781 0.366c-0.269 0.293-1.025 1.001-1.025 2.442s1.049 2.833 1.195 3.028c0.146 0.195 2.064 3.148 5 4.417 0.698 0.301 1.243 0.481 1.667 0.616 0.701 0.222 1.339 0.191 1.843 0.116 0.562-0.084 1.727-0.706 1.971-1.388s0.244-1.267 0.171-1.388c-0.073-0.122-0.269-0.195-0.562-0.342z"/>
      </svg>
      
      <span className={styles.tooltip}>Contactez-nous sur WhatsApp</span>
    </a>
  );
}