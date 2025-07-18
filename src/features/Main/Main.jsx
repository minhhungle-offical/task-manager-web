import { MainLayout } from '@/components/Layouts/MainLayout'
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Employees = lazy(() => import('@/features/Employees/pages/Employees'))
const Tasks = lazy(() => import('@/features/Tasks/pages/Tasks'))
const Messages = lazy(() => import('@/features/Messages/pages/Messages'))
export default function Main() {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="tasks" />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="employees" element={<Employees />} />
        <Route path="messages" element={<Messages />} />
      </Routes>
    </MainLayout>
  )
}
