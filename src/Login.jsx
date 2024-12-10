import { useState } from 'react';
import { Box, VStack, Heading, Input, Text, Button } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuKeyRound, LuUser } from "react-icons/lu";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // Utilizamos useState para crear un estado formData que mantiene los valores de los campos del formulario.
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate(); // Hook para la navegación

    // Función que se llama cada vez que el usuario escribe en alguna parte del formulario.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handleSubmit se ejecuta cuando se da clic al "Registrarse", y verifica que todos los campos estén completos.
    const handleSubmit = async () => {
        if (!formData.username || !formData.password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const navigateToSignUp = () => {
        navigate("/signup");
    };

    // Aqui comienza el renderizado del formulario, lo visual.
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
        >
            <VStack spacing={4} align='center' w='full'>
                <img src="/src/assets/images/logofei.png" alt="Logo FEI" height="150px" width="150px" />
                <VStack>
                    <Heading as="h1" fontSize="2xl" textAlign="center">Sistema de Organización de <br />
                    EE pendientes</Heading>
                </VStack>

                <InputGroup flex="1" startElement={<LuUser />}>
                    <Input 
                        name="username" 
                        placeholder="Usuario" 
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

                <Button colorPalette="blue" variant="solid" size="lg" onClick={handleSubmit}>
                    Iniciar Sesión
                </Button>
                <Text>¿No tienes cuenta?</Text>
                <Button colorPalette="blue" variant="solid" size="lg" onClick={navigateToSignUp}>
                    Registrarse
                </Button>
            </VStack>
        </Box>
    );
}
