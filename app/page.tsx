"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { ClientList } from "@/components/client-list"
import { AddClientForm } from "@/components/add-client-form"
import { ClientDetails } from "@/components/client-details"
import { MobileHeader } from "@/components/mobile-header"
import { BottomNav } from "@/components/bottom-nav"
import { DashboardStats } from "@/components/dashboard-stats"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export interface Client {
  id: string
  gender: string
  name: string
  company: string
  age: number
  picture: string
  registered: string
  currency: string
  subscriptionCost: string
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; client: Client | null }>({
    isOpen: false,
    client: null,
  })

  const clientsPerPage = 10

  // Fetch clients from API
  const fetchClients = async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NODE_ENV === "development" ? "http://localhost:4090/clients" : "/api/clients"

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error("Error fetching clients:", error)
      // Fallback to mock data if API is not available
      setClients([
        {
          id: "0",
          gender: "female",
          name: "Steele Burch",
          company: "TELEPARK",
          age: 21,
          picture: "http://placehold.it/32x32",
          registered: "2021-05-31T02:20:58 -09:00",
          currency: "USD",
          subscriptionCost: "1000.00",
        },
        {
          id: "1",
          gender: "male",
          name: "Muriel Leonard",
          company: "CINESANCT",
          age: 35,
          picture: "http://placehold.it/32x32",
          registered: "2015-04-20T07:24:27 -09:00",
          currency: "INR",
          subscriptionCost: "2000.00",
        },
        {
          id: "2",
          gender: "female",
          name: "Joann Byers",
          company: "SCENTRIC",
          age: 37,
          picture: "http://placehold.it/32x32",
          registered: "2019-05-19T12:47:34 -09:00",
          currency: "Yen",
          subscriptionCost: "20000.00",
        },
        {
          id: "3",
          gender: "female",
          name: "Hinton Hensley",
          company: "SONIQUE",
          age: 23,
          picture: "http://placehold.it/32x32",
          registered: "2014-04-22T07:16:12 -09:00",
          currency: "Yen",
          subscriptionCost: "2000.00",
        },
        {
          id: "4",
          gender: "male",
          name: "Louella Thomas",
          company: "KOG",
          age: 38,
          picture: "http://placehold.it/32x32",
          registered: "2021-05-01T06:15:25 -09:00",
          currency: "CAD",
          subscriptionCost: "500.00",
        },
        {
          id: "5",
          gender: "female",
          name: "Sykes Mueller",
          company: "GENEKOM",
          age: 28,
          picture: "http://placehold.it/32x32",
          registered: "2023-03-23T05:40:50 -09:00",
          currency: "USD",
          subscriptionCost: "500.00",
        },
        {
          id: "6",
          gender: "male",
          name: "Barron Bowen",
          company: "EBIDCO",
          age: 38,
          picture: "http://placehold.it/32x32",
          registered: "2019-10-18T07:26:00 -09:00",
          currency: "SGD",
          subscriptionCost: "500.00",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchClients()
    }
  }, [isLoggedIn])

  // Add new client
  const addClient = async (clientData: Omit<Client, "id" | "registered">) => {
    try {
      const newClient = {
        ...clientData,
        id: Date.now().toString(),
        registered: new Date().toISOString(),
      }

      const apiUrl = process.env.NODE_ENV === "development" ? "http://localhost:4090/clients" : "/api/clients"

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      })

      if (response.ok) {
        setClients((prev) => [...prev, newClient])
        setShowAddForm(false)
      } else {
        setClients((prev) => [...prev, newClient])
        setShowAddForm(false)
      }
    } catch (error) {
      console.error("Error adding client:", error)
      const newClient = {
        ...clientData,
        id: Date.now().toString(),
        registered: new Date().toISOString(),
      }
      setClients((prev) => [...prev, newClient])
      setShowAddForm(false)
    }
  }

  // Show delete confirmation
  const showDeleteConfirmation = (client: Client) => {
    setDeleteModal({ isOpen: true, client })
  }

  // Delete client
  const deleteClient = async (id: string) => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "development" ? `http://localhost:4090/clients/${id}` : `/api/clients/${id}`

      const response = await fetch(apiUrl, {
        method: "DELETE",
      })

      if (response.ok) {
        setClients((prev) => prev.filter((client) => client.id !== id))
        if (selectedClient?.id === id) {
          setSelectedClient(null)
        }
      } else {
        setClients((prev) => prev.filter((client) => client.id !== id))
        if (selectedClient?.id === id) {
          setSelectedClient(null)
        }
      }
    } catch (error) {
      console.error("Error deleting client:", error)
      setClients((prev) => prev.filter((client) => client.id !== id))
      if (selectedClient?.id === id) {
        setSelectedClient(null)
      }
    } finally {
      setDeleteModal({ isOpen: false, client: null })
    }
  }

  // Update client
  const updateClient = async (id: string, clientData: Partial<Client>) => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "development" ? `http://localhost:4090/clients/${id}` : `/api/clients/${id}`

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      })

      if (response.ok) {
        setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...clientData } : client)))
        if (selectedClient?.id === id) {
          setSelectedClient({ ...selectedClient, ...clientData })
        }
      } else {
        setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...clientData } : client)))
        if (selectedClient?.id === id) {
          setSelectedClient({ ...selectedClient, ...clientData })
        }
      }
    } catch (error) {
      console.error("Error updating client:", error)
      setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...clientData } : client)))
      if (selectedClient?.id === id) {
        setSelectedClient({ ...selectedClient, ...clientData })
      }
    }
  }

  // Filter clients based on search
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage)
  const startIndex = (currentPage - 1) * clientsPerPage
  const endIndex = startIndex + clientsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Mobile Header */}
      <MobileHeader
        onLogout={() => setIsLoggedIn(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={true}
        onAddClient={() => setShowAddForm(true)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden pb-16">
        <div className="h-full flex flex-col">
          {/* Dashboard Stats */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <DashboardStats clients={clients} />
          </div>

          {/* Client List */}
          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading clients...</p>
                </div>
              </div>
            ) : (
              <ClientList
                clients={currentClients}
                onSelectClient={setSelectedClient}
                onDeleteClient={showDeleteConfirmation}
                selectedClientId={selectedClient?.id}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalClients={filteredClients.length}
              />
            )}
          </div>
        </div>
      </main>

      {/* Add Client Form Sheet */}
      <Sheet open={showAddForm} onOpenChange={setShowAddForm}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          <AddClientForm onSubmit={addClient} onCancel={() => setShowAddForm(false)} />
        </SheetContent>
      </Sheet>

      {/* Client Details Sheet */}
      <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          {selectedClient && (
            <ClientDetails client={selectedClient} onUpdate={updateClient} onClose={() => setSelectedClient(null)} />
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, client: null })}
        onConfirm={() => deleteModal.client && deleteClient(deleteModal.client.id)}
        client={deleteModal.client}
      />

      {/* Bottom Navigation */}
      <BottomNav currentView="clients" />
    </div>
  )
}
