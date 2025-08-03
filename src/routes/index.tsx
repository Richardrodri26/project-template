import { createFileRoute, Navigate } from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Navigate to='/login/' />
  )
}
