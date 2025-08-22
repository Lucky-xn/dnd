import { 
  addAttribute, 
  getAllAttributes, 
  getAttributeById, 
  updateAttribute, 
  deleteAttribute,
  getAttributesBySystem,
  linkAttributeToSystem,
  unlinkAttributeFromSystem
} from "../services/attributeService.js";

export async function addNewAttribute(data) {
  return addAttribute(data);
}

export async function listAllAttributes() {
  return getAllAttributes();
}

export async function getAttribute(id) {
  return getAttributeById(id);
}

export async function updateExistingAttribute(id, data) {
  return updateAttribute(id, data);
}

export async function removeAttribute(id) {
  return deleteAttribute(id);
}

export async function getSystemAttributes(systemId) {
  return getAttributesBySystem(systemId);
}

export async function linkAttribute(attributeId, systemId) {
  return linkAttributeToSystem(attributeId, systemId);
}

export async function unlinkAttribute(attributeId, systemId) {
  return unlinkAttributeFromSystem(attributeId, systemId);
}