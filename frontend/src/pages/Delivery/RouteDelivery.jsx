import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api.js';
import { TopBar, Card, Pill, Button, Loading } from '../../components/UI.jsx';

const categories = ['Sweets', 'Food', 'Snacks', 'Gifts'];

export default function RouteDelivery() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Sweets');
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => { api.getDeliveryItems(category).then(setItems); }, [category]);

  const add = (item) => setCart((c) => ({ ...c, [item.id]: { ...item, qty: (c[item.id]?.qty || 0) + 1 } }));
  const cartItems = Object.values(cart);
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const request = () => navigate('/delivery/tracking', { state: { items: cartItems } });

  return (
    <div className="app-shell">
      <TopBar title="Route Based Delivery" />
      <div className="p-4 space-y-3">
        <Card className="flex items-center justify-between">
          <div className="text-sm">
            <div className="text-slate-800 font-medium">Amalapuram → Hyderabad</div>
            <div className="text-xs text-slate-400">Amalapuram • Vijayawada • Hyderabad</div>
          </div>
          <span className="bg-green-100 text-brand-greenDark text-xs px-2 py-1 rounded-full font-semibold">On Route</span>
        </Card>

        <div className="font-semibold text-slate-700 text-sm">Need Something from Vijayawada?</div>
        <div className="text-xs text-slate-500 -mt-2">We'll get it for you at the next junction!</div>

        <div className="flex gap-2">
          {categories.map((c) => <Pill key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Pill>)}
        </div>
      </div>

      <div className="px-4 space-y-3 flex-1">
        {!items.length && <Loading label="Loading items…" />}
        {items.map((it) => (
          <Card key={it.id} className="flex items-center gap-3">
            <div className="text-3xl">🍬</div>
            <div className="flex-1">
              <div className="font-medium text-sm">{it.name}</div>
              <div className="text-xs text-slate-500">{it.source_location}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold mb-1">₹{it.price}</div>
              <button onClick={() => add(it)} className="w-7 h-7 rounded-full bg-brand-green text-white font-bold">+</button>
              {cart[it.id] && <div className="text-xs text-brand-green mt-1">x{cart[it.id].qty}</div>}
            </div>
          </Card>
        ))}

        <Card className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">📍 Delivery Point</div>
            <div className="text-xs text-slate-500">Vijayawada Highway Junction</div>
            <div className="text-xs text-slate-400">(Near Ibrahimpatnam / Enroute to Hyderabad)</div>
          </div>
          <span className="text-slate-400">›</span>
        </Card>
      </div>

      <div className="p-4">
        {cartItems.length > 0 && <div className="text-sm text-slate-600 mb-2 text-center">Cart total: ₹{total}</div>}
        <Button disabled={!cartItems.length} onClick={request}>🛒 Request Delivery</Button>
      </div>
    </div>
  );
}
