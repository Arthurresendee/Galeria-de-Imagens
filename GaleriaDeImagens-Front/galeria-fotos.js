const gallery = document.querySelector('.image-list');

const API_URL = 'http://localhost:5050/api/imagens';

fetchImages();

async function fetchImages() {
  try {
    const response = await fetch(API_URL);
    const images = await response.json();

    // Limpar a galeria
    gallery.innerHTML = '';

    // Adicionar as imagens na galeria
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `data:${image.tipo};base64,${btoa(
        String.fromCharCode(...new Uint8Array(image.imagemBytes))
      )}`;
      imgElement.alt = image.nome;
      gallery.appendChild(imgElement);
    });
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
  }
}

fetchImages();
