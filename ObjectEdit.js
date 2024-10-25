/* DELETE OBJECT */
function deleteObject() {
  let objetoAEliminar = null;
// Detectar seleccionado 
  scene.traverse((child) => {
    if (child.userData.SelectedObject) {
      objetoAEliminar = child;
    }
  });
// Eliminar los datos del objeto
  if (objetoAEliminar) {
    const objetoAEliminarBackup = objetoAEliminar.clone(); // Hacer una copia del objeto antes de eliminarlo
    scene.remove(objetoAEliminar); // Eliminar el objeto de la escena
    console.log("Objeto importado eliminado:", objetoAEliminar);

    // REGISTRO DE FUNCIÓN PARA DESHACER
    const deleteObjectAction = {
      undo: () => {
        scene.add(objetoAEliminarBackup); // Añadir el objeto de nuevo a la escena
        console.log("Eliminación del objeto deshecha.");
      }
    };

    // Registrar la acción en el UndoRedoManager
    undoRedoManager.execute(deleteObjectAction);
    console.log("Acción de eliminación registrada para deshacer.");
  } else {
    console.log("No se encontró un objeto con el ID 'SelectedObject' para eliminar.");
  }
}

/* DUPLICATE OBJECT */
function duplicateObject() {
  // Verifica si hay un objeto seleccionado
  if (!objetoSeleccionado) {
    console.log("No hay ningún objeto seleccionado para duplicar.");
    return;
  }

  // Clonar la geometría y el material del objeto seleccionado
  const newGeometry = objetoSeleccionado.geometry.clone();
  const newMaterial = objetoSeleccionado.material.clone();

  // Crear un nuevo objeto Mesh
  const duplicatedObject = new THREE.Mesh(newGeometry, newMaterial);

  // Posicionar el objeto duplicado encima del original
  duplicatedObject.position.copy(objetoSeleccionado.position);
  duplicatedObject.position.y += 1; // Ajusta la altura según sea necesario

 
  scene.add(duplicatedObject);
  
  const duplicateAction = {
    undo: () => {
      scene.remove(duplicatedObject);
      console.log("Duplicación deshecha:", duplicatedObject);
    },
    redo: () => {
      scene.add(duplicatedObject);
      console.log("Duplicación rehecha:", duplicatedObject);
    }
  };

  undoRedoManager.execute(duplicateAction);
  
  console.log("Objeto duplicado:", duplicatedObject);
}

