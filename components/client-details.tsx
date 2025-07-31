"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Save, X, Building, Calendar } from "lucide-react"
import type { Client } from "@/app/page"

interface ClientDetailsProps {
  client: Client
  onUpdate: (id: string, data: Partial<Client>) => void
  onClose: () => void
}

export function ClientDetails({ client, onUpdate, onClose }: ClientDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: client.name,
    company: client.company,
    age: client.age.toString(),
    gender: client.gender,
    currency: client.currency,
    subscriptionCost: client.subscriptionCost,
  })

  const formatDate = (dateString: string) => {
    try {
      // Handle different date formats more robustly
      let date = new Date(dateString)

      // If the first attempt fails, try parsing as ISO string
      if (isNaN(date.getTime())) {
        // Remove timezone offset and parse again
        const cleanDateString = dateString.replace(/\s*-\d{2}:\d{2}$/, "")
        date = new Date(cleanDateString)
      }

      // If still invalid, try one more approach
      if (isNaN(date.getTime())) {
        // Try parsing the date part only
        const datePart = dateString.split("T")[0]
        date = new Date(datePart)
      }

      if (isNaN(date.getTime())) {
        console.warn("Unable to parse date:", dateString)
        return "Invalid date"
      }

      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      console.error("Date parsing error:", error, "for date:", dateString)
      return "Invalid date"
    }
  }

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

  const handleSave = () => {
    onUpdate(client.id, {
      ...editData,
      age: Number.parseInt(editData.age),
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      name: client.name,
      company: client.company,
      age: client.age.toString(),
      gender: client.gender,
      currency: client.currency,
      subscriptionCost: client.subscriptionCost,
    })
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Client Details</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">View and manage client information</p>
        </div>
        <div className="flex items-center space-x-3">
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white px-4 py-2"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <Avatar className="h-20 w-20 ring-4 ring-gray-200 dark:ring-gray-600">
              <AvatarImage src={client.picture || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback className="bg-gray-600 dark:bg-gray-500 text-white dark:text-gray-100 text-lg font-bold">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{client.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">ID: {client.id}</p>
              <Badge
                variant="outline"
                className="mt-2 capitalize border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
              >
                {client.gender}
              </Badge>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-gray-900 dark:text-white font-medium">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-company" className="text-gray-900 dark:text-white font-medium">
                  Company
                </Label>
                <Input
                  id="edit-company"
                  value={editData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-age" className="text-gray-900 dark:text-white font-medium">
                  Age
                </Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={editData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  min="1"
                  max="120"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-gender" className="text-gray-900 dark:text-white font-medium">
                  Gender
                </Label>
                <Select value={editData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="male"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      value="female"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Female
                    </SelectItem>
                    <SelectItem
                      value="other"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-currency" className="text-gray-900 dark:text-white font-medium">
                  Currency
                </Label>
                <Select value={editData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="USD"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      USD ($)
                    </SelectItem>
                    <SelectItem
                      value="INR"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      INR (₹)
                    </SelectItem>
                    <SelectItem
                      value="Yen"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Yen (¥)
                    </SelectItem>
                    <SelectItem
                      value="CAD"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      CAD (C$)
                    </SelectItem>
                    <SelectItem
                      value="SGD"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      SGD (S$)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-subscription" className="text-gray-900 dark:text-white font-medium">
                  Subscription Cost
                </Label>
                <Input
                  id="edit-subscription"
                  type="number"
                  step="0.01"
                  value={editData.subscriptionCost}
                  onChange={(e) => handleInputChange("subscriptionCost", e.target.value)}
                  min="0"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Company
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{client.company}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Age</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{client.age} years</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Subscription</span>
                  <Badge
                    variant="secondary"
                    className="font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {formatCurrency(client.subscriptionCost, client.currency)}
                  </Badge>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Registered
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(client.registered)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex space-x-3 max-w-md mx-auto">
            <Button
              onClick={handleSave}
              size="sm"
              className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-3"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              className="px-6 py-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
