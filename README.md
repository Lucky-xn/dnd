# D&D Campaign Manager

Uma aplicação desktop para gerenciar campanhas de D&D 5e, construída com Vue.js e Electron.

## Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/Lucky-xn/dnd.git
cd dnd

npm install
```

2. Executando...:
```bash
npm run start
```

## Desenvolvimento

### Para desenvolvimento apenas do frontend:
```bash
npm run dev
```

### Para executar o Electron:
```bash
npm run electron
```

### Para executar frontend + Electron simultaneamente:
```bash
npm run start
```

## API Documentation

### IPC Channel Conventions

All IPC channels follow the `singular:action` format for consistency:

### Systems API
- `system:create` - Create a new system
- `system:list` - List all systems  
- `system:get` - Get system by ID
- `system:update` - Update existing system
- `system:remove` - Delete system
- `system:listAttributes` - Get attributes for a system
- `system:listSkills` - Get skills for a system

### Attributes API
- `attribute:create` - Create new attribute
- `attribute:list` - List attributes for a system
- `attribute:get` - Get attribute by ID
- `attribute:update` - Update existing attribute
- `attribute:remove` - Delete attribute
- `attribute:link` - Link attribute to system
- `attribute:unlink` - Unlink attribute from system

### Skills API
- `skill:create` - Create new skill
- `skill:list` - List all skills
- `skill:get` - Get skill by ID
- `skill:update` - Update existing skill
- `skill:remove` - Delete skill
- `skill:listBySystem` - Get skills for a system
- `skill:link` - Link skill to system
- `skill:unlink` - Unlink skill from system

### Items API
- `items:create` - Create new item
- `items:list` - List all items
- `items:get` - Get item by ID
- `items:update` - Update existing item
- `items:remove` - Delete item

### Characters API
- `characters:create` - Create new character
- `characters:list` - List all characters
- `characters:get` - Get character by ID
- `characters:update` - Update existing character
- `characters:remove` - Delete character
- `characters:listInventory` - Get character inventory
- `characters:addItem` - Add item to character inventory
- `characters:removeItem` - Remove item from character inventory
- `characters:manipulateAttributes` - Batch update character attributes

### Character Sheets API
- `characterSheet:create` - Create character sheet
- `characterSheet:list` - List all character sheets
- `characterSheet:get` - Get character sheet by ID
- `characterSheet:update` - Update character sheet
- `characterSheet:remove` - Delete character sheet

### Images API
- `images:select` - Open file dialog to select image
- `images:delete` - Delete image file

## Payload Formats

### Standard Response Format
All API responses follow this format:
```json
{
  "ok": true,
  "data": { /* response data */ }
}
```

Or for errors:
```json
{
  "ok": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

### Request Payloads

#### System Operations
```javascript
// Create/Update System
{
  "name": "D&D 5E",
  "description": "Fifth Edition D&D"
}

// Get/Remove System
{
  "id": 1
}
```

#### Attribute Operations
```javascript
// Create/Update Attribute
{
  "name": "Strength"
}

// Link/Unlink Attribute
{
  "attributeId": 1,
  "systemId": 1
}
```

#### Character Operations
```javascript
// Create/Update Character
{
  "system_id": 1,
  "name": "Character Name",
  "race": "Human",
  "class": "Fighter",
  "origin": "Nobility",
  "alignment": "Lawful Good",
  "hp": 12,
  "level": 1,
  "img": "path/to/image.jpg"
}

// Manipulate Attributes (supports batch)
[
  {
    "character_id": 1,
    "attribute_id": 1,
    "value": 15
  }
]
// Or single object:
{
  "character_id": 1,
  "attribute_id": 1,
  "value": 15
}
```

#### Item Operations
```javascript
// Create/Update Item
{
  "name": "Sword",
  "quantity": 1
}

// Inventory Operations
{
  "characterId": 1,
  "itemId": 1
}
```

## Validation

All payloads are validated using Zod schemas. Invalid payloads will return validation errors.

### Key Validation Rules:
- System names are required and unique
- Character system_id must reference existing system
- Attribute manipulation validates attribute belongs to character's system
- Quantities must be non-negative integers
- IDs must be positive integers

## Error Handling

### Common Error Codes:
- `VALIDATION_ERROR` - Invalid payload format
- `NOT_FOUND` - Resource not found
- `CONSTRAINT_ERROR` - Database constraint violation
- `UNKNOWN_ERROR` - Unexpected error

## Database Schema

### Key Tables:
- `systems` - Game systems (D&D 5E, Pathfinder, etc.)
- `attributes` - Character attributes (Strength, Dexterity, etc.)
- `skills` - Character skills
- `items` - Items with quantities
- `characters` - Player characters with system_id reference
- `characters_attributes` - Character attribute values
- `characters_inventory` - Character item inventory

### Important Notes:
- All foreign key relationships have CASCADE DELETE
- Attribute manipulation validates system membership
- Batch operations are wrapped in transactions
- Table names use English (`items` not `itens`, `quantity` not `quantidade`)