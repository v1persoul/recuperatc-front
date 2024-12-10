import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from 'react';
import PopUp from './PopUp'; // Importar el componente PopUp

export default function MateriaCard({ materia, onAdd, onRemove }) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <Box 
            className="materia-card"
            w="250px" 
            h="80px"
            p={4} 
            m={2} 
            border="1px"
            borderColor="gray.300"
            borderRadius={50}
            backgroundColor={"white"}
            shadow="md"
            position="relative" // Hacer que el contenedor principal sea relativo
        >
            <Text className="materia-nombre" fontSize="xl" fontWeight="semibold" textAlign="center">{materia.nombre}</Text>
            <Flex className="materia-botones" justifyContent="center" alignItems="center" >
                <Button className="btn-info" size="sm" variant="plain" onClick={togglePopup} marginTop="-10px" marginLeft="45px" color="black">
                    Más Información
                </Button>
                <Button 
                    onClick={materia.agregada ? onRemove : onAdd} 
                    size="md"
                    color={materia.agregada ? "red" : "black"}
                    borderRadius="full"
                    w={12}
                    h={12}
                    fontSize="5xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop="-45px"
                >
                    {materia.agregada ? "-" : "+"}
                </Button>
            </Flex>
            {showPopup && <PopUp materia={materia} onClose={togglePopup} />}
        </Box>
    );
}
