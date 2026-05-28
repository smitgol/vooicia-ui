"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, FormEvent, ChangeEvent } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  role: string
  phone: string
  industry: string
  callVolume: string
  currentSetup: string
  timeline: string
  useCase: string
}

interface FormStatus {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  message: string
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  phone: "",
  industry: "",
  callVolume: "",
  currentSetup: "",
  timeline: "",
  useCase: "",
}

const INDUSTRIES = [
  { value: "healthcare", label: "Healthcare" },
  { value: "real-estate", label: "Real Estate" },
  { value: "ecommerce", label: "E-commerce & D2C" },
  { value: "hospitality", label: "Hospitality" },
  { value: "legal", label: "Legal" },
  { value: "automotive", label: "Automotive" },
  { value: "home-services", label: "Home Services" },
  { value: "financial", label: "Financial Services" },
  { value: "customer-support", label: "Customer Support / SaaS" },
  { value: "other", label: "Other" },
]

const CALL_VOLUMES = [
  { value: "<500", label: "Under 500 / month" },
  { value: "500-2000", label: "500 – 2,000 / month" },
  { value: "2000-10000", label: "2,000 – 10,000 / month" },
  { value: "10000-50000", label: "10,000 – 50,000 / month" },
  { value: "50000+", label: "50,000+ / month" },
  { value: "unsure", label: "Not sure yet" },
]

const CURRENT_SETUPS = [
  { value: "human-agents", label: "In-house human agents" },
  { value: "ivr-humans", label: "IVR / phone tree + humans" },
  { value: "outsourced", label: "Outsourced call center / BPO" },
  { value: "other-ai", label: "Another AI voice tool" },
  { value: "voicemail", label: "Voicemail / nothing yet" },
]

const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1 – 3 months" },
  { value: "3-6-months", label: "3 – 6 months" },
  { value: "exploring", label: "Just exploring" },
]

const REQUIRED_FIELDS: (keyof FormData)[] = [
  "name",
  "email",
  "company",
  "industry",
  "callVolume",
  "currentSetup",
  "useCase",
]

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
    <span className="h-px flex-1 bg-border" />
    <span>{children}</span>
    <span className="h-px flex-1 bg-border" />
  </div>
)

const RequiredMark = () => <span className="text-destructive ml-0.5">*</span>

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  })

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelect = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const missing = REQUIRED_FIELDS.filter((key) => !formData[key].trim())
    if (missing.length > 0) {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Please complete the required fields marked with *.",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Please enter a valid work email address.",
      })
      return
    }

    setStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "",
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        setStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message:
            "Thanks — we received your request. We'll reply within one business day with a discovery-call link.",
        })
        setFormData(INITIAL_FORM)
      } else {
        setStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message:
            data?.error ||
            "We couldn't send your request. Please try again in a moment.",
        })
      }
    } catch {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message:
          "Network error — please try again or email us directly at hello@voycia.ai.",
      })
    }
  }

  const inputClass = "bg-background h-10"
  const selectTriggerClass =
    "w-full bg-background h-10 data-[size=default]:h-10"

  return (
    <section
      id="contact"
      className="relative my-12 sm:my-20 py-12 sm:py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage:
          'url("https://pulse-robot-template-105.lovable.app/Header-background.webp")',
      }}
    >
      {/* Theme-aware overlay */}
      <div className="absolute inset-0 bg-white/50 dark:bg-background/80 backdrop-blur-sm" />

      <div className="relative w-full z-10">
        <div className="text-center pb-8 sm:pb-12 px-4">
          <p className="inline-block px-4 py-2 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Tell us about your inbound calls
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A few quick details so we can scope the right voice agent for you.
            We&apos;ll reply within one business day.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-full px-4">
          <div className="bg-muted/30 dark:bg-card/60 border border-transparent dark:border-border rounded-2xl p-5 sm:p-8 md:p-10 w-full max-w-2xl z-10 backdrop-blur-sm shadow-elegant">
            {/* Status banners */}
            {status.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700 dark:text-green-400"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm">{status.message}</p>
              </motion.div>
            )}

            {status.isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-700 dark:text-red-400"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm">{status.message}</p>
              </motion.div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              {/* About you */}
              <fieldset className="space-y-4">
                <SectionLabel>About you</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full name
                      <RequiredMark />
                    </Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      className={inputClass}
                      value={formData.name}
                      onChange={handleInput}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Work email
                      <RequiredMark />
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      className={inputClass}
                      value={formData.email}
                      onChange={handleInput}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company
                      <RequiredMark />
                    </Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      className={inputClass}
                      value={formData.company}
                      onChange={handleInput}
                      autoComplete="organization"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      placeholder="Founder, Head of Ops, …"
                      className={inputClass}
                      value={formData.role}
                      onChange={handleInput}
                      autoComplete="organization-title"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Your inbound calls */}
              <fieldset className="space-y-4">
                <SectionLabel>Your inbound calls</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">
                      Industry
                      <RequiredMark />
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={handleSelect("industry")}
                    >
                      <SelectTrigger
                        id="industry"
                        className={selectTriggerClass}
                      >
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((i) => (
                          <SelectItem key={i.value} value={i.value}>
                            {i.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="callVolume">
                      Monthly inbound call volume
                      <RequiredMark />
                    </Label>
                    <Select
                      value={formData.callVolume}
                      onValueChange={handleSelect("callVolume")}
                    >
                      <SelectTrigger
                        id="callVolume"
                        className={selectTriggerClass}
                      >
                        <SelectValue placeholder="Pick a range" />
                      </SelectTrigger>
                      <SelectContent>
                        {CALL_VOLUMES.map((v) => (
                          <SelectItem key={v.value} value={v.value}>
                            {v.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="currentSetup">
                      How are inbound calls handled today?
                      <RequiredMark />
                    </Label>
                    <Select
                      value={formData.currentSetup}
                      onValueChange={handleSelect("currentSetup")}
                    >
                      <SelectTrigger
                        id="currentSetup"
                        className={selectTriggerClass}
                      >
                        <SelectValue placeholder="Select your current setup" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENT_SETUPS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>

              {/* What you want */}
              <fieldset className="space-y-4">
                <SectionLabel>What you want to automate</SectionLabel>
                <div className="space-y-2">
                  <Label htmlFor="useCase">
                    Describe your top inbound use case
                    <RequiredMark />
                  </Label>
                  <Textarea
                    id="useCase"
                    rows={4}
                    placeholder="e.g. 24/7 appointment booking for our 12-clinic network — we currently miss ~40% of after-hours calls and want to route real emergencies to an on-call human."
                    className="bg-background"
                    value={formData.useCase}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline to launch</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={handleSelect("timeline")}
                    >
                      <SelectTrigger
                        id="timeline"
                        className={selectTriggerClass}
                      >
                        <SelectValue placeholder="When do you need this live?" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 555 123 4567"
                      className={inputClass}
                      value={formData.phone}
                      onChange={handleInput}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer font-semibold"
                  disabled={status.isSubmitting}
                >
                  {status.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    "Request a discovery call"
                  )}
                </Button>
                <p className="mt-3 text-xs text-center text-muted-foreground">
                  No spam. We&apos;ll reply within one business day. Your details
                  stay between us.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
