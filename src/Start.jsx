import { useState, useEffect } from 'react';
import { Box, Text, Separator, SimpleGrid, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { AvatarImg } from "./components/AvatarImg";
import { supabase } from './supabaseClient';
import MateriaCard from './components/MateriaCard';
import { ChatPopUp } from './components/ChatPopUp';

export default function Start() {

    const navigate = useNavigate();

    const [materias, setMaterias] = useState([]);
    const [usuarioId, setUsuarioId] = useState('');
    const [usuarioEmail, setUsuarioEmail] = useState('');


    useEffect(() => {
        const fetchMaterias = async () => {
            const { data, error } = await supabase
                .from('materias_disponibles')
                .select('id, nombre_materia, academico, horario');

            if (error) {
                console.error('Error fetching materias:', error);
            } else {
                setMaterias(data);
            }
        };

        const fetchUserProfile = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (user) {
                setUsuarioId(user.id);
                setUsuarioEmail(user.email);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('materias_deseadas')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user profile:', error);
                } else {
                    const materiasDeseadas = data.materias_deseadas || [];
                    setMaterias(prevMaterias => 
                        prevMaterias.map(materia => ({
                            ...materia,
                            agregada: materiasDeseadas.includes(materia.id)
                        }))
                    );
                }
            } else if (userError) {
                console.error('Error fetching user:', userError);
            }
        };

        fetchMaterias();
        fetchUserProfile();
    }, []);

    const handleAddMateria = async (id) => {
        if (!id) {
            console.error('Invalid materia ID:', id);
            return; // Salir si el ID es inválido
        }
    
        // Verificar que el usuario ID sea válido
        if (!usuarioId) {
            console.error('Invalid user ID:', usuarioId);
            return; // Salir si el ID de usuario es inválido
        }
    
        const { data: currentData, error: fetchError } = await supabase
            .from('profiles')
            .select('materias_deseadas')
            .eq('id', usuarioId)
            .single();
    
        if (fetchError) {
            console.error('Error fetching current materias:', fetchError);
            return;
        }
    
        const currentMaterias = currentData.materias_deseadas || [];
        const updatedMaterias = [...currentMaterias, id]; // Agregar la nueva materia
    
        const { data, error } = await supabase
            .from('profiles')
            .update({ materias_deseadas: updatedMaterias })
            .eq('id', usuarioId);
    
        if (error) {
            console.error('Error adding materia:', error);
        } else {
            setMaterias(materias.map(materia => 
                materia.id === id ? { ...materia, agregada: true } : materia
            ));
        }
    };
    
    const handleRemoveMateria = async (id) => {
        if (!id) {
            console.error('Invalid materia ID:', id);
            return; // Salir si el ID es inválido
        }
    
        // Verificar que el usuario ID sea válido
        if (!usuarioId) {
            console.error('Invalid user ID:', usuarioId);
            return; // Salir si el ID de usuario es inválido
        }
    
        const { data: currentData, error: fetchError } = await supabase
            .from('profiles')
            .select('materias_deseadas')
            .eq('id', usuarioId)
            .single();
    
        if (fetchError) {
            console.error('Error fetching current materias:', fetchError);
            return;
        }
    
        const currentMaterias = currentData.materias_deseadas || [];
        const updatedMaterias = currentMaterias.filter(materiaId => materiaId !== id); // Eliminar la materia
    
        const { data, error } = await supabase
            .from('profiles')
            .update({ materias_deseadas: updatedMaterias })
            .eq('id', usuarioId);
    
        if (error) {
            console.error('Error removing materia:', error);
        } else {
            setMaterias(materias.map(materia => 
                materia.id === id ? { ...materia, agregada: false } : materia
            ));
        }
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
                <AvatarImg />

                {/* Nombre y matrícula del estudiante */}
                <Text textStyle="lg" fontWeight="semibold" textAlign="center" textShadow="md">¡Hola, estudiante!</Text>
                <Text textStyle="xs" fontWeight="semibold" textAlign="center" textShadow="md">{usuarioEmail}</Text>
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
                    {materias.filter(materia => materia.agregada).map((materia) => (
                        <Box key={materia.id} h="110px">
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
                    {materias.filter(materia => !materia.agregada).map((materia) => (
                        <Box key={materia.id} h="110px">
                            <MateriaCard 
                                materia={materia} 
                                onAdd={() => handleAddMateria(materia.id)} 
                                onRemove={() => handleRemoveMateria(materia.id)}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
            
            <Flex alignItems="center" justifyContent="center" height="160vh">
                <Button colorPalette="blue" variant="solid" size="2xl" position="absolute" borderRadius={50} shadow="md" onClick={() => navigate('/mapa')} >
                    Mostrar Mapa Curricular
                </Button>
            </Flex>
        </div>
    );
}