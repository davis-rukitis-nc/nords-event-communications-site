import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import RecordsBoard, { riga23Records } from "@/components/records-board"

describe("RecordsBoard", () => {
  it("renders every record with an accessible time", () => {
    render(<RecordsBoard subtitle="Riga 2023" />)
    for (const r of riga23Records) {
      expect(screen.getByText(r.athlete, { exact: false })).toBeInTheDocument()
      expect(screen.getByText(r.time)).toHaveClass("sr-only")
    }
  })

  it("lights the right segments (1 = b+c only)", () => {
    const { container } = render(<RecordsBoard />)
    // First digit of 1:26:16 is in the third display.
    const displays = container.querySelectorAll("li")
    const firstDigit = displays[2].querySelector("svg")!
    const lit = [...firstDigit.querySelectorAll("polygon")].map((p) => p.getAttribute("class")?.includes("amber"))
    expect(lit).toEqual([false, true, true, false, false, false, false])
  })
})
