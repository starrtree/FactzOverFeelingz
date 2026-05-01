import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const products = [
  { name: '10 Toes Down Hoodie', price: 69.99 },
  { name: 'Dealin’ Factz Tee', price: 39.99 },
  { name: 'Motion Ova Emotion Hoodie', price: 74.99 },
  { name: 'No Cap Varsity Jacket', price: 119.99 },
  { name: 'Highly Grounded Sweats', price: 59.99 },
  { name: 'Stand On Truth Hat', price: 34.99 },
]

const bubbles = [
  'I don’t fold under pressure!', '10 Toes Down!', 'I’m Highly Grounded!', 'Motion ova Emotion!', 'It Is What It Is 🤷🏽‍♂️',
  'Be In Yo Feelingz At Home Not Outside', 'Conceal to Feel', 'Informed and Focused', 'Sh*t Get Real… Real Fast', 'IDK ABT U, BUT IK ABT ME', 'I Feel Like Facing The Factz'
]

const mindsetStatements = ['Pressure makes me fold', 'I adjust and move smarter', 'I react when tested', 'I stay grounded before I move']

export function App() {
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [phase, setPhase] = useState('intro')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [realityMode, setRealityMode] = useState('Factz')
  const [cartItems, setCartItems] = useState([])
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [mindset, setMindset] = useState([])

  const jitter = realityMode === 'Feelingz' ? 'feelingz-mode' : ''
  const result = useMemo(() => {
    const score = mindset.filter(Boolean).length
    if (score <= 1) return 'You feel deeply, but you’re learning to move strategically.'
    if (score <= 3) return 'Let the facts speak for you.'
    return 'You’re built to stand. Keep moving off what’s real.'
  }, [mindset])

  return <div className={`min-h-screen bg-black text-white ${jitter}`}>
    <AnimatePresence mode="wait">
      {!hasEnteredSite && <IntroExperience key="intro" phase={phase} setPhase={setPhase} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} onEnter={() => setHasEnteredSite(true)} />}
    </AnimatePresence>
    {hasEnteredSite && <>
      <Header cartItems={cartItems} realityMode={realityMode} setRealityMode={setRealityMode} />
      <HeroSection />
      <main id="shop" className="px-6 md:px-12 pb-16">
        <ProductGrid products={products} hoveredProduct={hoveredProduct} setHoveredProduct={setHoveredProduct} addCart={(item) => setCartItems((prev) => [...prev, item])} />
        <MindsetAnalyzer statements={mindsetStatements} mindset={mindset} setMindset={setMindset} result={result} />
      </main>
      <Footer />
    </>}
  </div>
}

function IntroExperience({ phase, setPhase, selectedAnswer, setSelectedAnswer, onEnter }) {
  if (phase === 'question') return <QuestionScreen setPhase={setPhase} setSelectedAnswer={setSelectedAnswer} />
  if (phase === 'result') return <ResultScreen selectedAnswer={selectedAnswer} onEnter={onEnter} />
  return <section className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6">
    <div className="w-full max-w-4xl text-center">
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-8 w-fit">
        <div className="bg-green-700 border-4 border-gray-300 rounded px-6 py-3 text-3xl font-black tracking-wide shadow-2xl">FACTZ OVER FEELINGZ BLVD</div>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-zinc-300">Only Dealin’ Factz</p>
      </motion.div>
      <h1 className="text-3xl md:text-5xl font-black mb-8">Only for those who can stand 10 toes…</h1>
      <motion.button whileHover={{ scale: 1.03, x: [-1, 1, -1], boxShadow: '0 0 25px rgba(196,16,16,.7)' }} whileTap={{ scale: .97 }} onClick={() => setPhase('question')} className="bg-blood px-8 py-4 font-bold uppercase tracking-widest">Show Me The Factz…</motion.button>
    </div>
  </section>
}

function QuestionScreen({ setPhase, setSelectedAnswer }) {
  const choose = (pick) => { setSelectedAnswer(pick); setPhase('result') }
  return <section className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
    <div className="max-w-2xl w-full space-y-6 text-center">
      <h2 className="text-4xl font-black">People doubting you… so what you gon do?</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.button whileTap={{ scale: .95 }} whileHover={{ x: [-3, 3, -2], boxShadow: '0 0 15px rgba(196,16,16,.8)' }} className="border border-red-600 p-6" onClick={() => choose('React')}><p className="text-2xl font-bold">React</p><p className="text-red-400">stoop down to they level!</p></motion.button>
        <motion.button whileTap={{ scale: .95 }} whileHover={{ scale: 1.02 }} className="border border-white p-6" onClick={() => choose('Remain')}><p className="text-2xl font-bold">Remain</p><p className="text-zinc-200">keep yo STANCE!</p></motion.button>
      </div>
    </div>
  </section>
}

