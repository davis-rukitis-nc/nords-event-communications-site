import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("renders button with variant", () => {
    render(<Button variant="outline">Outlined</Button>)
    const button = screen.getByRole("button", { name: /outlined/i })
    expect(button).toHaveClass("border")
  })

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
