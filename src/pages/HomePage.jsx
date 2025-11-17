import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WhySupport from '../components/WhySupport';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Stats />
      <WhySupport />
      <Testimonials />
      <ContactForm />
    </div>
  );
}