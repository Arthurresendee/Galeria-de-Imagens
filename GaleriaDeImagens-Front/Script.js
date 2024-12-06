const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const gallery = document.querySelector('.image-list');

// URL do backend
const API_URL = 'http://localhost:5050/api/imagens';

// Função para buscar imagens do backend
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

// Evento de envio de imagem
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = imageInput.files[0];
  if (!file) return alert('Por favor, selecione uma imagem.');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Imagem enviada com sucesso!');
      imageInput.value = ''; // Limpar o input
      fetchImages(); // Atualizar a galeria
    } else {
      alert('Erro ao enviar imagem.');
    }
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
  }
});

// Buscar as imagens ao carregar a página
fetchImages();
