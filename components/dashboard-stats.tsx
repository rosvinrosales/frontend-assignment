"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Building, DollarSign, TrendingUp } from "lucide-react"
import type { Client } from "@/app/page"

interface DashboardStatsProps {
  clients: Client[]
}

export function DashboardStats({ clients }: DashboardStatsProps) {
  const totalClients = clients.length
  const totalCompanies = new Set(clients.map((client) => client.company)).size

  const totalRevenue = clients.reduce((sum, client) => {
    return sum + Number.parseFloat(client.subscriptionCost)
  }, 0)

  const averageAge =
    clients.length > 0 ? Math.round(clients.reduce((sum, client) => sum + client.age, 0) / clients.length) : 0

  const stats = [
    {
      title: "Total Clients",
      value: totalClients.toString(),
      icon: Users,
      color: "text-gray-700 dark:text-gray-200",
      bgColor: "bg-gray-100 dark:bg-gray-700",
    },
    {
      title: "Companies",
      value: totalCompanies.toString(),
      icon: Building,
      color: "text-gray-700 dark:text-gray-200",
      bgColor: "bg-gray-100 dark:bg-gray-700",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-gray-700 dark:text-gray-200",
      bgColor: "bg-gray-100 dark:bg-gray-700",
    },
    {
      title: "Avg Age",
      value: `${averageAge} years`,
      icon: TrendingUp,
      color: "text-gray-700 dark:text-gray-200",
      bgColor: "bg-gray-100 dark:bg-gray-700",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white truncate">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
