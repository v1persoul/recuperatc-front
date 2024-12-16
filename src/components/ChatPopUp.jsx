import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from 'react';

export const ChatPopUp = ({ isOpen, onClose, userEmail }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { user: userEmail, text: message }]);
            setMessage('');
        }
    };

    if (!isOpen) return null;

    return (
        <Box 
            position="fixed" 
            bottom="20px" 
            right="20px" 
            width="300px" 
            bg="white" 
            p={4} 
            boxShadow="lg" 
            borderRadius="md"
            zIndex="1000"
        >
            <Box h="300px" overflowY="scroll" mb={4}>
                {messages.map((msg, index) => (
                    <Box key={index} mb={2}>
                        <Text fontWeight="bold">{msg.user}</Text>
                        <Text>{msg.text}</Text>
                    </Box>
                ))}
            </Box>
            <Input 
                placeholder="Escribe tu mensaje..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button colorScheme="blue" mt={2} onClick={handleSendMessage}>
                Enviar
            </Button>
            <Button variant="ghost" mt={2} onClick={onClose}>
                Cerrar
            </Button>
        </Box>
    );
};