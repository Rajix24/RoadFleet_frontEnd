const baseUrl = import.meta.env.VITE_API_URL
const camionUrl = `${baseUrl}/camion`

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Camion request failed (HTTP ${response.status})`)
  }

  const responseText = await response.text()
  return responseText ? JSON.parse(responseText) : null
}

export async function createCamion(camionData) {
  return request(camionUrl, {
    method: "POST",
    body: JSON.stringify(camionData),
  })
}

export async function viewCamion() {
  const result = await request(camionUrl, { method: "GET" })
  return Array.isArray(result) ? result : result?.data ?? result?.camions ?? []
}

export async function updateCamion(id, camionData) {
  return request(`${camionUrl}/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(camionData),
  })
}

export async function deleteCamion(id) {
  return request(`${camionUrl}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}
