import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import HomePage from "./pages/index"
import { RecordRoomAudio } from "./pages/record-room-audio"
import { Room } from "./pages/room"

const queryClient = new QueryClient()

function AnimatedRoutes() {
	const location = useLocation()

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route index element={<HomePage />} />
				<Route path="/room/:roomId" element={<Room />} />
				<Route path="/room/:roomId/audio" element={<RecordRoomAudio />} />
			</Routes>
		</AnimatePresence>
	)
}

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4 }}
				>
					<AnimatedRoutes />
				</motion.div>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
