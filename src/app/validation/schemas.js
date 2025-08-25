import { z } from 'zod';

// System validation schema
export const systemSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().optional()
});

// Attribute validation schema
export const attributeSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, 'Name is required').max(255)
});

// Skill validation schema
export const skillSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, 'Name is required').max(255)
});

// Character validation schema
export const characterSchema = z.object({
  id: z.number().int().positive().optional(),
  system_id: z.number().int().positive('System ID is required'),
  img: z.string().optional().nullable(),
  name: z.string().min(1, 'Name is required').max(255),
  race: z.string().optional().nullable(),
  class: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  alignment: z.string().optional().nullable(),
  hp: z.number().int().min(0).optional(),
  level: z.number().int().min(1).optional()
});

// Item validation schema
export const itemSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, 'Name is required').max(255),
  quantity: z.number().int().min(0, 'Quantity must be non-negative')
});

// Character Sheet validation schema
export const characterSheetSchema = z.object({
  id: z.number().int().positive().optional(),
  character_id: z.number().int().positive('Character ID is required'),
  level: z.number().int().min(1).optional(),
  current_hp: z.number().int().min(0).optional(),
  max_hp: z.number().int().min(1).optional(),
  armor_class: z.number().int().min(0).optional(),
  speed: z.number().int().min(0).optional()
});

// Attribute manipulation schema (for batch operations)
export const attributeManipulationSchema = z.object({
  character_id: z.number().int().positive('Character ID is required'),
  attribute_id: z.number().int().positive('Attribute ID is required'),
  value: z.number().int().min(0, 'Value must be non-negative')
});

// Linking schemas
export const linkAttributeSchema = z.object({
  attributeId: z.number().int().positive('Attribute ID is required'),
  systemId: z.number().int().positive('System ID is required')
});

export const linkSkillSchema = z.object({
  skillId: z.number().int().positive('Skill ID is required'),
  systemId: z.number().int().positive('System ID is required')
});

// ID schema for operations that only need an ID
export const idSchema = z.object({
  id: z.number().int().positive('ID is required')
});

// System ID schema for filtering operations
export const systemIdSchema = z.object({
  systemId: z.number().int().positive('System ID is required')
});

// Character ID schema for character-specific operations
export const characterIdSchema = z.object({
  characterId: z.number().int().positive('Character ID is required')
});

// Inventory manipulation schema
export const inventorySchema = z.object({
  characterId: z.number().int().positive('Character ID is required'),
  itemId: z.number().int().positive('Item ID is required')
});