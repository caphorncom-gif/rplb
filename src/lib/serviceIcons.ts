import { Smartphone, Wind, Shield, RefreshCw, Home, Zap, BatteryCharging } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Icônes référencées par la colonne `services.icon` en base.
// Import nommé (et non `import * as`) pour laisser le tree-shaking
// éliminer le reste de lucide-react du bundle.
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Smartphone,
  Wind,
  Shield,
  RefreshCw,
  Home,
  Zap,
  BatteryCharging,
}

export const getServiceIcon = (name: string): LucideIcon => SERVICE_ICONS[name] ?? Zap
