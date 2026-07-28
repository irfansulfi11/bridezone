import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import AssistantFab from './components/AssistantFab'
import AppInstallBanner from './components/AppInstallBanner'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Vendors from './pages/Vendors'
import VendorDetail from './pages/VendorDetail'
import Venues from './pages/Venues'
import Photos from './pages/Photos'
import RealWeddings from './pages/RealWeddings'
import Blog from './pages/Blog'
import EInvites from './pages/EInvites'
import Plan from './pages/Plan'
import Collections from './pages/Collections'
import CollectionDetail from './pages/CollectionDetail'
import Login from './pages/Login'
import VendorDashboard from './pages/VendorDashboard'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminApprovals from './pages/admin/AdminApprovals'
import AdminEnquiries from './pages/admin/AdminEnquiries'
import AdminCollections from './pages/admin/AdminCollections'
import AdminCategories from './pages/admin/AdminCategories'
import { NotFound } from './pages/Placeholder'

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppInstallBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Bottom padding so the fixed tab bar never covers the footer's last row */}
      <div className="h-[calc(3.5rem+env(safe-area-inset-bottom))] lg:hidden" />
      <AssistantFab />
      <MobileTabBar />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public + logged-in vendor pages share the site chrome */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorDetail />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/real-weddings" element={<RealWeddings />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/e-invites" element={<EInvites />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Standalone branded login (no site chrome) */}
        <Route path="/login" element={<Login />} />

        {/* Admin panel — own sidebar shell, admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="approvals" element={<AdminApprovals />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Routes>
    </>
  )
}
