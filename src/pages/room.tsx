import { motion } from "framer-motion"
import { ArrowLeft, Radio } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"
import { GradientBackdrop } from "@/components/gradient-backdrop"
import { QuestionForm } from "@/components/question-form"
import { QuestionList } from "@/components/question-list"
import { Button } from "@/components/ui/button"

type RoomParams = {
	roomId: string
}

export function Room() {
	const params = useParams<RoomParams>()

	if (!params.roomId) {
		return <Navigate replace to="/" />
	}

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
			{/* 🔮 gradiente de fundo */}
			<GradientBackdrop />

			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className="relative z-10 container mx-auto max-w-4xl px-4 py-12"
			>
				{/* cabeçalho */}
				<div className="mb-10">
					<div className="mb-6 flex items-center justify-between">
						<Link to="/">
							<Button
								variant="outline"
								className="bg-transparent border border-white/20 hover:bg-white/10 text-white/90 transition-all duration-300"
							>
								<ArrowLeft className="mr-2 size-4" />
								Voltar ao Início
							</Button>
						</Link>

						<Link to={`/room/${params.roomId}/audio`}>
							<Button
								className="flex items-center gap-2 bg-violet-600/90 hover:bg-violet-500 transition-all duration-300"
								variant="secondary"
							>
								<Radio className="size-4" />
								Gravar Áudio
							</Button>
						</Link>
					</div>

					<h1 className="text-3xl font-semibold tracking-tight text-white/90 mb-1">
						Sala de Perguntas
					</h1>
					<p className="text-white/60 text-sm">
						Faça perguntas e receba respostas com I.A.
					</p>
				</div>

				{/* formulário */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.7 }}
					className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 shadow-lg hover:bg-white/10 transition-all duration-300"
				>
					<h2 className="text-xl font-semibold mb-4">Fazer uma Pergunta</h2>
					<p className="text-white/60 mb-6 text-sm">
						Digite sua pergunta abaixo para receber uma resposta da I.A.
					</p>
					<QuestionForm roomId={params.roomId} />
				</motion.section>

				{/* lista de perguntas */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.7 }}
					className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-lg hover:bg-white/10 transition-all duration-300"
				>
					<h2 className="text-xl font-semibold mb-6">Perguntas & Respostas</h2>
					<QuestionList roomId={params.roomId} />
				</motion.section>
			</motion.div>
		</div>
	)
}
