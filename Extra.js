// Posicion del objeto XYZ

function objectPosition() {
    const positionAxisDiv = document.querySelector('.positionAxis');

    // Verifica el estado actual de display y alterna entre 'flex' y 'none'
    if (positionAxisDiv.style.display === 'none' || positionAxisDiv.style.display === '') {
        positionAxisDiv.style.display = 'flex';  // Muestra el div
    } else {
        positionAxisDiv.style.display = 'none';  // Oculta el div
    }
}

/* Movimiento el el eje X */
const toggle = document.getElementById('toggleMoveX');
let seguimientoActivo = false; // Inicialmente inactivo

// Evento para el toggle
toggle.addEventListener('change', function() {
    seguimientoActivo = this.checked; // Activar o desactivar seguimiento
    if (seguimientoActivo) {
        // Desactivar otras interacciones si es necesario
        controls.enableRotate = false;
        controls.enableZoom = true;
        controls.enablePan = false;
        
    } else {
        // Reactivar otras interacciones si es necesario
        controls.enableRotate = true;
        controls.enableZoom = true;
        controls.enablePan = true;
    }
});

// Evento touchmove
window.addEventListener('touchmove', function(event) {
    if (!seguimientoActivo || !objetoSeleccionado) return;

    // Prevenir el comportamiento predeterminado del evento touch
    event.preventDefault();

    // Obtener las coordenadas táctiles
    const touch = event.touches[0];
    const x = (touch.clientX / window.innerWidth) * 2 - 1;
    const y = -(touch.clientY / window.innerHeight) * 2 + 1;

    // Crear un raycaster y calcular la intersección
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    // Definir un plano en el que el objeto se moverá (eje X)
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Plano paralelo al eje Z

    // Calcular intersección con el plano
    const intersection = new THREE.Vector3();
    const rayDirection = new THREE.Vector3();
    raycaster.ray.direction.clone(rayDirection);
    
    // Intersección con el plano
    raycaster.ray.intersectPlane(planeZ, intersection);

    // Mover solo en el eje X
    objetoSeleccionado.position.x = intersection.x;
    // Mantener la posición en Y y Z igual
    objetoSeleccionado.position.y = objetoSeleccionado.position.y; // O puedes omitir esta línea
    objetoSeleccionado.position.z = objetoSeleccionado.position.z; // O puedes omitir esta línea
});

/* Movimiento en el eje Y */
const toggleY = document.getElementById('toggleMoveY'); // Cambiar el ID a toggleMoveY
let seguimientoActivoY = false; // Cambiar el nombre de la variable para evitar conflictos

// Evento para el toggle
toggleY.addEventListener('change', function() {
  seguimientoActivoY = this.checked; // Activar o desactivar seguimiento
  if (seguimientoActivoY) {
    // Desactivar otras interacciones si es necesario
    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.enablePan = false;
  } else {
    // Reactivar otras interacciones si es necesario
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;
  }
});

// Evento touchmove
window.addEventListener('touchmove', function(event) {
  if (!seguimientoActivoY || !objetoSeleccionado) return;

  // Prevenir el comportamiento predeterminado del evento touch
  event.preventDefault();

  // Obtener las coordenadas táctiles
  const touch = event.touches[0];
  const x = (touch.clientX / window.innerWidth) * 2 - 1;
  const y = -(touch.clientY / window.innerHeight) * 2 + 1;

  // Crear un raycaster y calcular la intersección
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  // Definir un plano en el que el objeto se moverá (eje Y)
  const planeY = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Plano paralelo al eje Y

  // Calcular intersección con el plano
  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(planeY, intersection);

  // Mover solo en el eje Y
  objetoSeleccionado.position.y = intersection.y; // Mover en el eje Y
  // Mantener la posición en X y Z igual
  objetoSeleccionado.position.x = objetoSeleccionado.position.x; // O puedes omitir esta línea
  objetoSeleccionado.position.z = objetoSeleccionado.position.z; // O puedes omitir esta línea
});

/* Movimiento en el eje Z */
const toggleZ = document.getElementById('toggleMoveZ'); // Cambiar el ID a toggleMoveZ
let seguimientoActivoZ = false; // Cambiar el nombre de la variable para evitar conflictos

// Evento para el toggle
toggleZ.addEventListener('change', function() {
  seguimientoActivoZ = this.checked; // Activar o desactivar seguimiento
  if (seguimientoActivoZ) {
    // Desactivar otras interacciones si es necesario
    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.enablePan = false;
  } else {
    // Reactivar otras interacciones si es necesario
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;
  }
});

