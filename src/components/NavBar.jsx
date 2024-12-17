import { Box, Flex, Image, Text } from '@chakra-ui/react';

{/* Creación de la barra de navegación. No tiene ninguna funcionalidad, pero contiene los logos institucionales */}
export const NavBar = () => {
  return (
    <Box bg="white" p={1}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
            <Image src="/assets/lizsinfondobn.png" alt="Logo Universidad Veracruzana" height="40px" mb={1} ml={10}/>
            <Text fontSize="xl" color={'black'} ml={2} textShadow="1px 1px 1px rgba(0,0,0,3)">Universidad Veracruzana</Text>
        </Flex>
        <Flex alignItems="center">
            <Text fontSize="xl" color={'black'} mr={2} textShadow="1px 1px 1px rgba(0,0,0,3)">Tecnologías Computacionales</Text>
            <Image src="/assets/logofei.png" alt="Logo Tecnologías Computacionales" height="40px" mb={1} mr={10}/>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;  