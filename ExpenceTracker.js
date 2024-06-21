

import React, { useEffect, useState } from 'react'
import "./common/ExpenceTracker.css"

import { BiSort } from "react-icons/bi";

function ExpenceTracker() {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const [expensetracker, setexpensetracker] = useState({ expense: "", amount: "", date: today });

    let localdata = JSON.parse(localStorage.getItem("expensedata"))

    const [expensealldata, setexpensealldata] = useState(localdata ? localdata : []);
    console.log(expensealldata);
    const [edit, setEdit] = useState(null);

    function handelAddExpense(e) {
        e.preventDefault();
        if (expensetracker.expense === "" || expensetracker.amount === "") {
            alert("Please fill all fields");
        } else {
            let updatedExpenses;
            if (edit !== null) {
                updatedExpenses = expensealldata.map(item =>
                    item.expense === edit ? expensetracker : item
                );
                setEdit(null);
            } else {
                updatedExpenses = [...expensealldata, expensetracker];
            }
            localStorage.setItem("expensedata", JSON.stringify(updatedExpenses));
            setexpensealldata(updatedExpenses);
            handleForClearExpense();
        }
    }

    useEffect(() => {
        let localdata = JSON.parse(localStorage.getItem("expensedata"))
        if (localdata) {

        } else {
            localStorage.setItem("expensedata", JSON.stringify([]))
        }
    }, [])

    function handleForClearExpense() {
        setexpensetracker({ expense: "", amount: "", date: today })
    }

    function handledelete(expense) {
        let data = expensealldata.filter((item) => item.expense !== expense)
        setexpensealldata(data)
        localStorage.setItem("expensedata", JSON.stringify(data));

    }

    function handleedit(item) {
        setEdit(item.expense)
        setexpensetracker({ ...item });
    }

    const [isAcending, setIsAscending] = useState(false)

    function handleSortBy(name) {
        setIsAscending(!isAcending);

        if (isAcending) {
            const sortedData = [...expensealldata].sort((a, b) => a[name].localeCompare(b[name]));
            setexpensealldata(sortedData);
        } else {
            const sortedData = [...expensealldata].sort((a, b) => b[name].localeCompare(a[name]));
            setexpensealldata(sortedData);
        }
    }

    return (
        <div className='expensecontainer'>
            <div className='heading' >MONEY SPACE</div>
            <form className='expencetrackerform'>
                <div className='mainheading'>MODIFY EXPENSE</div>
                <h3 className='subheading'>Expense Tracker</h3>
                <div className='maindiv'>
                    <div className="mb-3 row fromfiled">
                        <label for="staticEmail" className="col-sm-3 col-form-label">Current Date</label>
                        <div className="col-sm-9">
                            <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={today} />
                        </div>
                    </div>
                    <div className="mb-3 row  fromfiled">
                        <label for="inputtext" className="col-sm-3 col-form-label text-nowrap">Expense Name</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" value={expensetracker.expense} onChange={(e) => setexpensetracker({ ...expensetracker, expense: e.target.value })} />
                        </div>
                    </div>
                    <div className="mb-3 row  fromfiled">
                        <label for="inputtext" className="col-sm-3 col-form-label text-nowrap">Expense Amount (R)</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" value={expensetracker.amount} onChange={(e) => setexpensetracker({ ...expensetracker, amount: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className='mainbtn'>
                    <button type="submit" className="expensetrackerbtn1" onClick={handelAddExpense} >ADD EXPENSE</button>
                    <button type="button" className="expensetrackerbtn2" onClick={handleForClearExpense} >CLEAR EXPENSE</button>
                </div>
            </form>
            <div className='allmaintab'>
                <div className="maintab">
                    <div className='subtab'>
                        <table className=' table w-100 table-secondary table-hover '>
                            <thead className='tthead'>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Date</th>
                                    <th onClick={() => handleSortBy("expense")}>Expense Name < BiSort /></th>
                                    <th onClick={() => handleSortBy("amount")}>Expense Amount <BiSort /></th>
                                    <th>Delete</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {expensealldata.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No data available</td>
                                    </tr>
                                ) : (
                                    expensealldata.map((item, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.date}</td>
                                            <td>{item.expense}</td>
                                            <td>{item.amount}</td>
                                            <td><button className="btn btn-outline-danger btn-sm m-4 " onClick={() => handledelete(item.expense)}>Delete</button></td>
                                            <td><button className="btn btn-outline-success btn-md m-4" onClick={() => handleedit(item)}>Edit</button></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenceTracker
