import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); 
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error loading product details.');
      }
    };

    fetchProduct();
    window.scrollTo(0, 0); 
  }, [id]);

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <div className='container px-5 mx-auto font-poppins justify-center mt-32 xl:flex'>
        <div className='flex flex-col-reverse justify-center gap-[30px] 2xl:flex-row m-10'>
          <div className='flex justify-center pb-5 gap-1 2xl:flex-col 2xl:space-y-4'>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} ${index}`}
                className='cursor-pointer w-[76px] h-[80px] rounded-[10px]'
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <img src={selectedImage} alt={product.title} className='2xl:w-[481px] 2xl:h-[500px] rounded-[10px]' />
        </div>
        <div className='mr-5 text-white'>
          <h2 className='text-[42px] font-semibold'>{product.title}</h2>
          {/* <p className='text-2xl font-medium  mb-[15px]'>R$ {product.price ? product.price.toFixed(2) : 'N/A'}</p> */}
          
          <div className='mt-6'>
            <h3 className='w-[424px] text-2xl font-medium mb-[22px]'>{product.primaryDescription || 'No description available.'}</h3>
          </div>
          <div className='border-t flex flex-col gap-10 text-base mb-[67px]'>
            <p className='mt-[41px] '>SKU: {product.SKU || 'N/A'}</p>
            <p >Categoria: {product.category}</p> 
          </div>
          {/* <div>
            <button className="w-[222px] h-[74px] bg-button text-white bg-slate-500 mb-8"><Link to={product.link}>COMPRE AGORA</Link></button>
          </div> */}
        </div>
      </div>
      <div className='text-white container px-5 grid 2xl:mx-auto 2xl:py-10 font-poppins 2xl:flex 2xl:flex-col 2xl:justify-center border-t'>
        <div className='flex items-center justify-center gap-[130px] text-5xl my-9'>
          <h3 className='font-bold'>Descrição</h3>
        </div>
        <div className='text-base mb-10'>
          {product.description ? (
            product.description.split('\n').map((line, index) => (       
              line.trim() === "" ? (
                <br key={index} />
              ) : (
                <p key={index} className='mb-2'>{line}</p>
              )
            ))
          ) : (
            <p>No additional description.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
