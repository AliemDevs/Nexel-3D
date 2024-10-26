
// canvas
const canvas = document.getElementById('miCanvas');

// Inicio de escena
const scene = new THREE.Scene();

// 16 × 16 Grid
const gridSize = 16;
const gridDivisions = 16;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);

gridHelper.position.y = -0.01;

scene.add(gridHelper);
function crearGizmo() {
  const gizmo = new THREE.Group();

  const size = 1;

  const axisXGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(size, 0, 0)]);
  const axisYGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, size, 0)]);
  const axisZGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, size)]);

  const materialX = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Rojo para el eje X
  const materialY = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Verde para el eje Y
  const materialZ = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Azul para el eje Z

  const lineX = new THREE.Line(axisXGeometry, materialX);
  const lineY = new THREE.Line(axisYGeometry, materialY);
  const lineZ = new THREE.Line(axisZGeometry, materialZ);

  gizmo.add(lineX);
  gizmo.add(lineY);
  gizmo.add(lineZ);

  scene.add(gizmo);

  return gizmo;
}

const gizmo = crearGizmo();

// Crear Camara
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

// Renderer y Sombras
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
// Color de fondo
renderer.setClearColor(0x222233);

// Controles de la Camara (OrbitControls)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Movimiento suave
controls.dampingFactor = 0.09;
controls.minDistance = 0;  // Límite de zoom mínimo
controls.maxDistance = 2000;  // Límite de zoom máximo
controls.enablePan = true;  // Habilitar panning
controls.enableRotate = true;  // Permitir rotación
controls.maxPolarAngle = Math.PI * 3;  // Rotación completa sin bloqueos
controls.minPolarAngle = 0;



// Ajustar el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Luz Ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Añadir Luz
function addDefaultLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = false;
  directionalLight.shadow.mapSize.width = 0;
  directionalLight.shadow.mapSize.height = 0;
  scene.add(directionalLight);
}
addDefaultLight()


// Función para renderizar la escena
function animate() {
    requestAnimationFrame(animate);
    updateOutline()
    controls.update();  // Actualizamos los controles de la cámara
    renderer.render(scene, camera);
    initAmbientOcclusion();
    setupScene();
    composer.render();
    
}
animate();

