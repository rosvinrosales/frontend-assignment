"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2, ChevronLeft, ChevronRight, Building, Calendar } from "lucide-react"
import { Users } from "lucide-react"
import type { Client } from "@/app/page"

interface ClientListProps {
  clients: Client[]
  onSelectClient: (client: Client) => void
  onDeleteClient: (client: Client) => void
  selectedClientId?: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalClients: number
}

export function ClientList({
  clients,
  onSelectClient,
  onDeleteClient,
  selectedClientId,
  currentPage,
  totalPages,
  onPageChange,
  totalClients,
}: ClientListProps) {
  const formatCurrency = (amount: string, currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$",
      INR: "₹",
      Yen: "¥",
      CAD: "C$",
      SGD: "S$",
    }
    return `${symbols[currency] || currency} ${amount}`
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "N/A"
      }
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch (error) {
      return "N/A"
    }
  }

  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No clients found</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {totalClients === 0 ? "Get started by adding your first client" : "Try adjusting your search"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Client Cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-2 transition-all duration-200 ${
                selectedClientId === client.id
                  ? "border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-700"
                  : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              }`}
              onClick={() => onSelectClient(client)}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={client.picture || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback className="bg-gray-600 dark:bg-gray-500 text-white dark:text-gray-100">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-tight">
                      {client.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <Building className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{client.company}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteClient(client)
                  }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Details Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {formatCurrency(client.subscriptionCost, client.currency)}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Age: <span className="font-medium text-gray-700 dark:text-gray-300">{client.age}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{client.gender}</div>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(client.registered)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-200">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
