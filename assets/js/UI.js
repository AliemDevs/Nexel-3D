/* Menu Desplegable */
const addButton = document.getElementById('addButton');
const menu = document.getElementById('menu');

addButton.addEventListener('click', () => {
menu.classList.toggle('show');
        });
        
// Open Minecraft Pack
document.getElementById('Minecraft').addEventListener('click', () => {
  openMenu()
menu.classList.remove('show');
});

// Add Cube
document.getElementById('cubo').addEventListener('click', () => {
addCube()
menu.classList.remove('show');
});

// Add Sphere
document.getElementById('esfera').addEventListener('click', () => {
addSphere()
menu.classList.remove('show');
});

// Add Plane
document.getElementById('plano').addEventListener('click', () => {
  addPlane()
menu.classList.remove('show');
});

// Add Light
document.getElementById('luz').addEventListener('click', () => {
addLight()
menu.classList.remove('show');
});

// Import GLTF
document.getElementById('importar').addEventListener('click', () => {
importGLTF()
menu.classList.remove('show');
});

// Add Steve
document.getElementById('Steve').addEventListener('click', () => {
loadSteve()
menu.classList.remove('show');
});

window.addEventListener('click', (event) => {
if (!addButton.contains(event.target) && !menu.contains(event.target)) {
menu.classList.remove('show');
}
});

/* Editor de Objetos Desplegable */
function editObject() {
  const editor = document.querySelector('#objectEditor');
  

  // Verifica el estado actual de display y alterna entre 'flex' y 'none'
  if (editor.style.display === 'none' || editor.style.display === '') {
    editor.style.display = 'flex';
    editor.style.position = 'absolute';
  } else {
    editor.style.display = 'none'; // Oculta el div
  }
}

/* Función para abrir y cerrar el menú */
function openMenu() {
    document.getElementById('model-selector').style.display = 'grid'; // Muestra el menú
}
function closeMenu() {
    document.getElementById('model-selector').style.display = 'none'; // Oculta el menú
}
// IMPORT MODELS
document.getElementById('Steve').addEventListener('click', () => {
  closeMenu()
  addSteve()
});

document.getElementById('Alex').addEventListener('click', () => {
  addPlane()
  closeMenu()
});

document.getElementById('House').addEventListener('click', () => {
  addPlane()
  closeMenu()
});