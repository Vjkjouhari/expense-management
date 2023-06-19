import React from 'react'
import { Progress } from 'antd'
const Analytics = ({transection}) => {

    const categories = [
        'salary',
        'tip',
        'project',
        'food',
        'fee',
        'movie',
        'medical',
    ]

    const totalTransection = transection.length
    const totalIncomeTransection = transection.filter(transection => transection.type === 'income')
    const totalExpenseTransection = transection.filter(transection => transection.type === 'expense')
    const totalIncomePercent = (totalIncomeTransection.length/totalTransection) * 100
    const totalExpensePercent = (totalExpenseTransection.length/totalTransection) * 100

    const totalTurnOver = transection.reduce((acc, transection) => acc + transection.amount, 0)
    const totalIncomeTurnOver = transection.filter(transection => transection.type === 'income').reduce((acc, transection) => acc + transection.amount, 0)
    const totalExpenseTurnOver = transection.filter(transection => transection.type === 'expense').reduce((acc, transection) => acc + transection.amount, 0)
    const totalIncomeTurnOverPercent = (totalIncomeTurnOver/totalTurnOver) * 100;
    const totalExpenseTurnOverPercent = (totalExpenseTurnOver/totalTurnOver) * 100;

  return (
    <>
        <div className='row m-3'>
            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total Trasection : {totalTransection.length}
                    </div>
                    <div className='care-body'>
                        <h5>Income : { totalIncomeTransection.length }</h5>
                        <h5>Expense : { totalExpenseTransection.length }</h5>
                    </div>
                    <Progress 
                    type="circle" 
                    strokeColor={'green'} 
                    className='mx-2' 
                    percent={totalIncomePercent.toFixed(0)}
                    />
                    <Progress 
                    type="circle" 
                    strokeColor={'red'} 
                    className='mx-2' 
                    percent={totalExpensePercent.toFixed(0)}
                    />

                </div>
            </div>
            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total Turnover : {totalTurnOver}
                    </div>
                    <div className='care-body'>
                        <h5>Income : { totalIncomeTurnOver }</h5>
                        <h5>Expense : { totalExpenseTurnOver }</h5>
                    </div>
                    <Progress 
                    type="circle" 
                    strokeColor={'green'} 
                    className='mx-2' 
                    percent={totalIncomeTurnOverPercent.toFixed(0)}
                    />
                    <Progress 
                    type="circle" 
                    strokeColor={'red'} 
                    className='mx-2' 
                    percent={totalExpenseTurnOverPercent.toFixed(0)}
                    />

                </div>
            </div>
        </div>

        <div className='row mt-3'>
            <div className='col-md-5'>
                <h4>Category Wise Income</h4>
                {
                    categories.map((category) =>{
                        const amount = transection.filter((transection) => transection.type === 'income' && transection.category === category).reduce((acc,transection) => acc + transection.amount, 0);

                        return (
                            amount > 0 && 
                            (<div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalIncomeTurnOver) * 100).toFixed(0)} />
                                </div>
                            </div>)
                        )
                            
                    })
                }
            </div>
        </div>

        <div className='row mt-3'>
            <div className='col-md-5'>
                <h4>Category Wise EXpense</h4>
                {
                    categories.map((category) =>{
                        const amount = transection.filter((transection) => transection.type === 'expense' && transection.category === category).reduce((acc,transection) => acc + transection.amount, 0);

                        return (
                            amount > 0 && 
                            (<div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalExpenseTurnOver) * 100).toFixed(0)} />
                                </div>
                            </div>)
                        )
                            
                    })
                }
            </div>
        </div>
    </>

  )
}

export default Analytics