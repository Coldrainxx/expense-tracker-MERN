/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction'

const TransactionHistory = () => {
  const { transactions, getTransactions } = useContext(GlobalContext)

  useEffect(() => {
    getTransactions()
  },[])

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  )
}

export default TransactionHistory
