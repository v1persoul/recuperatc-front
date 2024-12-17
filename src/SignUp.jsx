import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuKeyRound, LuMail } from "react-icons/lu";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData); // Añadir log para depuración
        if (!formData.password || !formData.email) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await axios.post('https://recuperatc-back-production.up.railway.app/api/usuario/registro', {
                password: formData.password,
                email: formData.email
            });
            console.log('Usuario registrado:', response.data);
            toast.success('Usuario registrado exitosamente', {
                onClose: () => navigate('/') // Redirigir a la pantalla de login después de mostrar la notificación
            });
        } catch (error) {
            toast.error('Error registrando usuario');
            console.error('Error registrando usuario:', error);
        }
    };

    return (
        <Box 
            w={['full', 'md']} 
            p={[8,10]} 
            mt={[20, '10vh']} 
            mx='auto' 
            border={['none', '1px']}
            borderColor={['', 'gray.300']}
            borderRadius={10}
            backgroundColor={"white"}
            shadow="md"
        >
            <VStack spacing={4} align='center' w='full'>
                <img src="/assets/logofei.png" alt="Logo FEI" height="150px" width="150px" />
                <VStack>
                    <Heading as="h1" fontSize="2xl" textAlign="center">Sistema de Organización de <br />
                    EE pendientes</Heading>
            </VStack>
            </VStack>
            <br />

            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <Heading>Registrarse</Heading>
                    <InputGroup flex="1" startElement={<LuMail />}>
                        <Input 
                            name="email" 
                            placeholder="Correo Electrónico" 
                            type="email" 
                            variant="outline" 
                            size="lg" 
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup flex="1" startElement={<LuKeyRound />}>
                        <Input 
                            name="password" 
                            placeholder="Contraseña" 
                            type="password" 
                            variant="outline" 
                            size="lg" 
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <Button colorPalette="blue" variant="solid" size="lg" type="submit" marginTop={5}>
                        Registrar
                    </Button>
                </VStack>
            </form>
            <ToastContainer />
        </Box>
    );
}