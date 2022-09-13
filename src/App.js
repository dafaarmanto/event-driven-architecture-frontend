import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import CreateDelivery from './components/CreateDelivery';
import Delivery from './components/Delivery';

function App() {
  const [id, setId] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const data = Object.fromEntries(form.entries())
    
    const response = await fetch('http://localhost:8000/deliveries/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'CREATE_DELIVERY',
        data
      })
    });

    const { id } = await response.json()
    setId(id)
  }

  return (
    <div className="py-5">
      {
        !id ? <CreateDelivery onSubmit={onSubmit} /> : <Delivery id={id} />
      }
    </div>
  );
}

export default App;
