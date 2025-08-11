"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Modal from "@/components/Modal"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"

export default function ResetPasswordPage() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const password = watch("password")

  // Validate token presence on mount
  useEffect(() => {
    const type = searchParams?.get("type")
    const accessToken = searchParams?.get("access_token")

    if (type === "recovery" && accessToken) {
      setIsTokenValid(true)
    } else {
      setError("Invalid or expired reset password link.")
    }
  }, [searchParams])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!isTokenValid) return

    setIsLoading(true)
    setError(null)

    try {
      const accessToken = searchParams?.get("access_token")

      if (!accessToken) {
        throw new Error("Missing access token")
      }

      // Update password directly using the access token
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password
      })

      if (updateError) {
        throw updateError
      }

      toast.success("Password reset successfully!")

      setTimeout(() => {
        router.push("/?password_reset=success")
      }, 100)
    } catch (err: any) {
      console.error("Password reset error:", err)
      setError(err.message || "An unexpected error occurred")
      toast.error(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Modal
        title="Reset Password"
        description="Enter your new password below"
        isOpen={true}
        onChange={() => {}}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="pb-1">New Password</div>
            <Input
              id="password"
              type="password"
              disabled={isLoading || !isTokenValid}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
          </div>

          <div>
            <div className="pb-1">Confirm Password</div>
            <Input
              id="confirmPassword"
              type="password"
              disabled={isLoading || !isTokenValid}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isTokenValid}
            className="w-full"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
