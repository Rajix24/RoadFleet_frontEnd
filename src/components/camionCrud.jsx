import { useCallback, useEffect, useState } from "react"
import { createCamion, deleteCamion, updateCamion, viewCamion } from "@/api/CamionApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const emptyCamion = { matricule: "", marque: "", modele: "", capacite: "" }
const fields = [
  ["matricule", "Registration"],
  ["marque", "Make"],
  ["modele", "Model"],
  ["capacite", "Capacity"],
]

function getCamionId(camion) {
  return camion?._id ?? camion?.id
}

export default function CamionCrud() {
  const [camions, setCamions] = useState([])
  const [form, setForm] = useState(emptyCamion)
  const [editingId, setEditingId] = useState(null)
  const [selectedCamion, setSelectedCamion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const loadCamions = useCallback(async () => {
    try {
      setError("")
      setCamions(await viewCamion())
    } catch (requestError) {
      setError(requestError.message || "Unable to load trucks")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCamions()
  }, [loadCamions])

  function startEditing(camion) {
    setEditingId(getCamionId(camion))
    setForm(Object.fromEntries(fields.map(([key]) => [key, camion[key] ?? ""])))
    setSelectedCamion(null)
    setError("")
  }

  function cancelEditing() {
    setEditingId(null)
    setForm(emptyCamion)
  }

  async function submitCamion(event) {
    event.preventDefault()
    setSaving(true)
    setError("")
    const camionData = {
      ...form,
      ...(form.capacite !== "" ? { capacite: Number(form.capacite) } : {}),
    }

    try {
      if (editingId !== null && editingId !== undefined) {
        await updateCamion(editingId, camionData)
      } else {
        await createCamion(camionData)
      }
      cancelEditing()
      await loadCamions()
    } catch (requestError) {
      setError(requestError.message || "Unable to save truck")
    } finally {
      setSaving(false)
    }
  }

  async function removeCamion(camion) {
    const id = getCamionId(camion)
    if (id === undefined || id === null) {
      setError("This truck has no ID, so it cannot be deleted.")
      return
    }
    try {
      setError("")
      await deleteCamion(id)
      if (editingId === id) cancelEditing()
      if (selectedCamion === camion) setSelectedCamion(null)
      await loadCamions()
    } catch (requestError) {
      setError(requestError.message || "Unable to delete truck")
    }
  }

  return (
    <section className="space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Truck management</h1>
          <p className="text-sm text-muted-foreground">Create, view, edit, and delete trucks.</p>
        </div>
        <Button type="button" variant="outline" onClick={loadCamions} disabled={loading}>
          Refresh
        </Button>
      </header>

      <form onSubmit={submitCamion} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
        <h2 className="text-lg font-medium sm:col-span-2">{editingId !== null ? "Edit truck" : "Add truck"}</h2>
        {fields.map(([key, label]) => (
          <label key={key} className="grid gap-1 text-sm font-medium">
            {label}
            <Input
              required={key === "matricule"}
              type={key === "capacite" ? "number" : "text"}
              min={key === "capacite" ? "0" : undefined}
              value={form[key]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
            />
          </label>
        ))}
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : editingId !== null ? "Save changes" : "Create truck"}</Button>
          {editingId !== null && <Button type="button" variant="outline" onClick={cancelEditing}>Cancel</Button>}
        </div>
      </form>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              {fields.map(([, label]) => <th key={label} className="p-3 font-medium">{label}</th>)}
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={fields.length + 1}>Loading trucks…</td></tr>
            ) : camions.length === 0 ? (
              <tr><td className="p-3" colSpan={fields.length + 1}>No trucks found.</td></tr>
            ) : camions.map((camion, index) => (
              <tr key={getCamionId(camion) ?? index} className="border-t">
                {fields.map(([key]) => <td key={key} className="p-3">{camion[key] ?? "—"}</td>)}
                <td className="flex flex-wrap gap-2 p-3">
                  <Button type="button" size="sm" variant="outline" onClick={() => setSelectedCamion(camion)}>View</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => startEditing(camion)}>Edit</Button>
                  <Button type="button" size="sm" variant="destructive" onClick={() => removeCamion(camion)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCamion && (
        <div className="rounded-lg border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-medium">Truck details</h2>
            <Button type="button" size="sm" variant="ghost" onClick={() => setSelectedCamion(null)}>Close</Button>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(selectedCamion).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                <dd>{typeof value === "object" && value !== null ? JSON.stringify(value) : String(value ?? "—")}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  )
}
