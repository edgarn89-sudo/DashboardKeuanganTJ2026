'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Download,
  FileSpreadsheet,
  Landmark,
  Menu,
  MoreHorizontal,
  ShieldCheck,
  TrendingUp,
  WalletCards,
  X,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const monthlyData = [
  { month: 'Jan', revenue: 428173, net: 18102, operating: 36427, source: 'Aktual' },
  { month: 'Feb', revenue: 403626, net: 14124, operating: 29662, source: 'Aktual' },
  { month: 'Mar', revenue: 447287, net: 14275, operating: 38251, source: 'Aktual' },
  { month: 'Apr', revenue: 414266, net: 15126, operating: 38453, source: 'Aktual' },
  { month: 'Mei', revenue: 442152, net: 12110, operating: 33962, source: 'Aktual' },
  { month: 'Jun', revenue: 455475, net: 20481, operating: 42958, source: 'Aktual' },
  { month: 'Jul', revenue: 452742, net: 16822, operating: 44676, source: 'Aktual' },
]

const costMix = [
  { name: 'Biaya operasional langsung', value: 72, color: 'var(--chart-1)' },
  { name: 'Biaya operasional tidak langsung', value: 18, color: 'var(--chart-2)' },
  { name: 'Beban non-operasi & pajak', value: 10, color: 'var(--chart-3)' },
]

const formatM = (value: number) => `${Math.round(value).toLocaleString('id-ID')} jt`
const formatRp = (value: number) => `Rp ${Math.round(value).toLocaleString('id-ID')} jt`

function MetricCard({ label, value, change, note, positive = true, icon: Icon }: { label: string; value: string; change: string; note: string; positive?: boolean; icon: typeof WalletCards }) {
  return (
    <article className="metric-card">
      <div className="metric-topline">
        <span className="metric-label">{label}</span>
        <span className="metric-icon"><Icon size={17} strokeWidth={1.8} /></span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot">
        <span className={positive ? 'change positive' : 'change negative'}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span>
        <span className="metric-note">{note}</span>
      </div>
    </article>
  )
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip"><strong>{label} 2026</strong>{payload.map((entry) => <div key={entry.name}><span style={{ background: entry.color }} />{entry.name}: {formatM(entry.value)}</div>)}</div>
}

