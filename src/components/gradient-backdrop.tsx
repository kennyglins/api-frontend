import { motion } from "framer-motion"

export function GradientBackdrop() {
	return (
		<>
			{/* Cor base escura */}
			<div className="fixed inset-0 -z-50 bg-[#0a0a0a]" />

			{/* Gradientes suaves */}
			<div className="pointer-events-none fixed inset-0 -z-40 bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(99,102,241,.20),transparent_60%),radial-gradient(900px_600px_at_90%_20%,rgba(168,85,247,.16),transparent_60%),radial-gradient(800px_500px_at_50%_100%,rgba(59,130,246,.16),transparent_60%)]" />

			{/* Glow animado sutil */}
			<motion.div
				className="pointer-events-none fixed -z-30 left-1/2 top-[15%] h-[40vh] w-[60vw] -translate-x-1/2 rounded-full blur-[80px]"
				style={{
					background:
						"radial-gradient(closest-side, rgba(167,139,250,.22), rgba(99,102,241,.18), transparent)",
				}}
				initial={{ opacity: 0.6 }}
				animate={{ opacity: [0.6, 0.35, 0.6] }}
				transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
			/>
		</>
	)
}
