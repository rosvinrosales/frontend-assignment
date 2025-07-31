"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut, Search, X, Plus } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface MobileHeaderProps {
  onLogout: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  showSearch?: boolean
  onAddClient: () => void
}

export function MobileHeader({
  onLogout,
  searchQuery,
  onSearchChange,
  showSearch = false,
  onAddClient,
}: MobileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const openSearch = () => {
    setIsAnimating(true)
    setIsSearchOpen(true)
    // Focus the input after animation starts
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 150)
  }

  const closeSearch = () => {
    setIsAnimating(true)
    setIsSearchOpen(false)
    // Clear animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Handle animation completion
  useEffect(() => {
    if (isSearchOpen && !isAnimating) {
      setIsAnimating(false)
    }
  }, [isSearchOpen, isAnimating])

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 overflow-hidden">
      <div className="px-4 py-3 relative">
        {/* Regular Header Content */}
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
            isSearchOpen
              ? "opacity-0 transform -translate-y-2 pointer-events-none"
              : "opacity-100 transform translate-y-0 pointer-events-auto"
          }`}
        >
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
              Client Management
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={onAddClient}
              className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-all duration-200 hover:scale-105 px-3 py-2 text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={openSearch}
                className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            <div className="transition-all duration-200 hover:scale-105">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search Content */}
        <div
          className={`absolute inset-0 px-4 py-3 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${
            isSearchOpen
              ? "opacity-100 transform translate-y-0 pointer-events-auto"
              : "opacity-0 transform translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Search Input Container */}
            <div className="flex-1 relative">
              <div
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                  isSearchOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                ref={searchInputRef}
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`pl-10 pr-4 transition-all duration-300 ease-in-out border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 ${
                  isSearchOpen ? "transform scale-100 opacity-100" : "transform scale-95 opacity-0"
                }`}
              />
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeSearch}
              className={`transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isSearchOpen ? "opacity-100 transform scale-100 rotate-0" : "opacity-0 transform scale-75 rotate-90"
              }`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Background Overlay for Smooth Transition */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 dark:via-gray-800 to-transparent transition-opacity duration-300 pointer-events-none ${
            isAnimating ? "opacity-20" : "opacity-0"
          }`}
        />
      </div>
    </header>
  )
}
