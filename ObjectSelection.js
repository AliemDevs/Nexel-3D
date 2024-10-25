/* Sistema de Selección */
let objetoSeleccionado = null;
let lastSelectedObject = null;
let touchStartX = 0;
let touchStartY = 0;
const touchThreshold = 10;

// Raycaster
const raycaster = new THREE.Raycaster();
const touch = new THREE.Vector2();

window.addEventListener('touchstart', (event) => {
  if (event.touches.length > 0) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }
});

// Toque dentro del canvas
function isTouchInsideCanvas(event) {
  const canvases = document.querySelectorAll('canvas'); // Obtiene todos los elementos canvas
  for (let canvas of canvases) {
    const rect = canvas.getBoundingClientRect(); // Obtener las dimensiones del canvas
    const touchX = event.changedTouches[0].clientX;
    const touchY = event.changedTouches[0].clientY;
    if (
      touchX >= rect.left &&
      touchX <= rect.right &&
      touchY >= rect.top &&
      touchY <= rect.bottom
    ) {
      return true; // Si el toque está dentro de algún canvas, retorna true
    }
  }
  return false; // Si no está en ningún canvas, retorna false
}

// Seleccion del objeto
function seleccionarObjeto(event) {
  if (event.changedTouches.length > 0) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);

    // Verifica si es un toque
    if (deltaX < touchThreshold && deltaY < touchThreshold) {
      touch.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
      touch.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

      // Actualiza el raycaster con la posición del toque
      raycaster.setFromCamera(touch, camera);

      // Calcula los objetos que intersectan con el rayo
      const intersecciones = raycaster.intersectObjects(scene.children, true);

      // Filtrar solo objetos con malla (Mesh)
      const interseccionesConMalla = intersecciones.filter((interseccion) => interseccion.object instanceof THREE.Mesh);

      // Si hay intersecciones con objetos que tienen mallas, selecciona el primero
      if (interseccionesConMalla.length > 0) {
        const objetoTocado = interseccionesConMalla[0].object;

        // Si hay un objeto previamente seleccionado y no es el mismo
        if (objetoSeleccionado && objetoSeleccionado !== objetoTocado) {
          // Remueve el ID de 'SelectedObject' del objeto anterior
          objetoSeleccionado.userData.SelectedObject = false;
        }

        // Actualiza el último objeto seleccionado antes de cambiar la selección
        lastSelectedObject = objetoSeleccionado; // Guarda el objeto seleccionado anterior

        // Asigna el ID 'SelectedObject' al nuevo objeto tocado
        objetoTocado.userData.SelectedObject = true;
        objetoSeleccionado = objetoTocado; // Actualiza el objeto seleccionado

        // Muestra el nombre del último objeto seleccionado en la consola
        if (lastSelectedObject) {
          console.log("Último objeto seleccionado:", lastSelectedObject.name);
        } else {
          console.log("Este es el primer objeto seleccionado:", objetoTocado.name);
        }
      } else if (!isTouchInsideCanvas(event)) {
        // Si no hay intersecciones y se toca fuera de los canvases, llama a deselectObject
        deselectObject(); // Llama a la función para deseleccionar todos los objetos
      }
    }
  }
}

// Evento solo de toque
window.addEventListener('touchend', seleccionarObjeto);

// Deselect
function deselectObject() {
  scene.traverse((object) => {
    // Verifica si el objeto es una malla
    if (object instanceof THREE.Mesh) {
      // Quita el ID 'SelectedObject'
      object.userData.SelectedObject = false;
    }
  });

  objetoSeleccionado = null;
}


/* Outline de selección */

let outlineMesh = null;
const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x44ffdd, transparent: true, opacity: 0.8 });

function updateOutline() {
  // Buscar el objeto seleccionado
  const selectedObject = scene.children.find(child => child.userData.SelectedObject);

  if (selectedObject) {
    if (!outlineMesh) {
      // Crear la geometría de contorno a partir de la geometría del objeto
      const edges = new THREE.EdgesGeometry(selectedObject.geometry);
      outlineMesh = new THREE.LineSegments(edges, outlineMaterial);

      // Añadir el contorno a la escena
      scene.add(outlineMesh);
    }

    // Actualizar la posición, rotación y escala del contorno
    outlineMesh.position.copy(selectedObject.position);
    outlineMesh.rotation.copy(selectedObject.rotation);
    outlineMesh.scale.copy(selectedObject.scale);
  } else {
    if (outlineMesh) {
      scene.remove(outlineMesh); // Eliminar el contorno de la escena
      outlineMesh.geometry.dispose(); // Liberar la geometría si es necesario
      outlineMesh.material.dispose(); // Liberar el material si es necesario
      outlineMesh = null; // Reiniciar la variable del contorno
    }
  }
}
