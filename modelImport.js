// Asegúrate de que OBJLoader esté importado en tu HTML
const objLoader = new THREE.OBJLoader();

function addSteve() {
    // Cargar el modelo Steve.obj
    objLoader.load(
        '/models/Steve.obj',
        function (object) {
            // Opcional: Ajusta la posición del modelo si es necesario
            object.position.set(0, 0, 0); // Cambia la posición según necesites

            // Añadir el objeto a la escena
            scene.add(object);

            // Renderizar la escena (si es necesario, dependiendo de tu loop de renderizado)
            renderer.render(scene, camera);

            console.log('Modelo Steve importado con éxito');
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado');
        },
        function (error) {
            console.error('Error al cargar el modelo: ', error);
        }
    );
}