import { useState, useEffect } from 'react';
import { Box, VStack, Input, Button, Text } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuKeyRound, LuMail, LuUser } from "react-icons/lu";
import axios from 'axios';
import { AvatarImg } from './components/AvatarImg';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Función para cargar los datos del usuario
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/usuario/actualizar', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado
                    }
                });
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    password: '', // No mostramos la contraseña por razones de seguridad
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        // Crear un objeto para almacenar los datos a enviar
        const dataToSend = {};

        // Solo agregar los campos que tienen valores
        if (formData.username) dataToSend.username = formData.username;
        if (formData.password) dataToSend.password = formData.password;
        if (formData.email) dataToSend.email = formData.email;

        // Si no hay datos para enviar, no hacer nada
        if (Object.keys(dataToSend).length === 0) {
            alert("No se han realizado cambios.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;

        if (formData.email && !emailRegex.test(formData.email)) {
            alert("Correo electrónico no válido.");
            return;
        }

        try {
            const response = await axios.put('http://localhost:8080/api/usuario/actualizar', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluir el token en el encabezado
                }
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response ? error.response.data.message : 'Error al actualizar el perfil');
        }
    };

    const navigateToInicio = () => {
        navigate("/inicio");
    };

    return (
        <div>
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
                opacity="0.9"
            >
                <Button 
                    position="relative"
                    top="30"
                    size="md"
                    colorPalette={"blue"}
                    onClick={navigateToInicio}
                >
                    Regresar
                </Button>

                <VStack spacing={4} align='center' w='full'>
                    <AvatarImg/>
                    <Text textStyle="lg" fontWeight="semibold" textAlign="center" textShadow="md">¡Hola, estudiante!</Text>

                    <InputGroup flex="1" startElement={<LuUser />}>
                        <Input 
                            name="username" 
                            placeholder="Usuario" 
                            variant="outline" 
                            size="lg" 
                            value={formData.username} // Establecer el valor del input
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
                            value={formData.password} // Establecer el valor del input
                            onChange={handleChange}
                        />
                    </InputGroup>

                    <InputGroup flex="1" startElement={<LuMail />}>
                        <Input 
                            name="email" 
                            placeholder="Correo Electrónico" 
                            type="email" 
                            variant="outline" 
                            size="lg" 
                            value={formData.email} // Establecer el valor del input
                            onChange={handleChange}
                        />
                    </InputGroup>

                    <Button colorPalette="blue" variant="solid" size="lg" onClick={handleSubmit} marginTop={5}>
                        Guardar Cambios
                    </Button>
                </VStack>
            </Box>
        </div>
    );
}