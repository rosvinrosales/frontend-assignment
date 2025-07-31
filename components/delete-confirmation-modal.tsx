"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import type { Client } from "@/app/page"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  client: Client | null
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, client }: DeleteConfirmationModalProps) {
  if (!client) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="mx-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <AlertDialogHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="h-8 w-8 text-gray-600 dark:text-gray-300" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Delete Client</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{client.name}</span> from {client.company}?
            <br />
            <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">This action cannot be undone.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 pt-4">
          <AlertDialogCancel
            onClick={onClose}
            className="w-full sm:w-auto bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 focus:ring-gray-600 font-medium"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Client
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
