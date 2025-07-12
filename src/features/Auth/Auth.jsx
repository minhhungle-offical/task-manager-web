import { Route, Routes } from 'react-router-dom'
import { EmployeeLogin } from './pages/EmployeeLogin'
import { ManagerLogin } from './pages/ManagerLogin'

export default function Auth() {
  return (
    <Routes>
      <Route path="manager-login" element={<ManagerLogin />} />
      <Route path="employee-login" element={<EmployeeLogin />} />
    </Routes>
  )
}
