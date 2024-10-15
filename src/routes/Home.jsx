import Carousel from "../components/Carousel"
import banner from "../assets/banner.png"
import living from '../assets/living.png'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-24 text-white">
      <div className="grid grid-cols-1 md:flex md:justify-between md:items-center">
        <div className="md:w-[900px] h-[500px] flex flex-col items-center justify-center gap-10">
          <h1 className="text-[52px] font-bold text-center">
            Suportes Brasfal
          </h1>
          <h2 className="text-[40px] font-semibold text-center">Conforto e segurança para seu ambiente.</h2>
        </div>
        <div>
          <img src={banner} alt="banner"/>          
        </div>
      </div>
      <div className="my-16">
        <h2 className="text-[40px] font-bold text-center">Estabilidade e estilo em cada detalhe.</h2>
      </div>
      <Carousel/>
      <div className="grid grid-cols-1 px-4 gap-12 xl:flex xl:justify-center mt-[110px] xl:text-xl xl:font-normal xl:gap-12" id="quem-somos">
        <div className="flex items-center justify-center flex-col gap-12 text-justify">
          <h2 className="text-[52px] font-bold text-center">Quem somos nós?</h2>
          <h2 className="xl:w-[500px] 2xl:w-[800px]">
            A Brasfal é uma empresa comprometida em oferecer soluções de alta qualidade para suportes de TV e monitores, focando sempre na segurança e no conforto dos seus clientes. Com uma linha de produtos diversificada, a Brasfal se destaca pela durabilidade e robustez de seus suportes, garantindo a estabilidade necessária para suas telas, independentemente do ambiente. Cada suporte é projetado com um design moderno e funcional, pensado para otimizar o espaço e proporcionar uma experiência de visualização superior. Além disso, a Brasfal prioriza a facilidade de instalação, oferecendo produtos que combinam praticidade com elegância. Seja em casa, no escritório ou em ambientes comerciais, a Brasfal é a escolha certa para quem busca confiabilidade e inovação em suportes de TV e monitores. Com a Brasfal, você pode confiar que seu entretenimento está em boas mãos.
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <img src={living} alt="living" className="xl:max-w-[600px] rounded-lg"/>
        </div>        
        
      </div>
    </div>
  )
}

export default Home