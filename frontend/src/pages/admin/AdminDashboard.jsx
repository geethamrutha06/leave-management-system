import { useState, useEffect } from 'react'
import { getDashboard } from '../../services/api'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import Spinner from '../../components/common/Spinner'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ getDashboard().then(r=>setStats(r.data)).finally(()=>setLoading(false)) },[])

  if (loading) return <Spinner />

  const cards = [
    { label:'Total Employees',  value:stats.totalEmployees,  color:'blue',   icon:'👥' },
    { label:'Total Leaves',     value:stats.totalLeaves,     color:'purple', icon:'📋' },
    { label:'Pending',          value:stats.pendingLeaves,   color:'yellow', icon:'⏳' },
    { label:'Approved',         value:stats.approvedLeaves,  color:'green',  icon:'✅' },
    { label:'Rejected',         value:stats.rejectedLeaves,  color:'red',    icon:'❌' },
  ]

  const donut = {
    labels: ['Pending','Approved','Rejected'],
    datasets: [{
      data: [stats.pendingLeaves, stats.approvedLeaves, stats.rejectedLeaves],
      backgroundColor: ['#f59e0b','#10b981','#ef4444'],
      borderWidth: 0
    }]
  }

  const bar = {
    labels: ['Pending','Approved','Rejected'],
    datasets: [{
      label: 'Leave Requests',
      data: [stats.pendingLeaves, stats.approvedLeaves, stats.rejectedLeaves],
      backgroundColor: ['#f59e0b80','#10b98180','#ef444480'],
      borderColor:     ['#f59e0b',  '#10b981',  '#ef4444'],
      borderWidth: 2, borderRadius: 6
    }]
  }

  return (
    <div>
      <div className="page-title">📊 Admin Dashboard</div>
      <div className="row g-3 mb-4">
        {cards.map(c=>(
          <div key={c.label} className="col-6 col-md-4 col-lg">
            <div className={`stat-card ${c.color}`}>
              <div style={{fontSize:'1.5rem'}}>{c.icon}</div>
              <div className="value">{c.value}</div>
              <div className="label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-3">
        <div className="col-md-5">
          <div className="card p-4">
            <h6 className="fw-bold mb-3">Leave Status Distribution</h6>
            <Doughnut data={donut} options={{plugins:{legend:{position:'bottom'}},maintainAspectRatio:true}} />
          </div>
        </div>
        <div className="col-md-7">
          <div className="card p-4">
            <h6 className="fw-bold mb-3">Leave Requests Overview</h6>
            <Bar data={bar} options={{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}},maintainAspectRatio:true}} />
          </div>
        </div>
      </div>
    </div>
  )
}
