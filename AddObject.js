// Importacion de modelos
function importJSON() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';  // Solo aceptar archivos .json

  // Evento para cuando se selecciona un archivo
  input.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Leer el archivo seleccionado
      reader.onload = function(e) {
        try {
          const jsonContent = JSON.parse(e.target.result); // Parsear el contenido del archivo JSON

          // Asumiendo que el modelo JSON contiene geometría de Three.js
          const geometry = new THREE.BufferGeometry().fromJSON(jsonContent);
          const material = new THREE.MeshStandardMaterial({ color: 0x44ffdd });
          const mesh = new THREE.Mesh(geometry, material);

          // Colocar el modelo en la escena en la posición 0, 0, 0
          mesh.position.set(0, 0, 0);
          scene.add(mesh);

          console.log("Modelo JSON importado exitosamente.");
        } catch (error) {
          console.error("Error al cargar el archivo JSON:", error);
        }
      };

      // Leer el archivo como texto
      reader.readAsText(file);
    }
  });

  // Hacer clic automáticamente en el input para abrir el explorador de archivos
  input.click();
}
function importGLTF() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.gltf, .glb';

  // Escuchar cuando el usuario selecciona un archivo
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Leer el archivo como URL
      reader.readAsDataURL(file);

      reader.onload = () => {
        const loader = new THREE.GLTFLoader();

        // Cargar el modelo desde el archivo
        loader.load(reader.result, (gltf) => {
          const model = gltf.scene;

          // Configurar el modelo
          model.scale.set(1, 1, 1); // Ajustar escala
          model.position.set(0, 0, 0); // Posicionar en origen
          model.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true; // Permitir proyectar sombras
              node.receiveShadow = true; // Permitir recibir sombras
              node.material.needsUpdate = true; // Asegurarse que los materiales se actualicen correctamente
            }
          });

          // Añadir el modelo a la escena
          scene.add(model);

          // Agregar al stack de deshacer
          undoRedoManager.execute({
            undo: () => undoImportGLTF(model) // Acción de deshacer para remover el modelo
          });

          console.log("Modelo GLTF importado correctamente.");
        }, undefined, (error) => {
          console.error('Error al cargar el modelo GLTF', error);
        });
      };
    }
  });

  input.click();}
function addCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1); // Cubo de 1x1x1 unidades
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Material con color blanco
  const cube = new THREE.Mesh(geometry, material); // Crear la malla del cubo
  cube.position.set(0, 0.5, 0); // Posicionar el cubo ligeramente elevado sobre el suelo
  cube.castShadow = true; // Habilitar sombras para el cubo
  scene.add(cube); // Añadir el cubo a la escena
  // REGISTRO DE FUNCIÓN PARA DESHACER
const addCubeAction = {
  undo: () => {
    scene.remove(cube);
    console.log("Cubo deshecho");
  },
  redo: () => {
    scene.add(cube);
    console.log("Cubo rehecho");
  }
};

