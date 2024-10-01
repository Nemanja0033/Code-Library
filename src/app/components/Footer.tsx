import { MailIcon } from "lucide-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer(){
    return(
        <div className="w-full bg-gray-300 h-[110px] mt-20">
            <div className="flex justify-center mb-3">
                <h1 className="text-2xl text-center pt-3 text-gray-700">Code Commerce®</h1>
            </div>
            <div className="flex justify-center">
                <span className="text-muted-foreground text-center">Nemanja Antonijevic® 2024</span>    
            </div>
            <div className="flex justify-center mt-2 gap-4">
                <a href="https://www.linkedin.com/in/nemanja-antonijevic-6baabb2a2/"><BsLinkedin className="cursor-pointer text-muted-foreground"/></a>
                <a href="https://github.com/Nemanja0033"><BsGithub  className="cursor-pointer text-muted-foreground" /></a>
            </div>
        </div>
    )
}