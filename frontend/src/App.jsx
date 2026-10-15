import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './services/api';

import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import GlassCard from './components/common/GlassCard';
import Toast from './components/common/Toast';
import Modal from './components/common/Modal';

import StatCard from './components/dashboard/StatCard';
import MetricChart from './components/dashboard/MetricChart';
import ActivityFeed from './components/dashboard/ActivityFeed';
import QuickActions from './components/dashboard/QuickActions';

import ReportFilters from './components/reports/ReportFilters';
import ReportTable from './components/reports/ReportTable';
import CreateReportModal from './components/reports/CreateReportModal';

import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

import {
  FileText,
  Users,
  ShieldCheck,
  Download,
  PlusCircle,
  Database,
  Cpu,
  Layers,
  Sparkles,
  Server
} from 'lucide-react';
import './App.css';

const MainApp = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Dashboard Telemetry State
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [timeframe, setTimeframe] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Reports State
  const [reports, setReports] = useState([]);
  const [reportPage, setReportPage] = useState(1);
  const [reportTotalPages, setReportTotalPages] = useState(1);
  const [reportTotal, setReportTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [reportsLoading, setReportsLoading] = useState(false);

  // Modals & Notifications
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Window Resize Listener for Responsive Sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 860;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch Dashboard Stats
  const loadDashboardData = async (tf = timeframe) => {
    try {
      setIsRefreshing(true);
      const [statsRes, chartRes, activityRes] = await Promise.all([
        api.getStats().catch(() => null),
        api.getCharts(tf).catch(() => null),
        api.getActivity().catch(() => null)
      ]);

      if (statsRes?.success) setStats(statsRes.stats);
      if (chartRes?.success) setChartData(chartRes.chart);
      if (activityRes?.success) setActivities(activityRes.activities);
    } catch (err) {
      console.error('Failed to load dashboard metrics', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fetch Reports
  const loadReports = async () => {
    try {
      setReportsLoading(true);
      const res = await api.getReports({
        category: selectedCategory,
        status: selectedStatus,
        search: searchQuery,
        page: reportPage,
        limit: 8
      });
      if (res?.success) {
        setReports(res.reports);
        setReportPage(res.page);
        setReportTotalPages(res.totalPages);
        setReportTotal(res.total);
      }
    } catch (err) {
      console.error('Failed to load reports', err);
    } finally {
      setReportsLoading(false);
    }
  };

  // Initial Data Load
  useEffect(() => {
    loadDashboardData(timeframe);
  }, [timeframe]);

  useEffect(() => {
    loadReports();
  }, [reportPage, selectedCategory, selectedStatus, searchQuery]);

  // Handlers
  const handleTimeframeChange = (newTf) => {
    setTimeframe(newTf);
  };

  const handleCreateReport = async (reportData) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      throw new Error('Please sign in or select a demo role to publish reports');
    }
    const res = await api.createReport(reportData);
    if (res?.success) {
      showToast('Report synthesized and published successfully!', 'success');
      loadReports();
      loadDashboardData();
    }
  };

  const handleExportReport = async (id, format) => {
    try {
      await api.exportReport(id, format);
      showToast(`Exported report in ${format.toUpperCase()} format`, 'success');
      loadReports();
      loadDashboardData();
    } catch (err) {
      showToast('Export failed. Please check network.', 'error');
    }
  };

  const handleDeleteReport = async (id) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      showToast('Authentication required to delete records', 'warning');
      return;
    }
    if (!window.confirm('Are you sure you want to remove this report?')) return;
    try {
      await api.deleteReport(id);
      showToast('Report deleted successfully', 'success');
      loadReports();
      loadDashboardData();
    } catch (err) {
      showToast(err.message || 'Deletion failed', 'error');
    }
  };

  return (
    <div className="app-container">
      {/* Background Ambient Glowing Orbs */}
      <div className="ambient-glow-wrapper">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />
      </div>

      {/* Floating Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      {/* Main App Layout */}
      <main className="main-content">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeTab={activeTab}
          isMobile={isMobile}
        />

        {/* ================= VIEW: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Top Stat Cards */}
            <div className="dashboard-grid">
              <StatCard
                title="Generated Reports"
                value={stats?.totalReports?.value ?? '24'}
                trend={stats?.totalReports?.trend ?? '+14.8%'}
                isPositive={true}
                icon={FileText}
                accentColor="#06b6d4"
                subtitle="Aggregated across 4 business units"
              />
              <StatCard
                title="Active Team Members"
                value={stats?.activeUsers?.value ?? '8'}
                trend={stats?.activeUsers?.trend ?? '+22.4%'}
                isPositive={true}
                icon={Users}
                accentColor="#8b5cf6"
                subtitle="Data analysts & platform admins"
              />
              <StatCard
                title="Processing Success Rate"
                value={stats?.completionRate?.value ?? '98%'}
                trend={stats?.completionRate?.trend ?? '+4.2%'}
                isPositive={true}
                icon={ShieldCheck}
                accentColor="#10b981"
                subtitle="Zero unhandled pipeline exceptions"
              />
              <StatCard
                title="Total Exports & Deliveries"
                value={stats?.downloads?.value ?? '184'}
                trend={stats?.downloads?.trend ?? '+31.0%'}
                isPositive={true}
                icon={Download}
                accentColor="#f59e0b"
                subtitle="CSV & JSON automated exports"
              />
            </div>

            {/* Middle Section: Chart + Activity */}
            <div className="analytics-two-col">
              <MetricChart
                chartData={chartData}
                timeframe={timeframe}
                onTimeframeChange={handleTimeframeChange}
                loading={isRefreshing}
              />
              <ActivityFeed activities={activities} />
            </div>

            {/* Operator Quick Actions & Recent Reports Preview */}
            <div className="analytics-two-col">
              <QuickActions
                onOpenCreateModal={() => setIsCreateModalOpen(true)}
                onNavigateReports={() => setActiveTab('reports')}
                onRefreshStats={() => loadDashboardData()}
                isRefreshing={isRefreshing}
              />

              <GlassCard style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} color="#8b5cf6" />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                      Latest Synthesis
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className="glass-pill"
                    style={{ cursor: 'pointer', color: 'var(--primary-accent)' }}
                  >
                    View All →
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {reports.slice(0, 3).map((r) => (
                    <div
                      key={r._id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: 'var(--glass-surface-subtle)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ minWidth: 0, paddingRight: '8px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {r.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {r.category} • {r.authorName}
                        </div>
                      </div>
                      <span className="glass-pill" style={{ fontSize: '0.65rem' }}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* ================= VIEW: REPORTS ================= */}
        {activeTab === 'reports' && (
          <div className="report-section">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px'
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  Analytics & Reports Repository
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                  Filter, inspect, synthesize, and export granular enterprise intelligence.
                </p>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn btn-primary"
                style={{ padding: '10px 18px', borderRadius: '12px' }}
              >
                <PlusCircle size={16} />
                Generate New Report
              </button>
            </div>

            <ReportFilters
              search={searchQuery}
              setSearch={setSearchQuery}
              category={selectedCategory}
              setCategory={(c) => {
                setSelectedCategory(c);
                setReportPage(1);
              }}
              status={selectedStatus}
              setStatus={(s) => {
                setSelectedStatus(s);
                setReportPage(1);
              }}
              totalResults={reportTotal}
            />

            <ReportTable
              reports={reports}
              page={reportPage}
              totalPages={reportTotalPages}
              onPageChange={setReportPage}
              onExport={handleExportReport}
              onDelete={handleDeleteReport}
              loading={reportsLoading}
            />
          </div>
        )}

        {/* ================= VIEW: ACTIVITY ================= */}
        {activeTab === 'activity' && (
          <div className="report-section">
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                System Audit & Security Timeline
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Immutable event trail of platform interactions, report generations, and logins.
              </p>
            </div>
            <ActivityFeed activities={activities} />
          </div>
        )}

        {/* ================= VIEW: CONFIGURATION / SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="report-section">
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                Platform Telemetry & Architecture
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Current system parameters and runtime specifications.
              </p>
            </div>

            <div className="dashboard-grid">
              <GlassCard style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Database size={20} color="#10b981" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                    MongoDB Instance
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Host</span>
                    <strong>127.0.0.1:27017</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Database</span>
                    <strong>pulse_dashboard</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                    <span style={{ color: '#10b981', fontWeight: 600 }}>Active / Connected</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Server size={20} color="#06b6d4" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                    Express.js REST Engine
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Port</span>
                    <strong>5000</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Middleware</span>
                    <strong>CORS, JWT, Mongoose</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Health Endpoint</span>
                    <strong style={{ color: '#06b6d4' }}>/api/health</strong>
                  </div>
                </div>
              </GlassCard>

              <GlassCard style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Cpu size={20} color="#8b5cf6" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                    Client Application
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Framework</span>
                    <strong>React 19 + Vite</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Styling</span>
                    <strong>Vanilla CSS Glassmorphism</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Aesthetic</span>
                    <strong style={{ color: '#8b5cf6' }}>Dark / Light Dual Engine</strong>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Create Report */}
      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSuccess={handleCreateReport}
      />

      {/* Modal: Auth */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title={authModalMode === 'login' ? 'Sign In to Workspace' : 'Create New Account'}
        maxWidth="460px"
      >
        {authModalMode === 'login' ? (
          <LoginForm
            onSwitchToRegister={() => setAuthModalMode('register')}
            onSuccess={() => {
              setIsAuthModalOpen(false);
              showToast('Welcome back!', 'success');
            }}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={() => setAuthModalMode('login')}
            onSuccess={() => {
              setIsAuthModalOpen(false);
              showToast('Account created and authenticated!', 'success');
            }}
          />
        )}
      </Modal>

      {/* Floating Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
