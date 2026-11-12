const articleDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Riga" })

/** "17 May 2026" */
export function formatArticleDate(iso: string): string {
  return articleDate.format(new Date(`${iso}T12:00:00Z`)).replace("Sept", "Sep")
}
