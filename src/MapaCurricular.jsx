import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function MapaCurricular(){

    const navigate = useNavigate()
    const navigateToInicio = () =>{
        navigate("/inicio")
    }

    return(
        <div>
            <img src="./src/assets/images/mapacurricular-TECO.jpg" alt="Mapa Curricular Estandar Sugerido"/>

            <Button 
                position="absolute"
                top={20}
                left={10}
                size="xl"
                colorPalette={"blue"}
                onClick={navigateToInicio}
                >
                    Regresar
            </Button>
        </div>

    )
}