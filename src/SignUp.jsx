import { useState } from 'react';
import { Box, VStack, Heading, Input, Button } from "@chakra-ui/react";
import { InputGroup } from "./components/ui/input-group";
import { LuAlbum, LuKeyRound, LuMail, LuUser } from "react-icons/lu";
import axios from 'axios';

export default function SignUp() {
    // Utilizamos useState para crear un estado formData que mantiene los valores de los campos del formulario.
    const [formData, setFormData] = useState({
        nombre: '',
        username: '',
        password: '',
        email: '',
    });

    // Función que se llama cada vez que el usuario escribe en alguna parte del formulario.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handleSubmit se ejecuta cuando se da clic al "Registrarse", y verifica que todos los campos estén completos 
    // y cumplan con los criterios (debe de ser un correo electrónico válido).
    const handleSubmit = async () => {
        // Validación simple
        if (!formData.nombre || !formData.username || !formData.password || !formData.email) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(formData.email)) {
            alert("Correo electrónico no válido.");
            return;
        }


        try {
            const response = await axios.post('http://localhost:3001/signup', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
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

                <InputGroup flex="1" startElement={<LuAlbum />}>
                    <Input 
                        name="nombre" 
                        placeholder="Nombre Completo" 
                        variant="outline" 
                        size="lg" 
                        onChange={handleChange}
                    />
                </InputGroup>

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

                <Button colorPalette="blue" variant="solid" size="lg" onClick={handleSubmit}>
                    Registrarse
                </Button>
            </VStack>
        </Box>
    );
}