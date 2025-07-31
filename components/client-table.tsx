"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import type { Client } from "@/app/page"

interface ClientTableProps {
  clients: Client[]
  onSelectClient: (client: Client) => void
  onDeleteClient: (id: string) => void
  selectedClientId?: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ClientTable({
  clients,
  onSelectClient,
  onDeleteClient,
  selectedClientId,
  currentPage,
  totalPages,
  onPageChange,
}: ClientTableProps) {
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Subscription Cost</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  selectedClientId === client.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
                onClick={() => onSelectClient(client)}
              >
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.company}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{formatCurrency(client.subscriptionCost, client.currency)}</Badge>
                </TableCell>
                <TableCell>{client.age}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteClient(client.id)
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
