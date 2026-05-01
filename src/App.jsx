import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PRODUCTS = [
  { id: 1, name: '10 Toes Down Hoodie', price: 69.99, vibe: 'I don’t fold under pressure!' },
  { id: 2, name: 'Dealin’ Factz Tee', price: 39.99, vibe: '10 Toes Down!' },
  { id: 3, name: 'Motion Ova Emotion Hoodie', price: 74.99, vibe: 'Motion ova Emotion!' },
  { id: 4, name: 'No Cap Varsity Jacket', price: 119.99, vibe: 'IDK ABT U, BUT IK ABT ME' },
  { id: 5, name: 'Highly Grounded Sweats', price: 59.99, vibe: 'I’m Highly Grounded!' },
  { id: 6, name: 'Stand On Truth Hat', price: 34.99, vibe: 'I Feel Like Facing The Factz' },
]

const BUBBLE_BANK = ['It Is What It Is 🤷🏽‍♂️', 'Be In Yo Feelingz At Home Not Outside', 'Conceal to Feel', 'Informed and Focused', 'Sh*t Get Real… Real Fast']

export function App() {
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [realityMode, setRealityMode] = useState('Factz')
  const [cartItems, setCartItems] = useState([])
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [introStep, setIntroStep] = useState('entry')
  const [mindsetAnswers, setMindsetAnswers] = useState([false, false, false, false])

  const modeClass = realityMode === 'Feelingz' ? 'mode-feelingz' : 'mode-factz'

  const mindsetResult = useMemo(() => {
    const score = mindsetAnswers.filter(Boolean).length
    if (score <= 1) return 'You feel deeply, but you’re learning to move strategically.'
    if (score <= 2) return 'Let the facts speak for you.'
    return 'You’re built to stand. Keep moving off what’s real.'
  }, [mindsetAnswers])

  return (
    <div className={`min-h-screen bg-black text-white ${modeClass}`}>
      <AnimatePresence mode="wait">
        {!hasEnteredSite && (
          <IntroExperience
            introStep={introStep}
            setIntroStep={setIntroStep}
            setHasEnteredSite={setHasEnteredSite}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        )}
      </AnimatePresence>

      {hasEnteredSite && (
        <>
          <Header cartItems={cartItems.length} realityMode={realityMode} setRealityMode={setRealityMode} />
          <HeroSection />
          <ProductGrid
            products={PRODUCTS}
            hoveredProduct={hoveredProduct}
            setHoveredProduct={setHoveredProduct}
            onAdd={(product) => setCartItems((prev) => [...prev, product])}
          />
          <MindsetAnalyzer mindsetAnswers={mindsetAnswers} setMindsetAnswers={setMindsetAnswers} result={mindsetResult} />
          <Footer />
        </>
      )}
    </div>
  )
}

function IntroExperience({ introStep, setIntroStep, setHasEnteredSite, selectedAnswer, setSelectedAnswer }) {
  if (introStep === 'question') return <QuestionScreen setIntroStep={setIntroStep} setSelectedAnswer={setSelectedAnswer} />
  if (introStep === 'result') return <ResultScreen selectedAnswer={selectedAnswer} onEnter={() => setHasEnteredSite(true)} />

  return (
    <motion.section key="entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[linear-gradient(180deg,#020202,#0a0a0a_65%,#060606)] p-6 flex items-center justify-center">
      <div className="street-grain absolute inset-0" />
      <motion.div initial={{ y: -30, rotate: -3 }} animate={{ y: 0, rotate: -1 }} className="relative z-10 text-center max-w-3xl">
        <div className="mx-auto mb-8 w-fit relative">
          <div className="h-28 w-3 bg-zinc-500 mx-auto" />
          <div className="bg-[#2f7d32] border-4 border-zinc-300 rounded-sm px-7 py-4 text-xl md:text-4xl font-black shadow-2xl">FACTZ OVER FEELINGZ BLVD</div>
          <div className="absolute -right-6 -bottom-5 bg-black border border-red-700 px-2 py-1 text-xs tracking-[0.18em]">Only Dealin’ Factz</div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-8">Only for those who can stand 10 toes…</h1>
        <motion.button whileHover={{ x: [-1, 1, -1, 1], boxShadow: '0 0 30px rgba(185,18,18,.8)' }} whileTap={{ scale: 0.96 }} onClick={() => setIntroStep('question')} className="btn-red">Show Me The Factz…</motion.button>
      </motion.div>
    </motion.section>
  )
}

function QuestionScreen({ setIntroStep, setSelectedAnswer }) {
  const pick = (choice) => {
    setSelectedAnswer(choice)
    setIntroStep('result')
  }

  return (
    <motion.section key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-8">People doubting you… so what you gon do?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <motion.button whileHover={{ x: [-2, 2, -1], filter: 'contrast(1.2)' }} onClick={() => pick('React')} className="choice-react">
            <span className="text-3xl block mb-2">React</span>
            <span className="text-red-400">stoop down to they level!</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.015 }} onClick={() => pick('Remain')} className="choice-remain">
            <span className="text-3xl block mb-2">Remain</span>
            <span className="text-zinc-300">keep yo STANCE!</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}

function ResultScreen({ selectedAnswer, onEnter }) {
  return <motion.section key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6">
    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center max-w-xl">
      <h2 className="text-4xl md:text-6xl font-black">Feel it. But move on what’s real.</h2>
      <p className="mt-4 text-xl">Stand on truth. Every time.</p>
      <p className="mt-3 text-zinc-400">Chosen stance: {selectedAnswer}</p>
      <button className="btn-outline mt-8" onClick={onEnter}>Enter The Block</button>
    </motion.div>
  </motion.section>
}

