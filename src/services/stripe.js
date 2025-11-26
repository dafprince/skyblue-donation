import { loadStripe } from '@stripe/stripe-js';

// Charger Stripe avec la clé publique
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;