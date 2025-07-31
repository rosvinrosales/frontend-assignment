"use client"

import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

type View = "clients"

interface BottomNavProps {
  currentView: View
}

export function BottomNav({ currentView }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-center py-2">
        <Button variant="default" size="sm" className="flex flex-col items-center gap-1 h-12 px-6">
          <Users className="h-4 w-4" />
          <span className="text-xs">Clients</span>
        </Button>
      </div>
    </nav>
  )
}
