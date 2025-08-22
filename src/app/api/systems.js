import { 
  addSystem, 
  getAllSystems, 
  getSystemById, 
  updateSystem, 
  deleteSystem 
} from "../services/systemService.js";

export async function addNewSystem(data) {
  return addSystem(data);
}

export async function listAllSystems() {
  return getAllSystems();
}

export async function getSystem(id) {
  return getSystemById(id);
}

export async function updateExistingSystem(id, data) {
  return updateSystem(id, data);
}

export async function removeSystem(id) {
  return deleteSystem(id);
}