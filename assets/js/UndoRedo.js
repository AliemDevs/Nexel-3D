/* Sistema de Retroceso */
class UndoRedoManager {
  constructor() {
    this.undoStack = [];
  }

  // Agrega una acción al stack de deshacer
  execute(action) {
    this.undoStack.push(action);
    console.log("Acción ejecutada y agregada al stack de deshacer.");
  }

  // Deshacer la última acción
  undo() {
    if (this.undoStack.length > 0) {
      const action = this.undoStack.pop();
      action.undo(); // Llama a la función de deshacer de la acción
      console.log("Acción deshecha.");
    } else {
      console.log("No hay acciones para deshacer.");
    }
  }
}
const undoRedoManager = new UndoRedoManager();