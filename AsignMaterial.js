/* ADD TEXTURE */
function objectTexture() {
  const input = document.getElementById('imageSelector');
  const imagePreview = document.getElementById('imagePreview');

  // Verifica si hay un objeto seleccionado
  if (objetoSeleccionado && objetoSeleccionado.userData.SelectedObject) {
    const file = input.files[0]; // Obtener el archivo seleccionado

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(e.target.result, (texture) => {
          // Aplicar la textura al material del objeto seleccionado
          objetoSeleccionado.material.map = texture;
          objetoSeleccionado.material.needsUpdate = true; // Indica que el material necesita actualizarse
          console.log("Textura aplicada al objeto:", objetoSeleccionado.name);
        });

        // Mostrar vista previa de la imagen
        imagePreview.src = e.target.result; // Asignar la URL de la imagen
        imagePreview.style.display = "block"; // Mostrar la imagen
      };

      reader.readAsDataURL(file); // Leer el archivo como una URL
    } else {
      console.error("No se ha seleccionado ninguna imagen");
    }
  } else {
    console.error("No hay objeto seleccionado");
  }
}
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff, // Color base
  metalness: 0.5, // Nivel de metalicidad
  roughness: 0.5, // Nivel de rugosidad
});

/* ADD COLOR */
const colorButton = document.getElementById('colorButton');
const hiddenColorInput = document.getElementById('hiddenColorInput');

colorButton.addEventListener('click', function() {
  hiddenColorInput.click(); // Simula un clic en el input de tipo color oculto
});

hiddenColorInput.addEventListener('input', function() {
  const selectedObject = objetoSeleccionado; // Obtener el objeto actualmente seleccionado
  const colorValue = hiddenColorInput.value; // Obtener el valor del color seleccionado
  const newColor = new THREE.Color(colorValue); // Crear un nuevo color a partir del valor

  if (selectedObject) {
    // Cambiar el color del material del objeto seleccionado
    if (selectedObject.material) {
      selectedObject.material.color.set(newColor); // Aplicar el nuevo color
      console.log(`Color aplicado al objeto: ${colorValue}`); // Mensaje en consola
    } else {
      console.warn('El objeto seleccionado no tiene material'); // Advertencia si no hay material
    }
  } else {
    console.warn('No hay objeto seleccionado'); // Advertencia si no hay objeto seleccionado
  }
});