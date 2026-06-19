import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader2, LogOut, FileText, Plus, ArrowLeft, Scale, Search, ListChecks, HelpCircle, Globe, BarChart3 } from 'lucide-react'
import { useAuth } from '@/lib/auth'

export function AdminLayout() {
  const { session, loading, signOut } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6FB]">
        <Loader2 className="animate-spin text-[#1C3A64]" size={28} />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex">
      <aside className="w-60 bg-white border-r border-[#1C3A64]/10 flex flex-col">
        <div className="px-6 py-6 border-b border-[#1C3A64]/10">
          <img src="/img/logobg.png" alt="Banton Group" className="h-9 w-auto object-contain" />
          <p className="text-[#888888] text-[11px] mt-2 tracking-[0.15em] uppercase">Admin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          <SidebarGroup label="Blog">
            <SidebarLink to="/admin" end icon={<FileText size={14} />}>Articles</SidebarLink>
            <SidebarLink to="/admin/new" icon={<Plus size={14} />}>New article</SidebarLink>
          </SidebarGroup>

          <SidebarGroup label="Class Actions">
            <SidebarLink to="/admin/cases" end icon={<Scale size={14} />}>Cases</SidebarLink>
            <SidebarLink to="/admin/cases/new" icon={<Plus size={14} />}>New case</SidebarLink>
            <SidebarLink to="/admin/investigations" icon={<Search size={14} />}>Investigations</SidebarLink>
            <SidebarLink to="/admin/past-actions" icon={<ListChecks size={14} />}>Past actions</SidebarLink>
          </SidebarGroup>

          <SidebarGroup label="Site">
            <SidebarLink to="/admin/seo" icon={<Globe size={14} />}>SEO</SidebarLink>
            <SidebarLink to="/admin/analytics" icon={<BarChart3 size={14} />}>Analytics</SidebarLink>
          </SidebarGroup>

          <SidebarGroup label="Help">
            <SidebarLink to="/admin/help" icon={<HelpCircle size={14} />}>Guide</SidebarLink>
          </SidebarGroup>
        </nav>
        <div className="px-3 py-4 border-t border-[#1C3A64]/10 space-y-1">
          <div className="px-3 pb-2 text-[11px] text-[#888888] truncate" title={session.user.email ?? ''}>
            {session.user.email}
          </div>
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[#1C3A64] hover:bg-[#1C3A64]/[0.06] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to site
          </Link>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[#1C3A64] hover:bg-[#1C3A64]/[0.06] transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-3 mb-1.5 text-[10px] tracking-[0.15em] uppercase text-[#888888] font-medium">
        {label}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function SidebarLink({
  to,
  end,
  icon,
  children,
}: {
  to: string
  end?: boolean
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
          isActive
            ? 'bg-[#1C3A64] text-white'
            : 'text-[#1C3A64] hover:bg-[#1C3A64]/[0.06]'
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  )
}
