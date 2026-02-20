
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackProps {
    isCorrect: boolean | null;
    message: string;
}

const Feedback: React.FC<FeedbackProps> = ({ isCorrect, message }) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-6 p-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl ${isCorrect
                            ? 'bg-green-500 text-white border-4 border-green-600'
                            : 'bg-red-500 text-white border-4 border-red-600'
                        }`}
                >
                    {isCorrect ? <CheckCircle size={28} className="font-bold" /> : <XCircle size={28} className="font-bold" />}
                    <span className="font-black text-2xl tracking-wide">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Feedback;
