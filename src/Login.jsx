import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuKeyRound, LuMail } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from './supabaseClient';

export default function Login() {
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
            // Iniciar sesión con Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
    
            if (error) {
                throw error; // Lanza el error para manejarlo en el catch
            }
    
            // Almacena el token de acceso en el almacenamiento local
            const token = data.session.access_token;
            localStorage.setItem('token', token); // Almacena el token
            toast.success('Inicio de sesión exitoso', {
                onClose: () => navigate('/inicio') // Redirigir a la pantalla de inicio después de mostrar la notificación
            });
        } catch (error) {
            toast.error('Error iniciando sesión: ' + error.message);
            console.error('Error iniciando sesión:', error);
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
                    <Heading>Iniciar Sesión</Heading>
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
                        Iniciar Sesión
                    </Button>

                    No tienes cuenta? 
                    <Button colorPalette="blue" variant="solid" onClick={() => navigate('/signup')}>
                        Regístrate
                    </Button>
                </VStack>
            </form>
            <ToastContainer />
        </Box>
    );
}