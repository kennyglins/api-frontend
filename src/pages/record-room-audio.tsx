import { motion, type Variants } from "framer-motion"
import { ArrowLeft, Mic, Pause } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"

const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function"

type RoomParams = {
	roomId: string
}

export function RecordRoomAudio() {
	const params = useParams<RoomParams>()
	const [isRecording, setIsRecording] = useState(false)
	const [elapsedTime, setElapsedTime] = useState(0)
	const recorder = useRef<MediaRecorder | null>(null)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (isRecording) {
			timerRef.current = setInterval(() => {
				setElapsedTime((prev) => prev + 1)
			}, 1000)
		} else if (timerRef.current) {
			clearInterval(timerRef.current)
		}

		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [isRecording])

	if (!params.roomId) {
		return <Navigate replace to="/" />
	}

	async function uploadAudio(audio: Blob) {
		const formData = new FormData()
		formData.append("file", audio, "audio.webm")

		await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
			method: "POST",
			body: formData,
		})
	}

	function createRecorder(stream: MediaStream) {
		const newRecorder = new MediaRecorder(stream, {
			mimeType: "audio/webm",
			audioBitsPerSecond: 64_000,
		})

		newRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				uploadAudio(event.data)
			}
		}

		newRecorder.start()
		recorder.current = newRecorder
	}

	async function startRecording() {
		if (!isRecordingSupported) {
			alert("Seu navegador não suporta gravação de áudio.")
			return
		}

		setIsRecording(true)
		setElapsedTime(0)

		const stream = await navigator.mediaDevices.getUserMedia({
			audio: { echoCancellation: true, noiseSuppression: true },
		})

		createRecorder(stream)

		intervalRef.current = setInterval(() => {
			recorder.current?.stop()
			createRecorder(stream)
		}, 5000)
	}

	function stopRecording() {
		setIsRecording(false)
		recorder.current?.stop()
		if (intervalRef.current) clearInterval(intervalRef.current)
	}

	const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, "0")
	const seconds = String(elapsedTime % 60).padStart(2, "0")

	// componentes visuais animados
	const waveVariants: Variants = {
		animate: {
			scaleY: [1, 2, 1],
			opacity: [0.7, 1, 0.7],
			transition: {
				repeat: Infinity,
				duration: 1,
				ease: "easeInOut",
			},
		},
	}

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-center px-4 overflow-hidden">
			{/* botão voltar */}
			<Link
				to={`/room/${params.roomId}`}
				className="absolute top-6 left-6 flex items-center text-zinc-400 hover:text-zinc-100 transition-colors"
			>
				<ArrowLeft className="mr-2 h-5 w-5" />
				Voltar
			</Link>

			{/* Glow animado */}
			<motion.div
				animate={{
					scale: isRecording ? [1, 1.3, 1] : 1,
					opacity: isRecording ? [0.7, 1, 0.7] : 0.2,
				}}
				transition={{ repeat: Infinity, duration: 1.8 }}
				className="absolute w-64 h-64 rounded-full bg-purple-600/30 blur-3xl"
			></motion.div>

			{/* Conteúdo principal */}
			<div className="z-10 flex flex-col items-center space-y-6">
				{/* ícone */}
				<motion.div
					whileTap={{ scale: 0.9 }}
					className="p-6 rounded-full bg-zinc-800 border border-zinc-700 shadow-xl"
				>
					<Mic
						className={`size-14 ${
							isRecording
								? "text-purple-500 animate-pulse"
								: "text-zinc-400 transition-colors"
						}`}
					/>
				</motion.div>

				{/* ondas sonoras */}
				<div className="flex space-x-1 h-10 items-end justify-center mt-4">
					{Array.from({ length: 10 }).map((_, i) => (
						<motion.div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className="w-1 bg-purple-500/70 rounded-full"
							variants={waveVariants}
							animate={isRecording ? "animate" : ""}
							style={{
								height: `${8 + Math.random() * 40}px`,
								animationDelay: `${i * 0.1}s`,
							}}
						/>
					))}
				</div>

				{/* status e tempo */}
				<div className="text-lg text-muted-foreground">
					{isRecording ? (
						<span className="text-purple-400">Gravando...</span>
					) : (
						"Pausado"
					)}
				</div>

				<div className="text-sm text-zinc-400">
					Tempo: {minutes}:{seconds}
				</div>

				{/* botões */}
				<Button
					onClick={isRecording ? stopRecording : startRecording}
					className={`px-6 py-3 text-base font-semibold rounded-full shadow-md transition-all ${
						isRecording
							? "bg-purple-700 hover:bg-purple-800"
							: "bg-purple-600 hover:bg-purple-700"
					}`}
				>
					{isRecording ? (
						<>
							<Pause className="mr-2 h-5 w-5" /> Pausar
						</>
					) : (
						<>
							<Mic className="mr-2 h-5 w-5" /> Gravar Áudio
						</>
					)}
				</Button>

				<p className="text-sm text-zinc-500 max-w-sm mt-2">
					Mantenha o microfone próximo para obter uma boa transcrição.
				</p>
			</div>
		</div>
	)
}
