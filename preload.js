/* global require */
const { contextBridge, ipcRenderer } = require('electron');

async function invoke(channel, payload) {
  try {
    const res = await ipcRenderer.invoke(channel, payload);
    if (res && res.error) {
      throw Object.assign(new Error(res.error?.message || 'Unknown error'), { code: res.error?.code})
    }
    return res?.data ?? res;
  } catch (err) {
    console.error('[ipc error]', channel, err);
    throw err;
  }
}

const api = {
  system: {
    create: (data) => invoke('system:create', data),
    list: () => invoke('system:list'),
    get: (id) => invoke('system:get', { id }),
    update: (id, data) => invoke('system:update', { id, ...data }),
    remove: (id) => invoke('system:remove', { id }),
    listAttributes: (id) => invoke('system:listAttributes', { id }),
    listSkills: (id) => invoke('system:listSkills', { id }),
  },
  attribute: {
    create: (data) => invoke('attribute:create', data),
    list: (systemId) => invoke('attribute:list', systemId),
    get: (id) => invoke('attribute:get', { id }),
    update: (id, data) => invoke('attribute:update', { id, ...data }),
    remove: (id) => invoke('attribute:remove', { id }),
    link: (attributeId, systemId) => invoke('attribute:link', { attributeId, systemId }),
    unlink: (attributeId, systemId) => invoke('attribute:unlink', { attributeId, systemId }),
  },
  skill: {
    create: (data) => invoke('skill:create', data),
    list: () => invoke('skill:list'),
    get: (id) => invoke('skill:get', { id }),
    update: (id, data) => invoke('skill:update', { id, ...data }),
    remove: (id) => invoke('skill:remove', { id }),
    link: (skillId, systemId) => invoke('skill:link', { skillId, systemId }),
    unlink: (skillId, systemId) => invoke('skill:unlink', { skillId, systemId }),
  },
  items: {
    create: (data) => invoke('items:create', data),
    list: () => invoke('items:list'),
    get: (id) => invoke('items:get', { id }),
    update: (id, data) => invoke('items:update', { id, ...data }),
    remove: (id) => invoke('items:remove', { id }),
  },
  characters: {
    create: (data) => invoke('characters:create', data),
    list: () => invoke('characters:list'),
    get: (id) => invoke('characters:get', { id }),
    update: (id, data) => invoke('characters:update', { id, ...data }),
    remove: (id) => invoke('characters:remove', { id }),
    listInventory: (id) => invoke('characters:listInventory', { id }),
    addItem: (characterId, itemId) => invoke('characters:addItem', { characterId, itemId }),
    removeItem: (characterId, itemId) => invoke('characters:removeItem', { characterId, itemId }),
  },
  characterSheet: {
    create: (data) => invoke('characterSheet:create', data),
    list: () => invoke('characterSheet:list'),
    get: (id) => invoke('characterSheet:get', id),
    update: (id, data) => invoke('characterSheet:update', { id, ...data }),
    remove: (id) => invoke('characterSheet:remove', { id }),
  },
  images: {
    select: () => invoke('images:select'),
    delete: (path) => invoke('images:delete', { path }),
  }
}

contextBridge.exposeInMainWorld('api', {
  ...api,
});