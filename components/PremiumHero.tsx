import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function PremiumHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const codeVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.06, 0.12, 0.06],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#111] overflow-hidden flex items-center">
      {/* Animated background mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(109,129,150,0.15)_0%,transparent_70%)] filter blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,227,0.08)_0%,transparent_70%)] filter blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating code snippets with Lumyn subtle color */}
      <motion.div
        variants={codeVariants}
        animate="animate"
        className="absolute top-[20%] left-[10%] text-[rgba(109,129,150,0.08)] font-mono text-sm"
      >
        {"<Portfolio />"}
      </motion.div>
      <motion.div
        variants={codeVariants}
        animate="animate"
        className="absolute top-[40%] right-[10%] text-[rgba(109,129,150,0.08)] font-mono text-sm"
      >
        {"const code = () =>"}
      </motion.div>
      <motion.div
        variants={codeVariants}
        animate="animate"
        className="absolute bottom-[30%] left-[15%] text-[rgba(255,255,227,0.06)] font-mono text-sm"
      >
        {"return magic"}
      </motion.div>

      <div className="container relative z-10 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.span
              variants={itemVariants}
              className="inline-block px-5 py-2 mb-6 text-sm font-semibold text-[#6d8196] border border-[rgba(109,129,150,0.3)] rounded-full bg-[rgba(109,129,150,0.08)] backdrop-blur-sm"
            >
              Fullstack Developer
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--foreground)' }}
            >
              <span style={{ color: 'rgba(245,245,245,0.9)' }}>Mutuku </span>
              <span style={{ background: 'linear-gradient(135deg, #6d8196 0%, #ffffe3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Joshua
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Crafting digital experiences with{" "}
              <span style={{ color: 'var(--primary)' }}>modern technologies</span> and clean architecture
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <PremiumButton href="/projects" size="lg">
                View Projects
              </PremiumButton>
              <PremiumButton href="/contact" variant="secondary" size="lg">
                Contact Me
              </PremiumButton>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Premium glass card effect */}
              <div className="absolute inset-0 rounded-3xl border border-[rgba(109,129,150,0.2)] bg-[rgba(20,20,20,0.4)] backdrop-blur-xl" />
              
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden z-10"
                whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/Mutuku.JPG"
                  alt="Mutuku Joshua - Fullstack Developer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(109,129,150,0.08)] to-transparent" />
              </motion.div>

              {/* Floating tech tags */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1 bg-[rgba(109,129,150,0.15)] rounded-full text-[var(--primary)] text-xs font-semibold shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                React
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-1 bg-[rgba(109,129,150,0.15)] rounded-full text-[var(--primary)] text-xs font-semibold shadow-lg"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Node.js
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}