// src/components/administrative/PaymentTab.js
import React from 'react';
import { DollarSign, Calendar, Award } from 'lucide-react';
import { mockData } from '../../data/mockData';

const PaymentTab = () => {
  const { payments } = mockData;

  return (
    <div>
      <div className="payment-summary">
        <div className="summary-header">
          <h2>Payment Summary</h2>
          <div className="outstanding-amount">
            Outstanding Balance<br />
            <span className="amount">฿{payments.outstanding.toLocaleString()}</span>
          </div>
        </div>
        <div className="summary-cards">
          <div className="summary-card green">
            <DollarSign size={32} />
            <div>
              <div className="summary-label">Total Paid</div>
              <div className="summary-value">฿{payments.totalPaid.toLocaleString()}</div>
            </div>
          </div>
          <div className="summary-card orange">
            <Calendar size={32} />
            <div>
              <div className="summary-label">Next Due</div>
              <div className="summary-value">{payments.nextDue}</div>
            </div>
          </div>
          <div className="summary-card blue">
            <Award size={32} />
            <div>
              <div className="summary-label">Scholarships</div>
              <div className="summary-value">฿{payments.scholarships.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h2>Payment History</h2>
        <div className="payment-list">
          {payments.history.map((payment, i) => (
            <div key={i} className="payment-item">
              <div className="payment-info">
                <div className="payment-title">{payment.item}</div>
                <div className="payment-date">{payment.date}</div>
              </div>
              <div className="payment-amount">฿{payment.amount.toLocaleString()}</div>
              <div className={`payment-status ${payment.status}`}>
                {payment.status === 'paid' ? 'Paid' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
        <button className="btn-primary">Make Payment</button>
      </div>
    </div>
  );
};

export default PaymentTab;