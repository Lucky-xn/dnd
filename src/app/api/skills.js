import { 
  addSkill, 
  getAllSkills, 
  getSkillById, 
  updateSkill, 
  deleteSkill,
  getSkillsBySystem,
  linkSkillToSystem,
  unlinkSkillFromSystem
} from "../services/skillService.js";

export async function addNewSkill(data) {
  return addSkill(data);
}

export async function listAllSkills() {
  return getAllSkills();
}

export async function getSkill(id) {
  return getSkillById(id);
}

export async function updateExistingSkill(id, data) {
  return updateSkill(id, data);
}

export async function removeSkill(id) {
  return deleteSkill(id);
}

export async function getSystemSkills(systemId) {
  return getSkillsBySystem(systemId);
}

export async function linkSkill(skillId, systemId) {
  return linkSkillToSystem(skillId, systemId);
}

export async function unlinkSkill(skillId, systemId) {
  return unlinkSkillFromSystem(skillId, systemId);
}