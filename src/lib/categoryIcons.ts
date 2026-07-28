import {
  BookOpen,
  Brush,
  Building2,
  Camera,
  Circle,
  Flower2,
  Gem,
  Hand,
  Heart,
  Mail,
  Music,
  Plane,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  Video,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icon names live as strings in the category data, so both the homepage grid
 * and the mobile drawer resolve them here. Listed explicitly rather than via a
 * namespace import — `import * as Icons` pulls the whole lucide set into the
 * bundle and triples its size.
 */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Brush,
  Building2,
  Camera,
  Flower2,
  Gem,
  Hand,
  Heart,
  Mail,
  Music,
  Plane,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  Video,
}

export const categoryIcon = (name: string): LucideIcon => CATEGORY_ICONS[name] ?? Circle
