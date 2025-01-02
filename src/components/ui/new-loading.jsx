import { useEffect,useState } from "react";


export default function NewLoading({open}) {
    const [isLoading, setIsLoading] = useState(false); 
    useEffect(() => {
        setIsLoading(open);
    }, [open]);

    const loadingStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
    }

    return(
        <div id="Loading">
            {isLoading ? 
                (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center"
                    style={loadingStyle}>
                    <span>Cargando...</span>
                </div>
                ):
                <></>
            }
        </div>
    )
}