function ResultScreen({ selectedAnswer, onEnter }) {
  return <section className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6 text-center">
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-5xl font-black mb-4">Feel it. But move on what’s real.</h2>
      <p className="text-xl mb-2">Stand on truth. Every time.</p>
      <p className="mb-8 text-zinc-400">Selection: {selectedAnswer}</p>
      <button onClick={onEnter} className="bg-white text-black font-black px-8 py-4 uppercase">Enter The Block</button>
    </motion.div>
  </section>
}

function Header({ cartItems, realityMode, setRealityMode }) { return <header className="sticky top-0 z-40 bg-black/90 border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between">
  <div className="font-black text-xl">Factz Over Feelingz</div>
  <nav className="hidden md:flex gap-8 uppercase text-sm"><a href="#">Home</a><a href="#shop">Shop</a><a href="#mindset">Mindset</a><a href="#">Reality Mode</a><a href="#">About</a></nav>
  <div className="flex items-center gap-4 text-sm"><RealityModeToggle realityMode={realityMode} setRealityMode={setRealityMode} /><span>Search</span><span>Account</span><span>Cart({cartItems.length})</span></div>
</header> }

function RealityModeToggle({ realityMode, setRealityMode }) { return <button className="border border-zinc-500 px-3 py-1" onClick={() => setRealityMode(realityMode === 'Factz' ? 'Feelingz' : 'Factz')}>Mode: Feelingz / <span className="text-red-500">Factz</span></button> }

function HeroSection() { return <section className="min-h-[90vh] grid md:grid-cols-2 gap-0">
  <div className="bg-[radial-gradient(circle_at_20%_30%,#225e2a_0%,#0f0f0f_45%)] p-8 md:p-12 flex flex-col justify-end border-r border-zinc-800">
    <p className="text-5xl font-black opacity-80">FEELINGZ</p><p className="text-zinc-300">It’s human. Feel it.</p>
  </div>
  <div className="bg-[radial-gradient(circle_at_60%_40%,#3b3b3b_0%,#0a0a0a_50%)] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
    <motion.div initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8 }}>
      <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">FACTZ<br/>OVER<br/>FEELINGZ</h1>
      <p className="mt-4 text-xl uppercase tracking-wider">Only Dealin’ Factz</p><p className="text-zinc-300">Stand on truth. Every time.</p>
      <div className="mt-8 flex gap-4"><button className="bg-blood px-6 py-3 font-bold uppercase">Shop For Truth</button><button className="border px-6 py-3 font-bold uppercase">Analyze The Mindset</button></div>
    </motion.div>
  </div>
</section> }

function ProductGrid({ products, hoveredProduct, setHoveredProduct, addCart }) { return <section className="pt-14"><h2 className="text-4xl font-black mb-8">Shop The Block</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{products.map((p, i) => <ProductCard key={p.name} product={p} bubble={bubbles[i % bubbles.length]} hovered={hoveredProduct === p.name} onHover={(v) => setHoveredProduct(v ? p.name : null)} addCart={addCart} />)}</div></section> }

function ProductCard({ product, bubble, hovered, onHover, addCart }) { return <article onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="relative border border-zinc-700 p-4 bg-zinc-950">
  <div className="h-52 bg-zinc-800 mb-4" />
  <h3 className="font-bold text-xl">{product.name}</h3><p className="text-zinc-300">${product.price.toFixed(2)}</p>
  <div className="mt-4 flex gap-3"><button className="border px-3 py-2">Quick view</button><button className="bg-blood px-3 py-2" onClick={() => addCart(product)}>Add to cart</button></div>
  <AnimatePresence>{hovered && <SpeechBubble phrase={bubble} />}</AnimatePresence>
</article> }

function SpeechBubble({ phrase }) { return <motion.div initial={{ opacity: 0, scale: .7, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} exit={{ opacity: 0 }} className="absolute -top-5 left-3 bg-white text-black font-bold px-4 py-2 rounded-2xl border-2 border-red-600 text-sm">{phrase}</motion.div> }

function MindsetAnalyzer({ statements, mindset, setMindset, result }) { return <section id="mindset" className="pt-20"><h2 className="text-4xl font-black mb-3">Analyze The Mindset</h2><p className="text-zinc-300 mb-8">Feel it. But move on what’s real.</p>
  <div className="grid md:grid-cols-2 gap-4">{statements.map((s, i) => <label key={s} className="border border-zinc-700 p-4 flex items-center justify-between"><span>{s}</span><input type="checkbox" checked={Boolean(mindset[i])} onChange={(e) => setMindset((prev) => { const next = [...prev]; next[i] = e.target.checked; return next })} /></label>)}</div>
  <div className="mt-8 p-5 border border-red-700 bg-zinc-950"><p className="font-semibold">{result}</p><p className="mt-3 text-zinc-300">Recommended: Motion Ova Emotion Hoodie, Stand On Truth Hat.</p></div>
</section> }

function Footer() { return <footer className="border-t border-zinc-800 p-8 text-center text-zinc-400">© 2026 Factz Over Feelingz — Dealin’ Factz Not Cap.</footer> }
