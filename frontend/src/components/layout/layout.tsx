import Footer from '@components/layout/footer/footer';
import Header from '@components/layout/header/header-five';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import HighlightedBarComponent from './top-bar/highlighted-bar';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HighlightedBarComponent />

      <Header />

      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
