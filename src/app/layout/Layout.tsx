import { Suspense } from "react"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <>
        <div>Header</div>
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet/>
        </Suspense>
        <div>Footer</div>
    </>
  )
}

