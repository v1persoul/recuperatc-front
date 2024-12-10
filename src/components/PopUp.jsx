import { Box, Text, Button } from "@chakra-ui/react";

export default function PopUp({ materia, onClose }) {
    return (
        <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            p={4}
            border="1px"
            borderColor="gray.300"
            borderRadius={10}
            backgroundColor={"white"}
            shadow="md"
            zIndex={1000} // Asegurarse de que el pop-up esté sobre otros elementos
            width={["80%", "400px"]}
        >
            <Text fontSize="lg" fontWeight="bold">{materia.nombre}</Text>
            <Box mt={2}>
                <Text><b>NRC:</b> {materia.nrc}</Text>
                <Text><b>Docente:</b> {materia.docente}</Text>
                <Text><b>Horario:</b> {materia.horario}</Text>
            </Box>
            <Button mt={4} onClick={onClose} colorScheme="blue">
                Cerrar
            </Button>
        </Box>
    );
}
