import { CampaignDto } from './dtos/campaign.dto'

export const criarCampanha = async (campanha: CampaignDto) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/criarServico/eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMWUFNbUUwVUZBd1hyUXJGbEgwSlNrMmtCR3FSblFiMDFWRG55a3R1UE5NIn0.eyJqdGkiOiJiZDczZDY0OS1lZTU5LTQ4ZTgtYmIxNi04MzUxYjY3NzEwMTciLCJleHAiOjE3NTA4ODE0OTAsIm5iZiI6MCwiaWF0IjoxNzUwODgwODkwLCJpc3MiOiJodHRwczovL2F1dGgtaWRyaW9ob20uYXBwcy5yaW8uZ292LmJyL2F1dGgvcmVhbG1zL2lkcmlvX2NpZGFkYW8iLCJhdWQiOlsiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiI2MGZlMWE0Yi1mMmUyLTQyN2QtODFiMC1kZTVhMGM4ZDU1YmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb250cmFjaGVxdWUtYXBpLmFwcHMub2NwLnJpby5nb3YuYnIiLCJub25jZSI6ImE1OGM4ZDYyLWM2N2MtNDc1YS04NzNiLWI0YWI0MzkyYzM0YSIsImF1dGhfdGltZSI6MTc1MDg4MDg4OSwic2Vzc2lvbl9zdGF0ZSI6IjgwNTBmMTkzLWMzYjQtNGZkNS05MDE1LTBhNDc4M2Y0ZGFmOCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9jb250cmFjaGVxdWVkZXYuYXBwcy5vY3AucmlvLmdvdi5iciIsImh0dHBzOi8vYXBpLWRpcmZob20uYXBwcy5vY3AucmlvLmdvdi5iciIsImh0dHBzOi8vY29udHJhY2hlcXVlaG9tLmFwcHMub2NwLnJpby5nb3YuYnIiLCJodHRwczovL2FwaS1jb250cmFjaGVxdWVob20uYXBwcy5vY3AucmlvLmdvdi5iciIsImh0dHBzOi8vYXBpLWRpcmZkZXYuYXBwcy5vY3AucmlvLmdvdi5iciIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImh0dHBzOi8vYXBpLWNvbnRyYWNoZXF1ZWRldi5hcHBzLm9jcC5yaW8uZ292LmJyIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImNhcmlvY2EtcmlvIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkVEVUFSRE8gQU5UT05JTyBDQVNTQU5PIERFIFPDgSIsInByZWZlcnJlZF91c2VybmFtZSI6IjE2MjMyMzUwNzMxIiwiZ2l2ZW5fbmFtZSI6IkVEVUFSRE8iLCJmYW1pbHlfbmFtZSI6IkFOVE9OSU8gQ0FTU0FOTyBERSBTw4EiLCJlbWFpbCI6ImVkdWFyZG9jYXNzYW5vZGVzYUB1b2wuY29tLmJyIn0.q5UzlDNimXJdrmQ9rODSmK1OXtTwQ5ksyF0T-j-LAqBiQtv0FA2lQ20BZQEqszUrtOM38tXm2YicxL_81s9MNNIspOGlySDn7RvT0auKduFm5e1EL3jYl_Yf4otisuGZ615RIoKZaBIjAG8E9odwrsG2zA9isqKgvQHOuv5BMho1mNJF2nWtEAAJzttp-7aJGhlcEtZXJDlZWgWfH7_DD0FWGzgNIo5LI0dneeQB_vVckGBrz07009vpPl6-zR7vKrd3mwXBji_DzIbvdYWCCBFkyQYta8QeCIT5xaXAfSZ3j_zFyknWKTqdgHcB91i8TpTUJ34zEbgjZd3vUHEWOg`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(campanha),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const text = await response.text()
  if (!text) {
    return { success: true }
  }

  try {
    return JSON.parse(text)
  } catch {
    return { success: true, message: text }
  }
}
