"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
}

export default function PremiumProjectCard({ 
  title, 
  description, 
  image, 
  tech, 
  liveUrl, 
  githubUrl 
}: ProjectCardProps) {
  return (
    <motion.div
      className="premium-card p-6 group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </Link>
        )}
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
          >
            <Github className="w-4 h-4" />
            Code
          </Link>
        )}
      </div>
    </motion.div>
  )
}