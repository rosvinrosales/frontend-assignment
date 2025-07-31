import { type NextRequest, NextResponse } from "next/server"

// Mock data fallback
const mockClients = [
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
]

// In-memory storage for demo purposes
const clients = [...mockClients]

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updates = await request.json()

    const clientIndex = clients.findIndex((client) => client.id === id)
    if (clientIndex === -1) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    clients[clientIndex] = { ...clients[clientIndex], ...updates }
    return NextResponse.json(clients[clientIndex])
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const clientIndex = clients.findIndex((client) => client.id === id)

  if (clientIndex === -1) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  clients.splice(clientIndex, 1)
  return NextResponse.json({ message: "Client deleted successfully" })
}