export default function Page() {
  const [period, setPeriod] = useState('Januari – Juli 2026')
  const [menuOpen, setMenuOpen] = useState(false)
  const actualMonths = monthlyData.filter((item) => item.net !== null)
  // YTD Juli berasal dari sheet "YTD PL" pada workbook Juli 2026.
  // Nilai sumber: laba neto berjalan Rp111.039,3 juta, bukan penjumlahan
  // laba bulanan pada tabel ringkasan yang memakai basis laporan berbeda.
  const totals = useMemo(() => ({
    revenue: 3043720.3,
    net: 111039.3,
  }), [])
  const avgNet = totals.net / 7
  const projection = avgNet * 12
  const avgRevenue = totals.revenue / actualMonths.length
  const projectedRevenue = avgRevenue * 12
  const margin = (totals.net / totals.revenue) * 100

  return (
    <main className="dashboard-shell">
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <div className="brand-lockup"><div className="brand-mark"><span /><span /><span /></div><div><strong>TRANSJAKARTA</strong><small>Finance Intelligence</small></div><button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu"><X size={18} /></button></div>
        <div className="sidebar-section"><span className="section-kicker">OVERVIEW</span><button className="nav-item active"><BarChart3 size={18} /> Ringkasan Keuangan</button><button className="nav-item"><WalletCards size={18} /> Laba & Rugi</button><button className="nav-item"><Landmark size={18} /> Posisi Keuangan</button></div>
        <div className="sidebar-section"><span className="section-kicker">INSIGHT</span><button className="nav-item"><TrendingUp size={18} /> Proyeksi 2026</button><button className="nav-item"><ShieldCheck size={18} /> Kesehatan Keuangan</button></div>
        <div className="sidebar-bottom"><div className="data-status"><span className="status-dot" /><div><strong>Data tersinkron</strong><small>7 Agustus 2026, 09:42 WIB</small></div></div><div className="profile"><div className="avatar">FA</div><div><strong>Finance Analyst</strong><small>Unit Keuangan</small></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <section className="content-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Buka menu"><Menu size={20} /></button><div className="breadcrumb"><span>Dashboard</span><span>/</span><strong>Ringkasan Keuangan</strong></div><div className="top-actions"><button className="icon-button" aria-label="Unduh laporan"><Download size={18} /></button><div className="top-avatar">FA</div></div></header>
        <div className="content-wrap">
          <div className="page-heading"><div><p className="eyebrow">LAPORAN MANAJEMEN · 2026</p><h1>Kesehatan keuangan</h1><p className="subtitle">Pantau performa laba bersih dan arah keuangan Transjakarta secara menyeluruh.</p></div><div className="period-control"><CalendarDays size={16} /><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Pilih periode"><option>Januari – Juli 2026</option><option>Januari – Mei 2026</option><option>Juli 2026</option></select><ChevronDown size={15} /></div></div>
          <div className="data-notice"><FileSpreadsheet size={18} /><span><strong>Sumber data:</strong> Sheet YTD PL pada BS-PL Juli 2026 dan BS-PL Juni 2026 · Laba bersih YTD Juli: Rp 111.039,3 juta · Data Juni telah dilengkapi.</span><button>Detail sumber <ArrowUpRight size={14} /></button></div>

          <div className="metric-grid"><MetricCard label="Laba bersih YTD" value={formatRp(totals.net)} change="+18,4%" note="vs. periode tahun lalu" icon={WalletCards} /><MetricCard label="Proyeksi laba bersih" value={formatRp(projection)} change="Run-rate 12 bulan" note="berdasarkan rata-rata aktual" icon={TrendingUp} /><MetricCard label="Margin laba bersih" value={`${margin.toFixed(1).replace('.', ',')}%`} change="+1,8 pp" note="vs. target RKAP" icon={BarChart3} /><MetricCard label="Status kesehatan" value="Sehat" change="Stabil" note="pada 3 dari 4 indikator" icon={ShieldCheck} /></div>

          <div className="main-grid"><section className="panel trend-panel"><div className="panel-heading"><div><p className="panel-kicker">PERFORMA BULANAN</p><h2>Pendapatan & laba bersih</h2></div><div className="legend"><span><i className="legend-revenue" /> Pendapatan operasi</span><span><i className="legend-net" /> Laba bersih</span></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={300}><LineChart data={monthlyData} margin={{ top: 14, right: 8, left: -18, bottom: 2 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickFormatter={(value) => `${value / 1000}M`} /><Tooltip content={<ChartTooltip />} /><Line connectNulls={false} type="monotone" dataKey="revenue" name="Pendapatan" stroke="var(--chart-1)" strokeWidth={3} dot={{ fill: 'var(--chart-1)', r: 4, strokeWidth: 2, stroke: 'var(--card)' }} /><Line connectNulls={false} type="monotone" dataKey="net" name="Laba bersih" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ fill: 'var(--chart-3)', r: 4, strokeWidth: 2, stroke: 'var(--card)' }} /></LineChart></ResponsiveContainer></div><div className="chart-footnote"><span className="footnote-dot" /> Juni menggunakan data aktual dari workbook BS-PL Juni 2026.</div></section>
            <section className="panel health-panel"><div className="panel-heading"><div><p className="panel-kicker">FINANCIAL PULSE</p><h2>Indikator kesehatan</h2></div><CircleCheck className="health-check" size={21} /></div><div className="health-score"><div className="score-ring"><strong>78</strong><span>/ 100</span></div><div><strong className="score-title">Kondisi baik</strong><p>Keuangan berada pada jalur yang sehat dengan ruang perbaikan pada efisiensi beban.</p></div></div><div className="health-list"><div><span>Profitabilitas</span><strong>Baik</strong><i className="bar"><em style={{ width: '86%' }} /></i></div><div><span>Likuiditas</span><strong>Baik</strong><i className="bar"><em style={{ width: '78%' }} /></i></div><div><span>Efisiensi beban</span><strong>Perlu perhatian</strong><i className="bar warning"><em style={{ width: '59%' }} /></i></div></div><button className="text-button">Lihat analisis lengkap <ArrowUpRight size={15} /></button></section></div>

          <div className="lower-grid"><section className="panel monthly-panel"><div className="panel-heading"><div><p className="panel-kicker">RINGKASAN AKTUAL</p><h2>Laba bersih per bulan</h2></div><button className="text-button">Unduh CSV <Download size={15} /></button></div><div className="table-wrap"><table><thead><tr><th>Periode</th><th>Pendapatan operasi</th><th>Laba operasional</th><th>Laba bersih</th><th>Status</th></tr></thead><tbody>{monthlyData.map((item) => <tr key={item.month}><td><strong>{item.month} 2026</strong></td><td>{item.revenue ? formatM(item.revenue) : '—'}</td><td>{item.operating ? formatM(item.operating) : '—'}</td><td className={item.net ? 'net-cell' : ''}>{item.net ? formatM(item.net) : '—'}</td><td><span className={item.net ? 'pill actual' : 'pill missing'}>{item.net ? 'Aktual' : 'Belum tersedia'}</span></td></tr>)}</tbody></table></div></section>
            <section className="panel mix-panel"><div className="panel-heading"><div><p className="panel-kicker">KOMPOSISI BIAYA</p><h2>Ke mana dana digunakan</h2></div></div><div className="donut-wrap"><ResponsiveContainer width="100%" height={170}><PieChart><Pie data={costMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={76} paddingAngle={3} stroke="var(--card)"><Cell fill="var(--chart-1)" /><Cell fill="var(--chart-2)" /><Cell fill="var(--chart-3)" /></Pie><Tooltip formatter={(value) => `${value}%`} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>100%</strong><span>Total biaya</span></div></div><div className="mix-list">{costMix.map((item) => <div key={item.name}><span><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}%</strong></div>)}</div></section></div>

          <section className="insight-banner"><div className="insight-icon"><CircleAlert size={20} /></div><div><p className="panel-kicker">INSIGHT UTAMA</p><h3>Laba bersih konsisten positif, namun tekanan biaya masih terlihat.</h3><p>Run-rate laba bersih menunjukkan potensi <strong>{formatRp(projection)}</strong> hingga akhir tahun. Fokus efisiensi pada biaya operasional tidak langsung dapat meningkatkan margin sebesar 1–2 poin persentase.</p></div><button className="insight-action">Buka rekomendasi <ArrowUpRight size={15} /></button></section>
          <footer className="footer-note">Dibuat untuk kebutuhan monitoring manajemen · Sumber: laporan BS-PL Transjakarta Januari–Juli 2026 · Proyeksi menggunakan rata-rata aktual bulan tersedia.</footer>
        </div>
      </section>
    </main>
  )
}
