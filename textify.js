(function() {
  if (typeof THREE === 'undefined' || typeof scene === 'undefined') {
    console.error("Three.js o la escena no están definidas");
    return;
  }

  let textContent = null; // Texto ingresado por el usuario
  let customFont = null;   // Fuente cargada por el usuario

  // Crear los botones en el div de presets
  const presetsDiv = document.getElementById('presetMenu');

  // Botón "3D Text" para pedir el texto
  const textButton = document.createElement('button');
  textButton.innerText = "3D Text";
  textButton.style.display = "block";
  textButton.style.marginTop = "10px";
  textButton.addEventListener("click", create3DTextPrompt);
  presetsDiv.appendChild(textButton);

  // Botón "Generar 3D" para añadir el texto a la escena
  const generateButton = document.createElement('button');
  generateButton.innerText = "Generar 3D";
  generateButton.style.display = "block";
  generateButton.style.marginTop = "10px";
  generateButton.addEventListener("click", generate3DText);
  presetsDiv.appendChild(generateButton);

  // Botón "Cargar Fuente" para importar una fuente desde archivos locales
  const loadFontButton = document.createElement('button');
  loadFontButton.innerText = "Cargar Fuente";
  loadFontButton.style.display = "block";
  loadFontButton.style.marginTop = "10px";
  loadFontButton.addEventListener("click", loadCustomFont);
  presetsDiv.appendChild(loadFontButton);

  // Función para pedir el texto al usuario
  function create3DTextPrompt() {
    textContent = prompt("Introduce el texto para el objeto 3D:");
    if (textContent) {
      console.log("Texto ingresado para el objeto 3D:", textContent);
    } else {
      console.log("No se ha introducido texto para el objeto 3D.");
    }
  }

  // Función para cargar una fuente TTF personalizada desde archivos locales
  function loadCustomFont() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".ttf";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const loader = new THREE.TTFLoader();
          const fontData = loader.parse(e.target.result);
          customFont = new THREE.Font(fontData);
          console.log("Fuente TTF personalizada cargada:", customFont);
        };
        reader.readAsArrayBuffer(file);
      }
    });
    fileInput.click();
  }

  // Función para generar el texto 3D en la posición (0, 0, 0)
  function generate3DText() {
    if (!textContent) {
      console.log("Por favor, ingresa un texto primero usando el botón '3D Text'.");
      return;
    }

    if (customFont) {
      createTextMesh(customFont);
    } else {
      new THREE.TTFLoader().load(
        'path/to/default/font.ttf',  // Cambia esta ruta a tu fuente TTF
        function (fontData) {
          const font = new THREE.Font(fontData);
          createTextMesh(font);
        }
      );
    }
  }

  // Función auxiliar para crear el texto 3D
  function createTextMesh(font) {
    const textGeometry = new THREE.TextGeometry(textContent, {
      font: font,
      size: 1,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.03,
      bevelOffset: 0,
      bevelSegments: 5
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Color blanco
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(0, 0, 0);  // Posición en la escena
    textMesh.name = textContent;     // Nombre del objeto 3D según el texto ingresado
    scene.add(textMesh);

    console.log("Texto 3D generado en la escena:", textMesh);
  }

})();
