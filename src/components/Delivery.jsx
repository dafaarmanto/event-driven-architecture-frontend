import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Delivery(props) {
  const [state, setState] = useState({})
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8000/deliveries/${props.id}/status`)
      const data = await response.json()
      setState(data)
    })()
  }, [refresh])

  const onSubmit = async (e, type) => {
    e.preventDefault()

    const form = new FormData(e.target)
    const data = Object.fromEntries(form.entries())
    
    const response = await fetch('http://localhost:8000/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        data,
        delivery_id: state.id
      })
    });

    if(!response.ok) {
      const { detail } = await response.json();
      toast.error(detail)
      return
    }
    setRefresh(!refresh)
  }

  return (
    <div className='row w-100'>
      <div className="col-12 mb-4">
        <h4 className="fw-bold text-white">Delivery: {state.id}</h4>
        { state.status === "ready" ? 
          <p className='text-white'>Status: <span className='text-danger'>{state.status.toUpperCase()}</span></p> : 
          '' }
        { state.status === "active" ? 
          <p className='text-white'>Status: <span className='text-success'>{state.status.toUpperCase()}</span></p> : 
          '' }
        { state.status === "collected" ? 
          <p className='text-white'>Status: <span className='text-warning'>{state.status.toUpperCase()}</span></p> : 
          '' }
        { state.status === "completed" ? 
          <p className='text-white'>Status: <span className='text-primary'>{state.status.toUpperCase()}</span></p> : 
          '' }
      </div>
      <div className="col-12 mb-5">
        <div className="progress">
          { state.status !== 'ready' ? 
            <div className={state.status === 'active' ? "progress-bar bg-success progress-bar-striped progress-bar-animated" : "progress-bar bg-success"}
              role="progressbar" style={{ width: '50%' }}
            ></div> : '' }
          { state.status === 'collected' || state.status === 'completed' ? 
            <div className={state.status === 'collected' ? "progress-bar bg-success progress-bar-striped progress-bar-animated" : "progress-bar bg-success"}
              role="progressbar" style={{ width: '50%' }}
            ></div> : '' }
        </div>
      </div>
      
      <div className="col-3">
        <div className='card'>
          <div className="card-header">
            Start Delivery
          </div>
          <form className="card-body" onSubmit={e => onSubmit(e, "START_DELIVERY")}>
            <button className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
      
      <div className="col-3">
        <div className='card'>
          <div className="card-header">
            Increase Budget
          </div>
          <form className="card-body" onSubmit={e => onSubmit(e, "INCREASE_BUDGET")}>
            <div className="mb-3">
              <input type="number" className="form-control" placeholder='Input Budget' name="budget" />
            </div>
            <button className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>

      <div className="col-3">
        <div className='card'>
          <div className="card-header">
            Pickup Products
          </div>
          <form className="card-body" onSubmit={e => onSubmit(e, "PICKUP_PRODUCTS")}>
            <div className="input-group mb-3">
              <input type="number" className="form-control" placeholder='Purchase Price' name="purchase_price" />
              <input type="number" className="form-control" placeholder='Quantity' name="quantity" />
            </div>
            <button className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
      
      <div className="col-3">
        <div className='card'>
          <div className="card-header">
            Deliver Products
          </div>
          <form className="card-body" onSubmit={e => onSubmit(e, "DELIVER_PRODUCTS")}>
            <div className="input-group mb-3">
              <input type="number" className="form-control" placeholder='Sell Price' name="sell_price" />
              <input type="number" className="form-control" placeholder='Quantity' name="quantity" />
            </div>
            <button className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
      <code className='col-12 mt-4 text-white'>
        {JSON.stringify(state)}
      </code>
      <ToastContainer />
    </div>
  )
}

export default Delivery