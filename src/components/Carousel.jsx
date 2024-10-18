import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Carousel = () => {
  const [posts, setPosts] = useState([]);  // Usando 'posts' já que o JSON tem essa chave
  const [loading, setLoading] = useState(true);  // Adiciona estado de carregamento
  const [error, setError] = useState(null);  // Adiciona estado de erro

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Atualize a URL para o db.json hospedado no GitHub
        const response = await axios.get('https://raw.githubusercontent.com/GuiRibeiro52/Brasfal-products/refs/heads/main/db.json');
        if (response.data && response.data.posts) {
          setPosts(response.data.posts);  // Acesse a chave 'posts' no JSON
        } else {
          setError('Produtos não encontrados.');
        }
        setLoading(false);  // Quando os dados forem carregados, desativa o estado de carregamento
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Erro ao carregar produtos');
        setLoading(false);  // Desativa o estado de carregamento mesmo em caso de erro
      }
    };

    fetchPosts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1000, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 500, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Verifica se há um erro
  if (error) {
    return <div>{error}</div>;
  }

  // Mostra uma mensagem de carregamento enquanto os produtos não são carregados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Verifica se posts é um array e tem elementos antes de usar .length
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>Nenhum produto encontrado</div>;
  }

  return (
    <div className="mx-auto">
      <Slider {...settings}>
        {posts.map((post, index) => (
          <div key={index} className="px-2"> 
            <Link to={`/produtos/${post.id}`}>
              <img src={post.images[0]} alt={post.title} className="w-full h-[300px] rounded-lg" />
            </Link>  
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
