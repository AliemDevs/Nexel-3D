let ambientOcclusionEnabled = false;
let composer, aoPass;

// Configurar la escena y las luces
function setupScene() {
  // Luz Ambiental
  const ambientLight = new THREE.AmbientLight(0x404040); // luz suave
  scene.add(ambientLight);

  // Luz Direccional
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);
}

// Inicializar el compositor y la oclusión ambiental
function initAmbientOcclusion() {
  composer = new THREE.EffectComposer(renderer);

  // RenderPass
  const renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Oclusión Ambiental
  aoPass = new THREE.ShaderPass(THREE.AmbientOcclusionShader);
  aoPass.renderToScreen = true; // Habilita la salida en pantalla
  composer.addPass(aoPass);
  aoPass.enabled = ambientOcclusionEnabled;

  console.log("Oclusión Ambiental configurada.");
}

// Función para activar/desactivar la Oclusión Ambiental
function toggleAmbientOcclusion() {
  ambientOcclusionEnabled = !ambientOcclusionEnabled;
  aoPass.enabled = ambientOcclusionEnabled;
  console.log(`Oclusión Ambiental ${ambientOcclusionEnabled ? "Activada" : "Desactivada"}`);
}

