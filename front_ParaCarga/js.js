function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
  
    const file = fileInput.files[0];
    const title = titleInput.value;
    const description = descriptionInput.value;
  
    if (file && title && description) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file);

  
      fetch('http://localhost:3000/movies', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Imagen cargada correctamente');
      })
      .catch(error => {
        console.error('Error al cargar la imagen:', error);
        alert('Error al cargar la imagen');
      });
    } else {
      alert('Completa todos los campos antes de subir');
    }
  }
  