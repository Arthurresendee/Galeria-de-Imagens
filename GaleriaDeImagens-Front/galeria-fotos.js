const navigateButton = document.getElementById('navigateButton');
navigateButton.addEventListener('click', () => {
  window.location.href = 'adm-fotos.html';
});

const gallery = document.querySelector('.image-list');

const API_URL = 'http://localhost:5050/api/imagens';

fetchImages();

async function fetchImages() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar imagens do servidor.');
    }
    const images = await response.json();
    renderImages(images); // Passar as imagens para a função de renderização
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
  }
}

// Função para renderizar as imagens na galeria
function renderImages(images) {
  // Limpar a galeria antes de renderizar as novas imagens
  gallery.innerHTML = '';

  images.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = `data:${image.tipo};base64,${image.imagemBytes}`; // Usar a string Base64 retornada do backend
    imgElement.alt = image.nome;
    imgElement.style.width = '200px'; // Adicionar largura fixa
    imgElement.style.margin = '10px'; // Adicionar espaçamento entre as imagens
    gallery.appendChild(imgElement);
  });
}

// Inicializar o carregamento das imagens
fetchImages();
