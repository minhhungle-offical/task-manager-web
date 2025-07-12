import { MainLayout } from '@/components/Layouts/MainLayout'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function Main() {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="tasks" />} />
        <Route path="tasks" element={<div>task</div>} />
        <Route path="employees" element={<div>employee</div>} />
        <Route path="messages" element={<div>message</div>} />
      </Routes>
    </MainLayout>
  )
}