// Evento touchmove
window.addEventListener('touchmove', function(event) {
  if (!seguimientoActivoZ || !objetoSeleccionado) return;

  // Prevenir el comportamiento predeterminado del evento touch
  event.preventDefault();

  // Obtener las coordenadas táctiles
  const touch = event.touches[0];
  const x = (touch.clientX / window.innerWidth) * 2 - 1;
  const y = -(touch.clientY / window.innerHeight) * 2 + 1;

  // Crear un raycaster y calcular la intersección
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  // Definir un plano en el que el objeto se moverá (eje Z)
  const planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plano paralelo al eje Z

  // Calcular intersección con el plano
  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(planeZ, intersection);

  // Mover solo en el eje Z
  objetoSeleccionado.position.z = intersection.z; // Mover en el eje Z
  // Mantener la posición en X y Y igual
  objetoSeleccionado.position.x = objetoSeleccionado.position.x; // O puedes omitir esta línea
  objetoSeleccionado.position.y = objetoSeleccionado.position.y; // O puedes omitir esta línea
});

/* ------------------------------------- */

const toggleMoveX = document.getElementById('toggleMoveX');
let lineX = null;

/* Guia en el eje X */
function createLineX(position) {
  const points = [];
  points.push(new THREE.Vector3(-500, 0, 0));
  points.push(new THREE.Vector3(500, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  lineX = new THREE.Line(geometry, material);
  scene.add(lineX);

  lineX.position.set(position.x, position.y, position.z);
}

toggleMoveX.addEventListener('change', function() {
  if (this.checked) {
    createLineX(new THREE.Vector3(0, 0, 0));
  } else {
    if (lineX) {
      scene.remove(lineX);
      lineX = null;
    }
  }
});

const toggleMoveY = document.getElementById('toggleMoveY');
let lineY = null;

/* Guia en el eje Y */
function createLineY(position) {
  const points = [];
  points.push(new THREE.Vector3(0, -500, 0));
  points.push(new THREE.Vector3(0, 500, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

  lineY = new THREE.Line(geometry, material);
  scene.add(lineY);


  lineY.position.set(position.x, position.y, position.z);
}

toggleMoveY.addEventListener('change', function() {
  if (this.checked) {
    createLineY(new THREE.Vector3(0, 1, 0));
  } else {
    if (lineY) {
      scene.remove(lineY);
      lineY = null;
    }
  }
});

const toggleMoveZ = document.getElementById('toggleMoveZ');
let lineZ = null;

/* Guia en el eje Z */
function createLineZ(position) {
    const points = [];
    points.push(new THREE.Vector3(0, 0, -500));
    points.push(new THREE.Vector3(0, 0, 500));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    lineZ = new THREE.Line(geometry, material);
    scene.add(lineZ);

    lineZ.position.set(position.x, position.y, position.z);
}

toggleMoveZ.addEventListener('change', function () {
    if (this.checked) {
        createLineZ(new THREE.Vector3(0, 0, 0)); 
    } else {
        if (lineZ) {
            scene.remove(lineZ);
            lineZ = null;
        }
    }
});

/* Rotacion de Objetos */

function objectRotate() {
    const rotationAxisDiv = document.querySelector('.rotationAxis');

    // Verifica el estado actual de display y alterna entre 'flex' y 'none'
    if (rotationAxisDiv.style.display === 'none' || rotationAxisDiv.style.display === '') {
        rotationAxisDiv.style.display = 'flex';  // Muestra el div
    } else {
        rotationAxisDiv.style.display = 'none';  // Oculta el div
    }
}

const rotateXInput = document.getElementById('rotateX');
const rotateYInput = document.getElementById('rotateY');
const rotateZInput = document.getElementById('rotateZ');

// Función para actualizar la rotación del objeto seleccionado
function updateRotation() {
    const selectedObject = objetoSeleccionado; // Obtener el objeto seleccionado

    if (selectedObject) {
        // Convertir los valores de los sliders de grados a radianes
        const rotationX = THREE.MathUtils.degToRad(rotateXInput.value);
        const rotationY = THREE.MathUtils.degToRad(rotateYInput.value);
        const rotationZ = THREE.MathUtils.degToRad(rotateZInput.value);

        // Aplicar la rotación al objeto
        selectedObject.rotation.set(rotationX, rotationY, rotationZ);

        console.log(`Rotación en X: ${rotateXInput.value}, Y: ${rotateYInput.value}, Z: ${rotateZInput.value}`);
    } else {
        console.warn('No hay objeto seleccionado para rotar');
    }
}

// Agregar eventos para los sliders
rotateXInput.addEventListener('input', updateRotation);
rotateYInput.addEventListener('input', updateRotation);
rotateZInput.addEventListener('input', updateRotation);

/* Escala de Objetos */
function objectScale() {
    const scaleAxisDiv = document.querySelector('.scaleAxis');

    // Verifica el estado actual de display y alterna entre 'flex' y 'none'
    if (scaleAxisDiv.style.display === 'none' || scaleAxisDiv.style.display === '') {
        scaleAxisDiv.style.display = 'flex';  // Muestra el div
    } else {
        scaleAxisDiv.style.display = 'none';  // Oculta el div
    }
}

const toggleScaleX = document.getElementById('toggleScaleX');
let isScalingX = false; // Variable para rastrear el estado de escalado en X
let lastTouchX = null; // Variable para almacenar la última posición del toque en X

// Detectar el inicio del toque para escalar
window.addEventListener('touchstart', (event) => {
  if (toggleScaleX.checked && objetoSeleccionado) {
    isScalingX = true; // Activar el estado de escalado en X
    lastTouchX = event.changedTouches[0].clientX; // Guardar la posición inicial del toque
    controls.enableRotate = false; // Bloquear rotación
    controls.enablePan = false; // Bloquear panning
  }
});

// Detectar el movimiento del toque para escalar
window.addEventListener('touchmove', (event) => {
  if (isScalingX && objetoSeleccionado) {
    const currentTouchX = event.changedTouches[0].clientX; // Posición actual del toque
    const deltaX = currentTouchX - lastTouchX; // Calcular el cambio en X

    // Escalar el objeto en función de la dirección del movimiento
    if (deltaX > 0) {
      // Mover hacia la derecha
      objetoSeleccionado.scale.x -= 0.2; // Escala hacia afuera
    } else if (deltaX < 0) {
      // Mover hacia la izquierda
      objetoSeleccionado.scale.x += 0.2; // Escala hacia adentro, asegurando que no sea menor a 0
      objetoSeleccionado.scale.x = Math.max(0.1, objetoSeleccionado.scale.x); // Prevenir escala negativa
    }

    lastTouchX = currentTouchX; // Actualizar la última posición del toque
  }
});

// Detectar cuando se suelta el toque
window.addEventListener('touchend', () => {
  if (isScalingX) {
    isScalingX = false; // Desactivar estado de escalado
    controls.enableRotate = true; // Rehabilitar rotación
    controls.enablePan = true; // Rehabilitar panning
  }
});

// Revisa el estado del toggleScaleX
toggleScaleX.addEventListener('change', () => {
  // Ya no hacemos nada cuando se desactiva el toggle
  // La escala del objeto permanecerá como está
});

const toggleScaleY = document.getElementById('toggleScaleY');
let isScalingY = false; // Variable para rastrear el estado de escalado en Y
let lastTouchY = null; // Variable para almacenar la última posición del toque en Y

// Detectar el inicio del toque para escalar
window.addEventListener('touchstart', (event) => {
  if (toggleScaleY.checked && objetoSeleccionado) {
    isScalingY = true; // Activar el estado de escalado en Y
    lastTouchY = event.changedTouches[0].clientY; // Guardar la posición inicial del toque
    controls.enableRotate = false; // Bloquear rotación
    controls.enablePan = false; // Bloquear panning
  }
});

// Detectar el movimiento del toque para escalar
window.addEventListener('touchmove', (event) => {
  if (isScalingY && objetoSeleccionado) {
    const currentTouchY = event.changedTouches[0].clientY; // Posición actual del toque
    const deltaY = currentTouchY - lastTouchY; // Calcular el cambio en Y

    // Escalar el objeto en función de la dirección del movimiento
    if (deltaY > 0) {
      // Mover hacia abajo
      objetoSeleccionado.scale.y -= 0.13; // Escala hacia afuera
    } else if (deltaY < 0) {
      // Mover hacia arriba
      objetoSeleccionado.scale.y += 0.13; // Escala hacia adentro, asegurando que no sea menor a 0
      objetoSeleccionado.scale.y = Math.max(0.1, objetoSeleccionado.scale.y); // Prevenir escala negativa
    }

    lastTouchY = currentTouchY; // Actualizar la última posición del toque
  }
});

// Detectar cuando se suelta el toque
window.addEventListener('touchend', () => {
  if (isScalingY) {
    isScalingY = false; // Desactivar estado de escalado
    controls.enableRotate = true; // Rehabilitar rotación
    controls.enablePan = true; // Rehabilitar panning
  }
});

// Revisa el estado del toggleScaleY
toggleScaleY.addEventListener('change', () => {
  // Ya no hacemos nada cuando se desactiva el toggle
  // La escala del objeto permanecerá como está
});

const toggleScaleZ = document.getElementById('toggleScaleZ');
let isScalingZ = false; // Variable para rastrear el estado de escalado en Z
let lastTouchZ = null; // Variable para almacenar la última posición del toque en Z

// Detectar el inicio del toque para escalar
window.addEventListener('touchstart', (event) => {
  if (toggleScaleZ.checked && objetoSeleccionado) {
    isScalingZ = true; // Activar el estado de escalado en Z
    lastTouchZ = event.changedTouches[0].clientY; // Guardar la posición inicial del toque (usamos Y por la interfaz táctil)
    controls.enableRotate = false; // Bloquear rotación
    controls.enablePan = false; // Bloquear panning
  }
});

// Detectar el movimiento del toque para escalar
window.addEventListener('touchmove', (event) => {
  if (isScalingZ && objetoSeleccionado) {
    const currentTouchZ = event.changedTouches[0].clientY; // Posición actual del toque
    const deltaZ = currentTouchZ - lastTouchZ; // Calcular el cambio en Y (usamos Y aquí como interfaz)

    // Escalar el objeto en función de la dirección del movimiento
    if (deltaZ > 0) {
      // Mover hacia abajo
      objetoSeleccionado.scale.z -= 0.2; // Escala hacia afuera
    } else if (deltaZ < 0) {
      // Mover hacia arriba
      objetoSeleccionado.scale.z += 0.2; // Escala hacia adentro, asegurando que no sea menor a 0
      objetoSeleccionado.scale.z = Math.max(0.1, objetoSeleccionado.scale.z); // Prevenir escala negativa
    }

    lastTouchZ = currentTouchZ; // Actualizar la última posición del toque
  }
});

// Detectar cuando se suelta el toque
window.addEventListener('touchend', () => {
  if (isScalingZ) {
    isScalingZ = false; // Desactivar estado de escalado
    controls.enableRotate = true; // Rehabilitar rotación
    controls.enablePan = true; // Rehabilitar panning
  }
});

// Revisa el estado del toggleScaleZ
toggleScaleZ.addEventListener('change', () => {
  // Ya no hacemos nada cuando se desactiva el toggle
  // La escala del objeto permanecerá como está
});

const toggleScaleW = document.getElementById('toggleScaleW');
let isScalingW = false; // Variable para rastrear el estado de escalado en W
let lastTouchW = null; // Variable para almacenar la última posición del toque en Y

// Detectar el inicio del toque para escalar
window.addEventListener('touchstart', (event) => {
  if (toggleScaleW.checked && objetoSeleccionado) {
    isScalingW = true; // Activar el estado de escalado en W
    lastTouchW = event.changedTouches[0].clientY; // Guardar la posición inicial del toque
    controls.enableRotate = false; // Bloquear rotación
    controls.enablePan = false; // Bloquear panning
  }
});

// Detectar el movimiento del toque para escalar
window.addEventListener('touchmove', (event) => {
  if (isScalingW && objetoSeleccionado) {
    const currentTouchW = event.changedTouches[0].clientY; // Posición actual del toque
    const deltaW = currentTouchW - lastTouchW; // Calcular el cambio en Y

    // Escalar el objeto en función de la dirección del movimiento
    if (deltaW > 0) {
      // Mover hacia abajo (escala hacia afuera en los 3 ejes)
      objetoSeleccionado.scale.x -= 0.2; // Aumentar escala en X
      objetoSeleccionado.scale.y -= 0.2; // Aumentar escala en Y
      objetoSeleccionado.scale.z -= 0.2; // Aumentar escala en Z
    } else if (deltaW < 0) {
      // Mover hacia arriba (escala hacia adentro en los 3 ejes)
      objetoSeleccionado.scale.x += 0.2; // Disminuir escala en X
      objetoSeleccionado.scale.y += 0.2; // Disminuir escala en Y
      objetoSeleccionado.scale.z += 0.2; // Disminuir escala en Z
      objetoSeleccionado.scale.x = Math.max(0.1, objetoSeleccionado.scale.x); // Prevenir escala negativa
      objetoSeleccionado.scale.y = Math.max(0.1, objetoSeleccionado.scale.y); // Prevenir escala negativa
      objetoSeleccionado.scale.z = Math.max(0.1, objetoSeleccionado.scale.z); // Prevenir escala negativa
    }

    lastTouchW = currentTouchW; // Actualizar la última posición del toque
  }
});

// Detectar cuando se suelta el toque
window.addEventListener('touchend', () => {
  if (isScalingW) {
    isScalingW = false; // Desactivar estado de escalado
    controls.enableRotate = true; // Rehabilitar rotación
    controls.enablePan = true; // Rehabilitar panning
  }
});

// Revisa el estado del toggleScaleW
toggleScaleW.addEventListener('change', () => {
});