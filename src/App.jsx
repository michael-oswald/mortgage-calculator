import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mortgageAmount, setMortgageAmount] = useState('500000')
  const [interestRate, setInterestRate] = useState('6.30')
  const [calculations, setCalculations] = useState(null)
  const [expandedSchedules, setExpandedSchedules] = useState({
    15: false,
    30: false,
    50: false
  })

  const calculateMortgage = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12
    const numPayments = years * 12

    // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    // Generate amortization schedule
    let balance = principal
    const schedule = []
    let totalInterest = 0

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment
      totalInterest += interestPayment

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      })
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPayment: monthlyPayment * numPayments,
      schedule
    }
  }

  const handleCalculate = () => {
    const principal = parseFloat(mortgageAmount)
    const rate = parseFloat(interestRate)

    if (isNaN(principal) || isNaN(rate) || principal <= 0 || rate <= 0) {
      alert('Please enter valid mortgage amount and interest rate')
      return
    }

    const results = {
      15: calculateMortgage(principal, rate, 15),
      30: calculateMortgage(principal, rate, 30),
      50: calculateMortgage(principal, rate, 50)
    }

    setCalculations(results)
  }

  const toggleSchedule = (years) => {
    setExpandedSchedules(prev => ({
      ...prev,
      [years]: !prev[years]
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  // Calculate on initial load
  useEffect(() => {
    handleCalculate()
  }, [])

  const MortgageColumn = ({ years, data }) => (
    <div className="mortgage-column">
      <h2>{years}-Year Mortgage</h2>

      <div className="result-item">
        <span className="label">Monthly Payment</span>
        <span className="value">{formatCurrency(data.monthlyPayment)}</span>
      </div>

      <div className="result-item">
        <span className="label">Total Interest</span>
        <span className="value interest">{formatCurrency(data.totalInterest)}</span>
      </div>

      <div className="result-item">
        <span className="label">Total Payment</span>
        <span className="value">{formatCurrency(data.totalPayment)}</span>
      </div>

      <div className="amortization-section">
        <button
          className="toggle-schedule"
          onClick={() => toggleSchedule(years)}
        >
          {expandedSchedules[years] ? '− Hide' : '+ Show'} Amortization Schedule
        </button>

        {expandedSchedules[years] && (
          <div className="schedule-table">
            <div className="schedule-header">
              <span>Month</span>
              <span>Payment</span>
              <span>Principal</span>
              <span>Interest</span>
              <span>Balance</span>
            </div>
            <div className="schedule-body">
              {data.schedule.map((row) => (
                <div key={row.month} className="schedule-row">
                  <span>{row.month}</span>
                  <span>{formatCurrency(row.payment)}</span>
                  <span>{formatCurrency(row.principal)}</span>
                  <span>{formatCurrency(row.interest)}</span>
                  <span>{formatCurrency(row.balance)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="app">
      <div className="container">
        <h1>Mortgage Calculator</h1>

        <div className="input-section">
          <div className="input-group">
            <label htmlFor="mortgage-amount">Mortgage Amount</label>
            <div className="input-wrapper">
              <span className="input-prefix">$</span>
              <input
                id="mortgage-amount"
                type="text"
                value={mortgageAmount}
                onChange={(e) => setMortgageAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="500000"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="interest-rate">Interest Rate</label>
            <div className="input-wrapper">
              <input
                id="interest-rate"
                type="text"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="6.30"
              />
              <span className="input-suffix">%</span>
            </div>
          </div>

          <button className="calculate-button" onClick={handleCalculate}>
            Calculate
          </button>
        </div>

        {calculations && (
          <div className="results-grid">
            <MortgageColumn years={15} data={calculations[15]} />
            <MortgageColumn years={30} data={calculations[30]} />
            <MortgageColumn years={50} data={calculations[50]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