undoRedoManager.execute(addCubeAction);
}
function addSphere() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32); // Radio = 0.5, segmentos = 32
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Material con color blanco
  const sphere = new THREE.Mesh(geometry, material); // Crear la malla de la esfera
  sphere.position.set(0, 0.5, 0); // Posicionar la esfera en la escena
  sphere.castShadow = true; // Habilitar sombras si tienes luces con sombras habilitadas
  scene.add(sphere); // Añadir la esfera a la escena

  // REGISTRO DE FUNCIÓN PARA DESHACER
  const addSphereAction = {
    undo: () => {
      scene.remove(sphere); // Eliminar la esfera de la escena
      console.log("Esfera deshecha.");
    },
    redo: () => {
      scene.add(sphere); // Volver a añadir la esfera a la escena
      console.log("Esfera rehecha.");
    }
  };

  // Registrar la acción en el UndoRedoManager
  undoRedoManager.execute(addSphereAction);
  console.log("Esfera añadida y acción registrada para deshacer.");
}
function addPlane() {
  const geometry = new THREE.PlaneGeometry(10, 10); // Plano de 10x10 unidades
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide }); // Material con color blanco, visible por ambos lados
  const plane = new THREE.Mesh(geometry, material); // Crear la malla del plano
  plane.rotation.x = -Math.PI / 2; // Rotar el plano para que quede horizontal (eje X)
  plane.position.set(0, 0, 0); // Posicionar el plano en el centro
  plane.receiveShadow = true; // Habilitar que el plano reciba sombras
  scene.add(plane); // Añadir el plano a la escena

  // REGISTRO DE FUNCIÓN PARA DESHACER
  const addPlaneAction = {
    undo: () => {
      scene.remove(plane); // Eliminar el plano de la escena
      console.log("Plano deshecho.");
    },
    redo: () => {
      scene.add(plane); // Volver a añadir el plano a la escena
      console.log("Plano rehecho.");
    }
  };

  // Registrar la acción en el UndoRedoManager
  undoRedoManager.execute(addPlaneAction);
  console.log("Plano añadido y acción registrada para deshacer.");
}
function addLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direccional con intensidad 0.5
  directionalLight.position.set(5, 10, 5); // Posicionar la luz en la escena
  directionalLight.castShadow = true; // Habilitar sombras
  directionalLight.shadow.mapSize.width = 1024; // Tamaño del mapa de sombras
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight); // Añadir la luz a la escena

  // REGISTRO DE FUNCIÓN PARA DESHACER
  const addLightAction = {
    undo: () => {
      scene.remove(directionalLight); // Eliminar la luz de la escena
      console.log("Luz deshecha.");
    },
    redo: () => {
      scene.add(directionalLight); // Volver a añadir la luz a la escena
      console.log("Luz rehecha.");
    }
  };

  // Registrar la acción en el UndoRedoManager
  undoRedoManager.execute(addLightAction);
  console.log("Luz añadida y acción registrada para deshacer.");
}
function addHemisphereLight() {
  // Crear la geometría del wireframe (cubo)
  const geometry = new THREE.BoxGeometry(0.1, 1, 0.1);

  // Color por defecto para el wireframe (amarillo-naranja)
  const defaultColor = 0xffff00;

  // Material para el wireframe
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: defaultColor, // Color inicial del wireframe
    wireframe: true
  });

  // Crear el mesh del wireframe
  wireframe = new THREE.Mesh(geometry, wireframeMaterial);
  wireframe.position.set(0, 0, 0); // Colocar en el origen
  

  // Añadir el wireframe a la escena
  scene.add(wireframe);

  // Crear la luz hemisférica (cielo azul claro, suelo con el color del wireframe)
  light = new THREE.HemisphereLight(0x00ffff, defaultColor, 0.5); // Cielo color cyan, suelo color del wireframe

  // Posicionar la luz en el centro del wireframe (sin rotación)
  light.position.set(0, -1, 0); // Colocarla hacia abajo

  // Añadir la luz como hija del wireframe
  wireframe.add(light); // Cambiar esto para hacer que la luz sea hija del wireframe

  console.log("Wireframe de cubo y luz hemisférica añadidos a la escena con color sincronizado.");
}
let wireframe; // Variable global para el wireframe
let directionalLight; // Variable global para la luz direccional

function addDirectionalLight() {
  // Crear la geometría del wireframe (cubo)
  const geometry = new THREE.BoxGeometry(0.1, 1, 0.1);

  // Color por defecto para el wireframe (blanco)
  const defaultColor = 0xffffff; // Color blanco

  // Material para el wireframe
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: defaultColor, // Color inicial del wireframe
    wireframe: true
  });

  // Crear el mesh del wireframe
  wireframe = new THREE.Mesh(geometry, wireframeMaterial);
  wireframe.position.set(0, 0, 0); // Colocar en el origen

  // Añadir el wireframe a la escena
  scene.add(wireframe);

  // Crear la luz direccional
  directionalLight = new THREE.DirectionalLight(defaultColor, 1); // Color blanco y potencia de la luz
  directionalLight.position.set(0, -1, 0); // Posición de la luz

  // Habilitar proyección de sombras
  directionalLight.castShadow = true; // Habilitar sombras
  directionalLight.shadow.mapSize.width = 1024; // Tamaño del mapa de sombras
  directionalLight.shadow.mapSize.height = 1024;

  // Añadir la luz direccional como hija del wireframe
  wireframe.add(directionalLight);

  console.log("Wireframe de cubo y luz direccional añadidos a la escena con color sincronizado.");
}

function updateLightDColor() {
  // Obtener el color actual del wireframe
  const wireframeColor = wireframe.material.color.getHex();

  // Actualizar el color de la luz direccional al color del wireframe
  directionalLight.color.set(wireframeColor);
}

// Llama a esta función para probar
addDirectionalLight();
updateLightColor(); // Actualiza el color de la luz direccional al del wireframe

// Modificaciones extras
function updateLightColor() {
  // Obtener el color actual del wireframe
  const wireframeColor = wireframe.material.color.getHex();

  // Actualizar el color del suelo de la luz al color del wireframe
  light.color.set(wireframeColor);
}
function undoImportGLTF(model) {
  scene.remove(model);
  console.log('Importación deshecha: el modelo ha sido eliminado de la escena.');
}