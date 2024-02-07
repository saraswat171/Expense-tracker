import React, { useState } from 'react'
import { Tranctiondone } from '../Redux/tranctionSlice';
import { useDispatch } from 'react-redux';

function Tranctions() {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState(0);
    const[description,setDescription]=useState('');
    const[tranctionstype,setTranctionstype]=useState('');
    const[date ,setDate]=useState(new Date());
const dispatch =useDispatch();
     const handleAddTranction=(e)=>{
        e.preventDefault();
          try{
            dispatch(Tranctiondone({title,amount,category,description,tranctionstype,date}))    
          }
          catch(err){
            alert(err);
          }
     }
    return (
        <div className='hero'>
            <form onSubmit={handleAddTranction}>
                <div >

                    <div>
                        <input type='text' name='title' placeholder='Enter your title' onChange={(e) => setTitle(e.target.value)} required></input>
                    </div>

                    <div >
                        <input type='number' name='amount' placeholder='enter amount' onChange={(e) => setAmount(e.target.value)} required ></input>
                    </div>

                    <div>
                        

                        <select   name='category'  onChange={(e) => setCategory(e.target.value)}>
              <option value='Rent' >Rent </option>
              <option value='Streaming'>Streaming</option>
              <option value='Grocery'>Grocery</option>
              <option value='Travel'>Travel</option>
              <option value='Car'>Car</option>
              <option value='Salary'>Salary</option>
              
            </select>
                    </div>


                    <div>
                        <input type='text' name='description'  placeholder='description' onChange={(e) => setDescription(e.target.value)} required></input>
                        
                    </div>

                    <div>
                       
                        <select   name='category' onChange={(e) => setTranctionstype(e.target.value)} required>
              <option value='Income' >Income </option>
              <option value='Investment'>Investment</option>
              <option value='Expense'>Expense</option>
              
              
            </select>
                    </div>

                    <div>
                        <input type='date' name='date'  placeholder='Enter date' onChange={(e) => setDate(e.target.value)} required></input>
                    </div>
                    
                    <div >
                        <button type='submit'>Add tranction</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Tranctions