import { Image } from "@chakra-ui/react";

// Imagen de Avatar
export const AvatarImg = () =>{
    return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image 
            src="./src/assets/images/defaultAvatar.png" 
            boxSize="150px"
            borderRadius="full"
            fit="cover"
            alt="Anime Default Avatar" 
            marginTop="-10px"
            border="5px solid rgba(135, 206, 235, 0.8)"
        />
    </div>
    )
}