import { Image, Box } from "@chakra-ui/react";
//import { useNavigate } from 'react-router-dom';

// Imagen de Avatar
export const AvatarImg = () => {
    /*const navigate = useNavigate();

    const handleAvatarClick = () => {
        navigate('/perfil');
    };*/

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            //onClick={handleAvatarClick} 
            cursor="pointer"
        >
            <Image 
                src="/assets/defaultAvatar.png" 
                boxSize="150px"
                borderRadius="full"
                fit="cover"
                alt="Anime Default Avatar" 
                marginTop="-10px"
                border="5px solid rgba(135, 206, 235, 0.8)"
            />
        </Box>
    );
};