function Header({ cartItems, realityMode, setRealityMode }) {
  return <header className="sticky top-0 z-40 bg-black/85 backdrop-blur border-b border-zinc-800 px-4 md:px-10 py-4 flex items-center justify-between gap-4">
    <div className="font-black tracking-wide">Factz Over Feelingz</div>
    <nav className="hidden lg:flex gap-8 text-sm uppercase"><a href="#">Home</a><a href="#shop">Shop</a><a href="#mindset">Mindset</a><a href="#">Reality Mode</a><a href="#">About</a></nav>
    <div className="flex items-center gap-3 text-xs md:text-sm"><RealityModeToggle realityMode={realityMode} setRealityMode={setRealityMode} /><span>Search</span><span>Account</span><span>Cart ({cartItems})</span></div>
  </header>
}

function RealityModeToggle({ realityMode, setRealityMode }) {
  return <button className="px-3 py-1 border border-zinc-600 rounded-full" onClick={() => setRealityMode((m) => (m === 'Factz' ? 'Feelingz' : 'Factz'))}>Mode: <span className="text-zinc-300">Feelingz</span> / <span className="text-red-500">Factz</span> · <b>{realityMode}</b></button>
}

function HeroSection() {
  return <section className="min-h-[92vh] grid md:grid-cols-2" id="home">
    <div className="hero-left p-6 md:p-12 flex flex-col justify-end"><p className="text-5xl md:text-6xl font-black italic">FEELINGZ</p><p className="text-zinc-300 mt-2">It’s human. Feel it.</p></div>
    <div className="hero-right p-6 md:p-12 flex flex-col justify-center">
      <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl md:text-8xl leading-[0.88] font-black distressed">FACTZ<br/>OVER<br/>FEELINGZ</motion.h1>
      <p className="uppercase tracking-[0.16em] mt-5">Only Dealin’ Factz</p>
      <p className="text-zinc-300">Dealin’ Factz Not Cap • Stand on truth. Every time.</p>
      <div className="mt-7 flex flex-wrap gap-3"><button className="btn-red">Shop For Truth</button><button className="btn-outline">Analyze The Mindset</button></div>
    </div>
  </section>
}

function ProductGrid({ products, hoveredProduct, setHoveredProduct, onAdd }) {
  return <section id="shop" className="px-4 md:px-10 py-16 bg-[linear-gradient(180deg,#080808,#0f0f0f)]">
    <h2 className="text-4xl md:text-5xl font-black mb-2">Shop The Block</h2>
    <p className="text-zinc-400 mb-8">10 toes down essentials. Motion ova emotion.</p>
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{products.map((p, i) => <ProductCard key={p.id} product={p} bubble={i % 2 ? p.vibe : BUBBLE_BANK[i % BUBBLE_BANK.length]} hovered={hoveredProduct === p.id} onHover={(value) => setHoveredProduct(value ? p.id : null)} onAdd={onAdd} />)}</div>
  </section>
}

function ProductCard({ product, bubble, hovered, onHover, onAdd }) {
  return <article className="relative bg-zinc-950 border border-zinc-700 p-4" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
    <div className="h-56 mb-4 bg-[linear-gradient(135deg,#151515,#303030)] border border-zinc-700 flex items-end p-3">
      <span className="text-xs uppercase text-zinc-400">Image placeholder</span>
    </div>
    <h3 className="text-xl font-bold">{product.name}</h3>
    <p className="text-zinc-300">${product.price.toFixed(2)}</p>
    <div className="mt-4 flex gap-2"><button className="btn-outline small">Quick view</button><button className="btn-red small" onClick={() => onAdd(product)}>Add to cart</button></div>
    <AnimatePresence>{hovered && <SpeechBubble text={bubble} />}</AnimatePresence>
  </article>
}

function SpeechBubble({ text }) {
  return <motion.div initial={{ opacity: 0, scale: 0.7, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} exit={{ opacity: 0 }} className="absolute -top-4 left-4 bg-white text-black font-bold border-2 border-red-600 rounded-2xl px-4 py-2 text-sm">{text}</motion.div>
}

function MindsetAnalyzer({ mindsetAnswers, setMindsetAnswers, result }) {
  const statements = ['Pressure makes me fold', 'I adjust and move smarter', 'I react when tested', 'I stay grounded before I move']

  return <section id="mindset" className="px-4 md:px-10 py-16">
    <h2 className="text-4xl md:text-5xl font-black mb-2">Analyze The Mindset</h2>
    <p className="text-zinc-400 mb-8">Feel it. But move on what’s real.</p>
    <div className="grid md:grid-cols-2 gap-4">{statements.map((s, i) => <label key={s} className="p-4 border border-zinc-700 bg-zinc-950 flex items-center justify-between gap-4"><span>{s}</span><input type="checkbox" checked={mindsetAnswers[i]} onChange={(e) => setMindsetAnswers((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))} /></label>)}</div>
    <div className="mt-8 border border-red-700 bg-zinc-950 p-5">
      <p className="font-semibold text-lg">{result}</p>
      <p className="text-zinc-300 mt-2">Suggested fit: Motion Ova Emotion Hoodie, Stand On Truth Hat, Highly Grounded Sweats.</p>
    </div>
  </section>
}

function Footer() {
  return <footer className="border-t border-zinc-800 py-8 text-center text-zinc-400">© 2026 Factz Over Feelingz — Only Dealin’ Factz.</footer>
}
