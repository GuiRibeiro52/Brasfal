import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="flex bg-footercolor items-center justify-center gap-5 p-10">
        <div className="container mx-auto text-center">
          <p className="text-white opacity-70 mb-4 md:px-36 lg:px-80">©2024 - BrasFal | Todos os direitos reservados | Desenvolvido por <Link to="https://guiribeiro52.github.io/">Guilherme Ribeiro.</Link></p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  
