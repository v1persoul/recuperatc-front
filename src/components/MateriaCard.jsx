import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from 'react';
import PopUp from './PopUp';

export default function MateriaCard({ materia, onAdd, onRemove }) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <Box
            m={3}
            border="1px"
            borderColor="gray.300"
            borderRadius={50}
            backgroundColor={"white"}
            shadow="md"
            position="relative" // Hacer que el contenedor principal sea relativo
            p={2}
        >
            <Text className="materia-nombre" fontSize="xl" fontWeight="semibold" textAlign="center">{materia.nombre_materia}</Text>

            <Flex className="materia-botones" justifyContent="center" alignItems="center" mt={4}>
                <Button className="btn-info" size="sm" variant="plain" onClick={togglePopup} color="black" fontSize="lg">
                    Más Información
                </Button>
                {materia.agregada ? (
                    <Button ml={2} size="mg" colorPalette="blackAlpha" onClick={onRemove} fontSize="3xl" top={-5}>
                        -
                    </Button>
                ) : (
                    <Button ml={2} size="mg" colorPalette="blackAlpha" onClick={onAdd} fontSize="3xl" top={-5}>  
                        +
                    </Button>
                )}
            </Flex>
            {showPopup && <PopUp materia={materia} onClose={togglePopup} />}
        </Box>
    );
}