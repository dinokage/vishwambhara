'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useInquiryForm from '@/hooks/useInquiryForm'

interface InquiryFormProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productImage?: string
  companyName: string
}

const InquiryForm = ({
  isOpen,
  onClose,
  productName,
  productImage,
  companyName
}: InquiryFormProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm
  } = useInquiryForm(productName, productImage, companyName)

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to ensure dialog is fully closed
      const timer = setTimeout(() => resetForm(), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, resetForm])

  // Close the dialog after successful submission
  useEffect(() => {
    if (submitStatus.success) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus.success, onClose])

  // Handle dialog close
  const handleDialogClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-semibold mb-2">
          Inquire About {productName}
        </DialogTitle>
        <DialogDescription className="mb-4">
          Fill out this form to inquire about this product. Our team will contact you shortly.
        </DialogDescription>

        {submitStatus.message && (
          <div className={`p-3 rounded-md mb-4 ${
            submitStatus.success 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className={`w-full ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className={`w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Your phone number"
              className={`w-full ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDialogClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0275d8] hover:bg-[#0261b0]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InquiryForm