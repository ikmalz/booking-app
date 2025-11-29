"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);

  const recommendations = [
    "Apa tipe kamar yang tersedia?",
    "Berapa harga kamar?",
    "Bagaimana cara booking?",
    "Apa saja fasilitas hotel?",
  ];

  const botReply = (msg: string) => {
    if (msg.includes("tipe kamar")) {
      return "Tipe kamar tersedia: Standard, Deluxe, Executive, Family Room.";
    }
    if (msg.includes("harga")) {
      return "Harga kamar mulai dari Rp350.000 - Rp1.200.000 per malam.";
    }
    if (msg.includes("booking")) {
      return "Untuk melakukan booking, pilih kamar ➝ pilih tanggal ➝ lakukan pembayaran.";
    }
    if (msg.includes("fasilitas")) {
      return "Fasilitas hotel: Kolam renang, gym, spa, restoran, WiFi, dan parkir gratis.";
    }
    return "Maaf, saya belum mengerti pertanyaannya. Silakan pilih rekomendasi yang tersedia 😊";
  };

  const handleSend = (text: string) => {
    const userMsg = { from: "user" as const, text };
    const reply = { from: "bot" as const, text: botReply(text.toLowerCase()) };

    setMessages((prev) => [...prev, userMsg, reply]);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-orange-500 text-white rounded-full shadow-xl"
      >
        <MessageCircle size={26} />
      </motion.button>

      {/* CHAT POPUP */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-orange-500 text-white p-4 font-semibold flex justify-between items-center">
              <span>Chat Assistant</span>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="p-4 h-72 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`p-3 text-sm rounded-xl shadow-sm max-w-[80%] ${
                    msg.from === "user"
                      ? "bg-orange-100 ml-auto text-right rounded-br-none"
                      : "bg-white mr-auto rounded-bl-none border"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* RECOMMENDED QUESTIONS */}
            <div className="border-t p-3 bg-white">
              <p className="text-xs font-semibold mb-2 text-gray-600">
                Rekomendasi pertanyaan:
              </p>

              <div className="flex flex-wrap gap-2">
                {recommendations.map((r, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(r)}
                    className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs shadow-sm transition cursor-pointer"
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
