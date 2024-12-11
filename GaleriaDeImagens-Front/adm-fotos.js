const navigateButton = document.getElementById('navigateButton');
navigateButton.addEventListener('click', () => {
  window.location.href = 'galeria-fotos.html';
});

const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');

const API_URL = 'http://localhost:5050/api/imagens';

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
