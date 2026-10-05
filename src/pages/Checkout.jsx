import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '../components/Reveal'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { BigTitle, SHIPPING, shippingFor } from './Bag'

const FIELDS = {
  personal: [
    ['firstName', 'First name', 'text', 'given-name'],
    ['lastName', 'Last name', 'text', 'family-name'],
    ['phone', 'Phone number', 'tel', 'tel'],
    ['email', 'Email', 'email', 'email'],
  ],
  address: [
    ['city', 'City', 'text', 'address-level2'],
    ['state', 'State', 'text', 'address-level1'],
    ['address', 'Address', 'text', 'street-address'],
    ['pin', 'PIN code', 'text', 'postal-code'],
  ],
}

const PAYMENTS = ['UPI', 'Card', 'Net banking', 'Cash on delivery']

function Field({ name, label, type, auto, value, onChange, error }) {
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <input
        name={name}
        type={type}
        autoComplete={auto}
        placeholder=" "
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
      />
      <span className="field__label">{label}</span>
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}

export default function Checkout() {
  const { lines, subtotal } = useCart()
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState('UPI')
  const [placed, setPlaced] = useState(false)
  const shipping = shippingFor(subtotal, delivery)

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined })
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    for (const [name, label] of [...FIELDS.personal, ...FIELDS.address]) {
      if (!form[name]?.trim()) next[name] = `Enter your ${label.toLowerCase()}`
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter an email like name@example.com'
    if (form.pin && !/^\d{6}$/.test(form.pin.trim())) next.pin = 'PIN codes have six digits'
    setErrors(next)
    if (Object.keys(next).length === 0) setPlaced(true)
  }

  if (lines.length === 0 && !placed) {
    return (
      <div className="bag container">
        <BigTitle>Checkout</BigTitle>
        <div className="bag__empty">
          <p>Your bag is empty, so there is nothing to check out yet.</p>
          <Link to="/shop" className="pill">
            Browse the catalog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bag container">
      <BigTitle>Checkout</BigTitle>
      <AnimatePresence mode="wait">
        {placed ? (
          <motion.div
            key="done"
            className="co__done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="stitle">Thank you, {form.firstName}</h2>
            <p>
              Your order details are complete. Payments are not connected in this build yet, so no
              money was taken and no order was sent.
            </p>
            <Link to="/shop" className="pill">
              Continue browsing
            </Link>
          </motion.div>
        ) : (
          <motion.form key="form" className="co" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
            <div className="co__main">
              <fieldset className="co__set">
                <legend className="co__legend">
                  Personal information
                </legend>
                <div className="co__fields">
                  {FIELDS.personal.map(([n, l, t, a]) => (
                    <Field key={n} name={n} label={l} type={t} auto={a} value={form[n] ?? ''} onChange={onChange} error={errors[n]} />
                  ))}
                </div>
              </fieldset>

              <fieldset className="co__set">
                <legend className="co__legend">Delivery address</legend>
                <div className="co__fields">
                  {FIELDS.address.map(([n, l, t, a]) => (
                    <Field key={n} name={n} label={l} type={t} auto={a} value={form[n] ?? ''} onChange={onChange} error={errors[n]} />
                  ))}
                </div>
              </fieldset>

              <fieldset className="co__set">
                <legend className="co__legend">Delivery</legend>
                <div className="co__options">
                  {[
                    ['standard', 'Standard shipping', 'Delivery within 4–6 days', shippingFor(subtotal, 'standard')],
                    ['express', 'Express delivery', 'Delivery within 2 days', SHIPPING.express],
                  ].map(([id, title, sub, price]) => (
                    <label key={id} className={`opt ${delivery === id ? 'is-active' : ''}`}>
                      <input type="radio" name="delivery" checked={delivery === id} onChange={() => setDelivery(id)} />
                      <span className="opt__dot" aria-hidden="true" />
                      <span>
                        <strong>{title}</strong>
                        <span className="opt__sub">{sub}</span>
                        <span className="opt__price">{price === 0 ? 'Free' : formatPrice(price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="co__set">
                <legend className="co__legend">Payment</legend>
                <div className="co__radios">
                  {PAYMENTS.map((m) => (
                    <label key={m} className={`radio ${payment === m ? 'is-active' : ''}`}>
                      <input type="radio" name="payment" checked={payment === m} onChange={() => setPayment(m)} />
                      <span className="opt__dot" aria-hidden="true" />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <aside className="sum co__sum">
              <p className="co__legend">Shopping bag</p>
              <ul className="co__lines">
                {lines.map((l) => (
                  <li key={l.key}>
                    <img src={l.product.image} alt="" />
                    <span>
                      <strong>{l.product.name}</strong>
                      <span>Volume: {l.ml} ml</span>
                      <span>Quantity: {l.qty}</span>
                    </span>
                    <span>{formatPrice(l.total)}</span>
                  </li>
                ))}
              </ul>
              <div className="sum__row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="sum__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="sum__row sum__row--total">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </div>
              <button type="submit" className="pill pill--block">
                Place order
              </button>
            </aside>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
