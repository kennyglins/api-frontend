import { motion } from "framer-motion"
import { CreateRoomForm } from "../components/create-room-form"
import { GradientBackdrop } from "../components/gradient-backdrop"
import { RoomList } from "../components/room-list"

export default function HomePage() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white flex flex-col items-center justify-center px-6 py-16">
			{/* 🔮 gradiente animado */}
			<GradientBackdrop />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10"
			>
				{/* 🧱 criar sala */}
				<motion.section
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.7 }}
					className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
				>
					<h2 className="text-2xl font-semibold mb-4 text-white/90">
						Criar Sala
					</h2>
					<p className="text-white/60 mb-6 text-sm">
						Crie uma nova sala para começar a fazer perguntas e receber
						respostas da I.A.
					</p>
					<CreateRoomForm />
				</motion.section>

				{/* 📋 lista de salas */}
				<motion.section
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.7 }}
					className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
				>
					<h2 className="text-2xl font-semibold mb-4 text-white/90">
						Salas Recentes
					</h2>
					<p className="text-white/60 mb-6 text-sm">
						Acesse rapidamente as salas criadas recentemente.
					</p>
					<RoomList />
				</motion.section>
			</motion.div>

			{/* ✨ rodapé leve */}
			<footer className="mt-16 text-white/40 text-sm text-center z-10">
				Desenvolvido por{" "}
				<span className="text-white/70 font-medium hover:text-violet-400 transition-colors">
					Kennedy Lins
				</span>{" "}
				• alimentado por{" "}
				<span className="text-white/70 font-medium">Gemini AI</span>
			</footer>
		</div>
	)
}
