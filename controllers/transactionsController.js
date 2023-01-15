const Transaction = require('../models/Transaction')

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()

    return res.status(200).json({
      succes: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (error) {
    return res.status(500).json({
      succes: false,
      error: 'Server Error',
    })
  }
}

exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body

    const transaction = await Transaction.create(req.body)

    return res.status(201).json({
      succes: true,
      data: transaction,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message)

      return res.status(400).json({
        succes: false,
        error: messages,
      })
    } else {
      return res.status(500).json({
        succes: false,
        error: 'Server Error',
      })
    }
  }
}

exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
      return res.status(404).json({
        succes: false,
        error: 'No transaction found',
      })
    }
    await transaction.remove()

    return res.status(200).json({
      succes: true,
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      succes: false,
      error: 'Server Error',
    })
  }
}
