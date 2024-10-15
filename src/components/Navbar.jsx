import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getLinkClasses = (path) => (
    `relative opacity-80 hover:opacity-100 transition-opacity duration-500 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full ${
      location.pathname === path ? 'before:w-full' : 'before:w-0'
    }`
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (event) => {
    if (location.pathname === '/') {
      event.preventDefault();
      document.getElementById('quem-somos').scrollIntoView({ behavior: 'smooth' });
      closeMenu(); // Fechar o menu se estiver no mobile
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 py-5 px-8 shadow-md md:px-20 md:gap-16 md:justify-evenly flex justify-between items-center">
      <div className="flex flex-start">
        <h2 className="text-black text-4xl font-bold">
          <Link to="/" onClick={scrollToTop}>BRASFAL</Link>
        </h2>
      </div>
      <div className="hidden md:flex gap-8 text-lg">
        <ul className="text-black flex gap-8 text-lg">
          <li>
            <Link to="/" onClick={scrollToTop} className={getLinkClasses("/")}>Home</Link>
          </li>
          <li>
            <Link to="/#quem-somos" onClick={handleScrollToSection} className={getLinkClasses("/#quem-somos")}>Empresa</Link>
          </li>
          <li>
            <Link to="/contato" className={getLinkClasses("/contato")}>Contato</Link>
          </li>
          <li>
            <Link to="/produtos" className={getLinkClasses("/produtos")}>Produtos</Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full bg-white border-l border-gray-200 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out w-1/2 md:hidden z-50`}
      >
        <ul className="flex flex-col gap-4 p-5 text-lg mt-20">
          <li>
            <Link to="/" onClick={() => { scrollToTop(); toggleMenu(); }} className={getLinkClasses("/")}>Home</Link>
          </li>
          <li>
            <Link to="/#quem-somos" onClick={handleScrollToSection} className={getLinkClasses("/#quem-somos")}>Empresa</Link>
          </li>
          <li>
            <Link to="/produtos" onClick={toggleMenu} className={getLinkClasses("/produtos")}>Produtos</Link>
          </li>
          <li>
            <Link to="/contato" onClick={toggleMenu} className={getLinkClasses("/contato")}>Contato</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
