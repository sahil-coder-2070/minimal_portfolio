import { footerConfig } from '@/config/Footer';
import Container from '../layouts/Container';
import RepeatSeparator from '../ui/repeat-separator';
import TopBanner from '../ui/top-banner';

const Footer = () => {
  return (
    <>
      <RepeatSeparator />
      <Container className="py-16">
        <div className="flex flex-col items-center justify-center">
          <p className="text-secondary text-center text-sm">
            {footerConfig.text} <b>{footerConfig.developer}</b> <br /> &copy;{' '}
            {new Date().getFullYear()}. {footerConfig.copyright}
          </p>
        </div>
      </Container>
      <RepeatSeparator />
      <TopBanner />
    </>
  );
};

export default Footer;
