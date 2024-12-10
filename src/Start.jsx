import { useState } from 'react';
import { Box, Text, Separator, SimpleGrid } from "@chakra-ui/react";
import { AvatarImg } from "./components/AvatarImg";
import MateriaCard from './components/MateriaCard';

export default function Start() {
    const [materias, setMaterias] = useState([
        { id: 1, nombre: 'Matemáticas', descripcion: 'Descripción de Matemáticas', nrc: '12345', docente: 'Profesor A', horario: 'Lun 10-12', agregada: false },
        { id: 2, nombre: 'Física', descripcion: 'Descripción de Física', nrc: '67890', docente: 'Profesor B', horario: 'Mar 14-16', agregada: false },
        { id: 3, nombre: 'Química', descripcion: 'Descripción de Química', nrc: '11223', docente: 'Profesor C', horario: 'Mie 8-10', agregada: false },
        { id: 4, nombre: 'Biología', descripcion: 'Descripción de Biología', nrc: '44556', docente: 'Profesor D', horario: 'Jue 10-12', agregada: false },
        { id: 5, nombre: 'Historia', descripcion: 'Descripción de Historia', nrc: '78901', docente: 'Profesor E', horario: 'Vie 12-14', agregada: false },
        { id: 6, nombre: 'Geografía', descripcion: 'Descripción de Geografía', nrc: '23456', docente: 'Profesor F', horario: 'Lun 14-16', agregada: false },
        { id: 7, nombre: 'Inglés', descripcion: 'Descripción de Inglés', nrc: '34567', docente: 'Profesor G', horario: 'Mar 16-18', agregada: false },
        { id: 8, nombre: 'Arte', descripcion: 'Descripción de Arte', nrc: '45678', docente: 'Profesor H', horario: 'Mie 10-12', agregada: false },
        // Agrega más materias según sea necesario
    ]);

    const handleAddMateria = (id) => {
        setMaterias(materias.map(materia => 
            materia.id === id ? { ...materia, agregada: true } : materia
        ));
    };

    const handleRemoveMateria = (id) => {
        setMaterias(materias.map(materia => 
            materia.id === id ? { ...materia, agregada: false } : materia
        ));
    };

    return (
        <div>
            {/* Cuadro de usuario en la página principal */}
            <Box 
                w={['100%', '250px']} 
                h={['100%', '250px']}
                position="absolute"
                left={['50%', 'auto']}
                marginLeft={['0', '50px']}
                top={6}
                transform={['translateX(-50%)', 'none']}
                p={[8,10]} 
                mt={[20, '10vh']} 
                mx='auto' 
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                shadow="md"
                borderRadius={30}
                backgroundColor={"white"}
                opacity="0.9"
            >
                <AvatarImg/>

                {/* Nombre y matrícula del estudiante */}
                <Text textStyle="lg" fontWeight="semibold" textAlign="center" textShadow="md">Felipe Murguia Leal</Text>
                <Text textStyle="md" fontWeight="semibold" textAlign="center" textShadow="md">v1persoul</Text>
            </Box>

            {/* Cuadro con las materias ingresadas */}
            <Box 
                w={['100%', '920px']} 
                h="250px" // Altura fija para mantener el tamaño
                position="absolute"
                right={['50%', 'auto']}
                marginLeft={['0', '350px']}
                top={6}
                transform={['translateX(-50%)', 'none']}
                p={[8,10]} 
                mt={[20, '10vh']} 
                mx='auto' 
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                shadow="md"
                borderRadius={30}
                backgroundColor={"white"}
                opacity="0.9"
            >
                <Text fontSize="xl" fontWeight="bold" textAlign="center" marginTop="-40px">
                    Mis Experiencias Educativas
                </Text>
                <Separator size="lg"/>
                <SimpleGrid columns={3} spacing={4}>
                    {materias.filter(materia => materia.agregada).map((materia, index) => (
                        <Box 
                            key={materia.id} 
                            h="110px" // Altura fija para cada tarjeta
                        >
                            <MateriaCard 
                                materia={materia} 
                                onAdd={() => handleAddMateria(materia.id)} 
                                onRemove={() => handleRemoveMateria(materia.id)}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            {/* Cuadro con las materias disponibles en la carrera */}
            <Box 
                w={['100%', '1220px']} 
                h="250px" // Altura fija para mantener el tamaño
                position="absolute"
                right={['50%', 'auto']}
                marginLeft={['0', '50px']}
                top={300}
                transform={['translateX(-50%)', 'none']}
                p={[8,10]} 
                mt={[20, '10vh']} 
                mx='auto' 
                border={['none', '1px']}
                borderColor={['', 'gray.300']}
                shadow="md"
                borderRadius={30}
                backgroundColor={"white"}
                opacity="0.9"
            >
                <Text fontSize="xl" fontWeight="bold" textAlign="center" marginTop="-40px">
                    Experiencias Educativas Disponibles
                </Text>
                <Separator size="lg"/>
                <SimpleGrid columns={4} spacing={4}>
                    {materias.filter(materia => !materia.agregada).map((materia, index) => (
                        <Box 
                            key={materia.id} 
                            h="110px" // Altura fija para cada tarjeta
                        >
                            <MateriaCard 
                                materia={materia} 
                                onAdd={() => handleAddMateria(materia.id)} 
                                onRemove={() => handleRemoveMateria(materia.id)}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </div>
    );
}
